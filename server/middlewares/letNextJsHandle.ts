import { DefaultContext } from 'koa';

export const letNextJsHandle = (handle) => async (ctx: DefaultContext) => {
  await handle(ctx.req, ctx.res);
  ctx.respond = false;
  ctx.res.statusCode = 200;
};
