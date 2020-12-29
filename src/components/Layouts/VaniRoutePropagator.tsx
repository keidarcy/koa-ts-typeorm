import { RoutePropagator as ShopifyRoutePropagator } from '@shopify/react-shopify-app-route-propagator';
import { Context as AppBridgeContext } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import Router, { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';

const VaniRoutePropagator = () => {
  const router = useRouter();
  const { route } = router;
  const appBridge = useContext(AppBridgeContext);

  useEffect(() => {
    appBridge.subscribe(Redirect.ActionType.APP, ({ path }) => {
      Router.push(path);
    });
  }, []);

  return appBridge && route ? (
    <ShopifyRoutePropagator location={route} app={appBridge} />
  ) : null;
};

export default VaniRoutePropagator;
