import { ProductInterface, VariantInterface } from '../utils/type.helper';

export default class Product {
  constructor(public shop: string, public currency: string) {}
  formatShopifyProduct(shopifyProduct) {
    const { variants, price, compareAtPrice } = this.getVariantsAndPrice(
      shopifyProduct.variants.edges
    );

    let product: ProductInterface = {
      title: shopifyProduct.title,
      url: shopifyProduct.onlineStorePreviewUrl,
      vendor: shopifyProduct.vendor,
      images: this.getImages(shopifyProduct.images),
      variants,
      price: this.moneyFormatter(price),
      compareAtPrice: this.moneyFormatter(compareAtPrice),
      options: shopifyProduct.options,
      hasOnlyDefaultVariant: true
    };
    if (shopifyProduct.hasOnlyDefaultVariant) {
      product.hasOnlyDefaultVariant = true;
      return product;
    }

    product.hasOnlyDefaultVariant = false;
    return product;
  }

  moneyFormatter(money) {
    return new Intl.NumberFormat(this.currency, {
      style: 'currency',
      currency: this.currency
    }).format(money);
  }

  getImages(images) {
    return [images.edges[0].node.originalSrc, images.edges[1].node.originalSrc];
  }

  getVariantsAndPrice(
    shopifyVariants
  ): { variants: VariantInterface[]; price: string; compareAtPrice: string } {
    let variants = [];
    let price = '';
    let compareAtPrice = '';
    shopifyVariants.forEach(({ node: variant }) => {
      const vcsVariant = {
        availbel: variant.availableForSale,
        title: variant.title,
        price: this.moneyFormatter(variant.price),
        compareAtPrice: this.moneyFormatter(variant.compareAtPrice),
        id: variant.id.replace(/[^0-9]+/g, ''),
        option1: this.getOptionValue(variant, 0),
        option2: this.getOptionValue(variant, 1),
        option3: this.getOptionValue(variant, 2)
      };
      price = variant.price;
      compareAtPrice = variant.compareAtPrice;
      variants = [...variants, vcsVariant];
    });
    return { variants, price, compareAtPrice };
  }

  getOptionValue(variant, index) {
    return typeof variant.selectedOptions[index] !== 'undefined'
      ? variant.selectedOptions[index].value
      : null;
  }
}
