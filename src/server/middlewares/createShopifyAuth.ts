import { OAuthStartOptions } from '@shopify/koa-shopify-auth/dist/src/types';
import { Context } from 'koa';
import env from '../../utils/env.helper';
import shopifyAuth from '@shopify/koa-shopify-auth';

const authConfig: OAuthStartOptions = {
  apiKey: env.SHOPIFY_API_KEY,
  secret: env.SHOPIFY_API_SECRET_KEY,
  scopes: env.SHOPIFY_API_SCOPE.split(','),
  async afterAuth(ctx: Context) {
    const { shop, accessToken } = ctx.session;
    ctx.cookies.set('shopOrigin', shop, {
      httpOnly: false,
      secure: true,
      sameSite: 'none'
    });
    console.log({ accessToken });
    ctx.redirect(`/?shop=${shop}`);
  }
};

export const createShopifyAuth = () => shopifyAuth(authConfig);
