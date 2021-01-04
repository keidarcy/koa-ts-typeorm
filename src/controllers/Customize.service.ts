import { Customize, PrismaClient } from '@prisma/client';
import Shopify from 'shopify-api-node';
import { bspTemplate } from '../assets/liquidTemplate';

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

  async createNewCollection() {
    const rules = [
      {
        column: 'title',
        condition: 'bsp',
        relation: 'equals'
      },
      {
        column: 'title',
        condition: 'bsp',
        relation: 'not_equals'
      }
    ];
    try {
      await this.shopify.smartCollection.create({
        disjunctive: true,
        title: 'bsp',
        handle: 'bsp',
        rules
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

  async createSnippet() {
    await this.findCurrentThemeId();
    await this.shopify.asset.create(this.themeId, {
      key: `snippets/vcs.liquid`,
      value: bspTemplate
    });
  }

  async findCurrentThemeId() {
    const themes = await this.shopify.theme.list();

    const themeId = themes.find((theme) => theme.role === 'main').id;

    this.themeId = themeId;
  }
}
