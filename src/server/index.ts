import 'isomorphic-fetch';
import 'colors';
import dotenv from 'dotenv';
import Koa from 'koa';
import session from 'koa-session';
import createShopifyAuth from '@shopify/koa-shopify-auth';
import { verifyRequest } from '@shopify/koa-shopify-auth';
import next from 'next';
import { DefaultState, DefaultContext, Context } from 'koa';
import { OAuthStartOptions } from '@shopify/koa-shopify-auth/dist/src/types';
import { GraphQLClient } from 'graphql-request';

dotenv.config();

const port = parseInt(process.env.PORT as string, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const authConfig: OAuthStartOptions = {
  apiKey: process.env.SHOPIFY_API_KEY ?? '',
  secret: process.env.SHOPIFY_API_SECRET_KEY ?? '',
  scopes: ['read_products', 'write_products'],
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

interface ShopifyContext extends DefaultContext, GraphQLClient {}

const server: Koa<DefaultState, DefaultContext> = new Koa();

app.prepare().then(() => {
  server.use(session({ secure: true, sameSite: 'none' }, server));
  server.keys = [process.env.SHOPIFY_API_SECRET_KEY ?? ''];
  server.use(createShopifyAuth(authConfig));
  server.use(verifyRequest());
  server.use(async (ctx: ShopifyContext) => {
    const { shop, accessToken } = ctx.session;
    const client = new GraphQLClient(`https://${shop}//admin/api/2020-10/graphql.json`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      }
    });
    ctx.req.GraphQLClient = client;
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });
});

server
  .listen(port)
  .on('listening', () =>
    console.log(`server started on port=${port} http://locahost:${port}`)
  );
