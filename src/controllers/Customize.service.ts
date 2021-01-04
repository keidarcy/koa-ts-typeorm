import { Customize, PrismaClient } from '@prisma/client';

export class CustomizeService {
  constructor(public shop: string, public prisma: PrismaClient) {}
  async update(customize: Customize) {
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
}
