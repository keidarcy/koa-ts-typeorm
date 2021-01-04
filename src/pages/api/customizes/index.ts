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
  const themes = await shopify.theme.list();
  const themeId = themes.find((theme) => theme.role === 'main').id;
  console.log({ themeId });
  const ret = await req.shopify.asset.create(themeId, {
    key: `snippets/vcs.liquid`,
    value: 'test'
  });
  console.log({ ret });
  const date = new Date();
  await req.shopify.asset.create(themeId, {
    key: `layout/vcs_backup_theme_${
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }.liquid`,
    source_key: 'layout/theme.liquid'
  });

  let themeLiquid = await req.shopify.asset.get(themeId, {
    asset: {
      key: 'layout/theme.liquid'
    }
  });

  const newValue = themeLiquid.value.replace(
    '{{ content_for_layout }}',
    '\n{{ content_for_layout }}\n{% render "vcs" %}'
  );

  const rets = await req.shopify.asset.update(themeId, {
    key: 'layout/theme.liquid',
    value: newValue
  });
  console.log({ rets });

  const customizeService = new CustomizeService(shop, prisma);
  const data = await customizeService.update(updatedCustomize);
  res.json(data);
});

export default handler;
