import { ProductInterface } from '../utils/type.helper';

class Product {
  formatShopifyProduct(shopifyProduct) {
    let product: ProductInterface = {
      title: shopifyProduct.title,
      vendor: shopifyProduct.vendor,
      images: this.getImages(shopifyProduct.images),
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

  getImages(images) {
    return [images.edges[0].node.originalSrc, images.edges[1].node.originalSrc];
  }
}

export const ProductHelper = new Product();
