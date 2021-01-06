import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { PrismaClient, Customize } from '@prisma/client';
import { loader } from 'graphql.macro';
import Product from '../../../controllers/Product';
import Shopify from 'shopify-api-node';
import { liquidTemplate } from '../../../assets/assetTemplates';
import css from '../../../assets/vcs.css.liquid';
import js from '../../../assets/vcs.js.liquid';
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

  try {
    await customizeService.createCollection();
    await customizeService.createFile(
      'snippets/vcs.liquid',
      liquidTemplate(updatedCustomize)
    );
    await customizeService.createFile('assets/vcs.css.liquid', css);
    await customizeService.createFile('assets/vcs.js.liquid', js);
    await customizeService.modifyAssets();
    console.log('object');

    const data = await customizeService.updateAppDB(updatedCustomize);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

export default handler;
