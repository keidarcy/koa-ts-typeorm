import { GraphQLClient } from 'graphql-request';
import { DefaultContext, Next } from 'koa';
import env from '../../utils/env.helper';

export const addContext = async (ctx: DefaultContext, next: Next) => {
  const { shop, accessToken } = ctx.session;

  const client = new GraphQLClient(
    `https://${shop}//admin/api/${env.SHOPIFY_API_VERSION}/graphql.json`,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      }
    }
  );
  ctx.req.shop = shop;
  ctx.req.GraphQLClient = client;
  await next();
};
