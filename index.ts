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
import graphQLProxy, { ApiVersion } from '@shopify/koa-shopify-graphql-proxy';

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
    const urlParams = new URLSearchParams(ctx.request.url);
    const shop = urlParams.get('shop');

    ctx.redirect(`/?shop=${shop}`);
  }
};

const server: Koa<DefaultState, DefaultContext> = new Koa();

server.keys = [process.env.SHOPIFY_API_SECRET_KEY ?? ''];

app.prepare().then(() => {
  server.use(session({ secure: true, sameSite: 'none' }, server));
  server.use(createShopifyAuth(authConfig));
  server.use(graphQLProxy({ version: ApiVersion.October20 }));
  server.use(verifyRequest());
  server.use(async (ctx: Context) => {
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
