import App from 'next/app';
import Head from 'next/head';
import type { AppProps, AppContext } from 'next/app';
import { useRouter } from 'next/router';
import { IncomingMessage } from 'http';
import '@shopify/polaris/dist/styles.css';
import { AppProvider, FooterHelp, Frame, Link } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import translations from '@shopify/polaris/locales/en.json';
import VaniClientRouter from '../components/Layouts/VaniClientRouter';
import VaniRoutePropagator from '../components/Layouts/VaniRoutePropagator';
import React, { useEffect, useState } from 'react';
import { initApp } from '../utils/front.helper';
import t from '../utils/en.json';
import { VaniTitleBar } from '../components/Layouts/VaniTitleBar';
import { VaniFooter } from '../components/Layouts/VaniFooter';
import { VaniProvider } from '../components/Layouts/VaniProvider';

interface MyAppInterface extends AppProps {
  shopOrigin: string;
}

const MyApp = ({ Component, pageProps, shopOrigin }: MyAppInterface) => {
  //@ts-expect-errorts
  const config = { apiKey: API_KEY, shopOrigin, forceRedirect: false };

  useEffect(() => {
    initApp();
  }, []);

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta charSet="utf-8" />
      </Head>
      <Provider config={config}>
        <VaniClientRouter />
        <VaniRoutePropagator />
        <AppProvider i18n={translations} features={{ newDesignLanguage: true }}>
          <VaniTitleBar />
          <VaniProvider>
            <Component {...pageProps} />
          </VaniProvider>
          <VaniFooter />
        </AppProvider>
      </Provider>
    </>
  );
};

interface ShopifyIncomingMessage extends IncomingMessage {
  cookies?: {
    shopOrigin?: '';
  };
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const shopOrigin = (appContext.ctx.req as ShopifyIncomingMessage)?.cookies?.shopOrigin
    ? (appContext.ctx.req as ShopifyIncomingMessage).cookies.shopOrigin
    : appContext.ctx.query.shop;

  return { ...appProps, shopOrigin };
};

export default MyApp;
