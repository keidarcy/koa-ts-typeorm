import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { PrismaClient, Customize } from '@prisma/client';
import { loader } from 'graphql.macro';
import Product from '../../../controllers/Product';
import Shopify from 'shopify-api-node';
import { CustomizeService } from '../../../controllers/Customize.service';

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

interface ExtendedPutRequest extends ExtendedRequest {
  body: Customize;
}

handler.put<ExtendedPutRequest, ExtendedResponse>(async (req, res) => {
  const updatedCustomize = req.body as Customize;

  const { shopify, shop } = req;

  const customizeService = new CustomizeService(shop, prisma, shopify);

  await customizeService.createNewCollection();
  await customizeService.createSnippet();
  await customizeService.modifyAssets();

  const data = await customizeService.updateAppDB(updatedCustomize);
  res.json(data);
});

export default handler;
