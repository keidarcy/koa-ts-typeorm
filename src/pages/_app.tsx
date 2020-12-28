import App from 'next/app';
import Head from 'next/head';
import { AppProvider, FooterHelp, Link } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import type { AppProps, AppContext } from 'next/app';
import ClientRouter from '../components/ClientRouter';
import RoutePropagator from '../components/RoutePropagator';
import { TitleBar } from '@shopify/app-bridge-react';
import { useRouter } from 'next/router';

interface MyAppInterface extends AppProps {
  shopOrigin: string;
}

const MyApp = ({ Component, pageProps, shopOrigin }: MyAppInterface) => {
  //@ts-expect-errorts
  const config = { apiKey: API_KEY, shopOrigin, forceRedirect: false };
  const router = useRouter();
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
                onAction: () => router.push('/hello')
              }
            ]}
          />
          <Component {...pageProps} />
          <FooterHelp>
            <Link url="https://karte.io/enterprise/" external>
              お問い合わせ
            </Link>
          </FooterHelp>
        </AppProvider>
      </Provider>
    </>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, shopOrigin: appContext.ctx.query.shop };
};

export default MyApp;
