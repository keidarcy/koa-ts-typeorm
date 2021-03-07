import { Customize, PrismaClient } from '@prisma/client';
import Shopify from 'shopify-api-node';
import { VCSCollection } from '../utils/type.helper';
import { liquidTemplate } from '../../assets/vcsLiquid';
import css from '../../assets/vcs.css.liquid';

export class CustomizeService {
  constructor(
    public shop: string,
    public prisma: PrismaClient,
    public shopify: Shopify
  ) {}

  private themeId: number;

  async updateAppDB(customize: Customize) {
    const {
      newestProducts,
      recentlyViewedProducts,
      bestSellingProducts,
      recommendedProducts,
      npTitle,
      rvpTitle,
      bspTitle,
      rpTitle,
      showCart,
      showVariant,
      showPrice,
      showNumber,
      cartText,
      cartColor,
      titleColor,
      productNameColor
    } = customize;

    let newShowNumber = showNumber;
    if (Object.is(Number(showNumber), NaN) || +showNumber > 20 || +showNumber < 1) {
      newShowNumber = 4;
    } else {
      newShowNumber = +showNumber;
    }

    const data = await this.prisma.customize.update({
      where: { shop: this.shop },
      data: {
        newestProducts,
        recentlyViewedProducts,
        bestSellingProducts,
        recommendedProducts,
        npTitle,
        rvpTitle,
        bspTitle,
        rpTitle,
        showCart,
        showVariant,
        showPrice,
        showNumber: newShowNumber,
        cartText,
        cartColor,
        titleColor,
        productNameColor
      }
    });

    return data;
  }

  async initThemeId() {
    const themes = await this.shopify.theme.list();
    const themeId = themes.find((theme) => theme.role === 'main').id;
    console.log({ themeId });
    this.themeId = themeId;
  }

  async isFirstTime(): Promise<boolean> {
    await this.initThemeId();
    const themeLiquid = await this.shopify.asset.get(this.themeId, {
      asset: {
        key: 'layout/theme.liquid'
      }
    });
    return !/vcs/.test(themeLiquid.value);
  }

  async initVCSToShop(customize: Customize) {
    await this.createCollection();
    await this.createFile('snippets/vcs.liquid', liquidTemplate(customize));
    await this.createFile('assets/vcs.css.liquid', css);
    await this.updateThemeLiquid();
  }

  async updateVCSChange(customize: Customize) {
    const newVCS = liquidTemplate(customize);
    try {
      const res = await this.shopify.asset.update(this.themeId, {
        key: 'snippets/vcs.liquid',
        value: newVCS
      });
      console.log({ res });
    } catch (error) {
      console.log({ error });
    }
  }

  async createCollection() {
    const bspResult = await this.shopify.smartCollection.list({
      title: VCSCollection.bsp
    });
    const npResult = await this.shopify.smartCollection.list({ title: VCSCollection.np });

    const hasCreated = bspResult.length + npResult.length === 2;

    if (hasCreated) return;

    const bspRules = [
      {
        column: 'title',
        condition: VCSCollection.bsp,
        relation: 'equals'
      },
      {
        column: 'title',
        condition: VCSCollection.bsp,
        relation: 'not_equals'
      }
    ];
    const npRules = [
      {
        column: 'title',
        condition: VCSCollection.np,
        relation: 'equals'
      },
      {
        column: 'title',
        condition: VCSCollection.np,
        relation: 'not_equals'
      }
    ];

    try {
      await this.shopify.smartCollection.create({
        disjunctive: true,
        title: VCSCollection.bsp,
        rules: bspRules,
        published: true,
        sort_order: 'best-selling'
      });
      await this.shopify.smartCollection.create({
        disjunctive: true,
        title: VCSCollection.np,
        rules: npRules,
        published: true,
        sort_order: 'created-desc'
      });
    } catch (err) {
      console.log(err.response.body);
    }
  }

  async updateThemeLiquid() {
    const date = new Date();
    await this.shopify.asset.create(this.themeId, {
      key: `layout/vcs_backup_theme_${
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      }.liquid`,
      source_key: 'layout/theme.liquid'
    });

    let themeLiquid = await this.shopify.asset.get(this.themeId, {
      asset: {
        key: 'layout/theme.liquid'
      }
    });

    const newValue = themeLiquid.value.replace(
      '{{ content_for_layout }}',
      '  {{ content_for_layout }}\n   {% render "vcs" %}'
    );

    await this.shopify.asset.update(this.themeId, {
      key: 'layout/theme.liquid',
      value: newValue
    });
  }

  async createFile(path, content) {
    try {
      await this.shopify.asset.get(this.themeId, { 'asset[key]': path });
    } catch (error) {
      await this.shopify.asset.create(this.themeId, {
        key: path,
        value: content
      });
    }
  }
}
