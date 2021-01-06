import 'isomorphic-fetch';
import 'colors';
import Koa, { DefaultState, DefaultContext, Context } from 'koa';
import next from 'next';
import session from 'koa-session';
import { verifyRequest } from '@shopify/koa-shopify-auth';
import env, { isDev, port } from '../utils/env.helper';
import { addContext } from './middlewares/addToContext';
import { createShopifyAuth } from './middlewares/createShopifyAuth';
import { letNextJsHandle } from './middlewares/letNextJsHandle';
import serverWork from './server.helper';

serverWork();

const app = next({ dev: isDev });

const handle = app.getRequestHandler();

const server: Koa<DefaultState, DefaultContext> = new Koa();

app.prepare().then(() => {
  server.keys = [env.SHOPIFY_API_SECRET_KEY];
  server.use(session({ secure: true, sameSite: 'none' }, server));
  server.use(createShopifyAuth());
  server.use(verifyRequest());
  server.use(addContext);
  server.use(letNextJsHandle(handle));
});

server
  .listen(port)
  .on('listening', () =>
    console.log(`server started PORT on ${port} http://locahost`.bgCyan.bold)
  );
