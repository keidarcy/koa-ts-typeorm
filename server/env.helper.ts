import dotenv from 'dotenv';

dotenv.config();

export default {
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  TUNNEL_URL: process.env.TUNNEL_URL ?? '',
  PORT: process.env.PORT ?? '',

  SHOPIFY_API_SECRET_KEY: process.env.SHOPIFY_API_SECRET_KEY ?? '',
  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY ?? '',
  SHOPIFY_API_VERSION: process.env.SHOPIFY_API_VERSION ?? '',
  SHOPIFY_API_SCOPE: process.env.SHOPIFY_API_SCOPE ?? ''
};

export const port = parseInt(process.env.PORT, 10) || 3000;
export const isDev = process.env.NODE_ENV !== 'production';
