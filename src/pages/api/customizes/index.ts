import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';
import { loader } from 'graphql.macro';
import Product from '../../../controllers/Product';
import Shopify from 'shopify-api-node';

const handler = nc<NextApiRequest, NextApiResponse>();

const prisma = new PrismaClient();

interface ExtendedRequest {
  shop: string;
  shopify: Shopify;
}
interface ExtendedResponse {
  cookie: (name: string, value: string) => void;
}

handler.get<ExtendedRequest, ExtendedResponse>(async (req, res) => {
  const { shop, shopify } = req;
  const customize = await prisma.customize.findUnique({
    where: { shop }
  });

  const query = loader('../../../graphqls/getOneProduct.gql').loc.source.body;
  const result = await shopify.graphql(query);

  const ProductHelper = new Product(shop, result.shop.currencyCode);
  const product = ProductHelper.formatShopifyProduct(result.products.edges[0].node);

  res.json({ customize, product });
});

handler.put<ExtendedRequest, ExtendedResponse>(async (req, res) => {
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
  } = req.body;

  const { shopify } = req;
  shopify.theme.list();
  // TODO: add liquid assets manipulation here

  const data = await prisma.customize.update({
    where: { shop: req.shop },
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
  res.json(data);
});

export default handler;
