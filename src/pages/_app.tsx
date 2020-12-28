import App from 'next/app';
import Head from 'next/head';
import type { AppProps, AppContext } from 'next/app';
import { useRouter } from 'next/router';
import { IncomingMessage } from 'http';
import '@shopify/polaris/dist/styles.css';
import { AppProvider, FooterHelp, Link } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import translations from '@shopify/polaris/locales/en.json';
import { TitleBar } from '@shopify/app-bridge-react';
import ClientRouter from '../components/ClientRouter';
import RoutePropagator from '../components/RoutePropagator';
import { useEffect } from 'react';
import { initApp } from '../utils/front.helper';

interface MyAppInterface extends AppProps {
  shopOrigin: string;
}

const MyApp = ({ Component, pageProps, shopOrigin }: MyAppInterface) => {
  //@ts-expect-errorts
  const config = { apiKey: API_KEY, shopOrigin, forceRedirect: false };
  const router = useRouter();

  useEffect(() => {
    initApp();
  }, []);

  return (
    <>
      <Head>
        <title>Sample App</title>
        <meta charSet="utf-8" />
      </Head>
      <Provider config={config}>
        <ClientRouter />
        <RoutePropagator />
        <AppProvider i18n={translations}>
          <TitleBar
            title=""
            secondaryActions={[
              {
                content: 'index',
                onAction: () => router.push('/')
              },
              {
                content: 'router test',
                onAction: () => router.push('/test')
              }
            ]}
          />
          <Component {...pageProps} />
          <FooterHelp>
            <Link url="https://github.com/keidarcy" external>
              お問い合わせ
            </Link>
          </FooterHelp>
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
