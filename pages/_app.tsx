import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import type { AppProps, AppContext } from 'next/app';
import ClientRouter from '../components/ClientRouter';
import RoutePropagator from '../components/RoutePropagator';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  }
});
interface MyAppInterface extends AppProps {
  shopOrigin: string;
}

const MyApp = ({ Component, pageProps, shopOrigin }: MyAppInterface) => {
  //@ts-expect-errorts
  const config = { apiKey: API_KEY, shopOrigin, forceRedirect: false };
  return (
    <>
      <Head>
        <title>Sample App</title>
        <meta charSet="utf-8" />
      </Head>
      <Provider config={config}>
        <RoutePropagator />
        <ClientRouter />
        <AppProvider i18n={translations}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
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
