import { Customize, PrismaClient } from '@prisma/client';
import Shopify from 'shopify-api-node';
import { liquidTemplate } from '../assets/assetTemplates';
import { VCSCollection } from '../utils/type.helper';

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
      enableSlideshow,
      showVariant,
      showPrice,
      cropImage,
      cartText,
      cartColor,
      titleColor,
      productNameColor
    } = customize;

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
        enableSlideshow,
        showVariant,
        showPrice,
        cropImage,
        cartText,
        cartColor,
        titleColor,
        productNameColor
      }
    });

    return data;
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

  async modifyAssets() {
    await this.findCurrentThemeId();
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
      '\n{{ content_for_layout }}\n{% render "vcs" %}'
    );

    await this.shopify.asset.update(this.themeId, {
      key: 'layout/theme.liquid',
      value: newValue
    });
  }

  async createFile(path, content) {
    await this.shopify.asset.get(this.themeId, { 'asset[key]': path });
    await this.findCurrentThemeId();
    await this.shopify.asset.create(this.themeId, {
      key: path,
      value: content
    });
  }

  private async findCurrentThemeId() {
    const themes = await this.shopify.theme.list();

    const themeId = themes.find((theme) => theme.role === 'main').id;

    this.themeId = themeId;
  }
}
