import { DefaultContext, Next } from 'koa';
import Shopify from 'shopify-api-node';

export const addContext = async (ctx: DefaultContext, next: Next) => {
  const { shop, accessToken } = ctx.session;

  const shopify = new Shopify({
    shopName: shop,
    accessToken: accessToken
  });

  ctx.req.shop = shop;
  ctx.req.shopify = shopify;
  await next();
};
