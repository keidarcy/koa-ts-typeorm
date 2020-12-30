import { Banner, Card, Layout, Page, FormLayout } from '@shopify/polaris';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { VaniSectionCard } from '../components/Home/VaniSectionCard';
import { VaniContext } from '../utils/contexts/VCScontext';
import useCustomize from '../utils/hooks/useCustomize';
import { VaniActionEnum } from '../utils/type.helper';

const Index: React.FC = (): JSX.Element => {
  const { status, data: customize, error, isFetching } = useCustomize();
  const { state, dispatch } = useContext(VaniContext);
  useEffect(() => {
    console.log({ customize });
    dispatch({ type: VaniActionEnum.SET_API_VALUES, customize });
  }, [customize]);

  const features = [
    {
      name: 'Best Selling Products',
      description:
        'For every product, recommends the frequently bought together items with that product. E.g.: People who buy Baby Formula also buy Diapers',
      pages: ['Home page'],
      previewUrl: `https://${state.customize?.shop}`,
      defaultTitle: 'People who bought this product, also bought'
    },
    {
      name: 'Newest Products',
      description:
        'For every product, recommends the frequently bought together items with that product. E.g.: People who buy Baby Formula also buy Diapers',
      pages: ['Home page'],
      previewUrl: `https://${state.customize?.shop}`,
      defaultTitle: 'People who bought this product, also bought'
    },
    {
      name: 'Recommended Products',
      description:
        'For every product, recommends the frequently bought together items with that product. E.g.: People who buy Baby Formula also buy Diapers',
      pages: ['Product pages'],
      previewUrl: `https://${state.customize?.shop}`,
      defaultTitle: 'People who bought this product, also bought'
    },
    {
      name: 'Recently Viewed Products',
      description:
        'For every product, recommends the frequently bought together items with that product. E.g.: People who buy Baby Formula also buy Diapers',
      pages: ['Home page', 'Cart page', 'Product pages', 'Collections pages'],
      previewUrl: `https://${state.customize?.shop}`,
      defaultTitle: 'People who bought this product, also bought'
    }
  ];

  return (
    <>
      <Layout.Section>
        <Banner
          title="USPS has updated their rates"
          action={{ content: 'Update rates', url: '' }}
          secondaryAction={{ content: 'Learn more' }}
          status="info"
          onDismiss={() => {}}
        >
          <p>Make sure you know how these changes affect your store.</p>
        </Banner>
      </Layout.Section>
      {status === 'loading' ? (
        'Loading...'
      ) : status === 'error' ? (
        <span>Error</span>
      ) : (
        <Layout.Section>
          <Layout>
            {features.map((feature, index) =>
              (() => {
                switch (index) {
                  case 0:
                    return (
                      <VaniSectionCard
                        key={feature.name}
                        name={feature.name}
                        defaultTitle={feature.defaultTitle}
                        description={feature.description}
                        pages={feature.pages}
                        previewUrl={feature.previewUrl}
                        active={state.customize?.bestSellingProducts}
                        title={state.customize?.bspTitle}
                        toogleField="bestSellingProducts"
                        titleField="bspTitle"
                      />
                    );
                  case 1:
                    return (
                      <VaniSectionCard
                        key={feature.name}
                        name={feature.name}
                        defaultTitle={feature.defaultTitle}
                        description={feature.description}
                        pages={feature.pages}
                        previewUrl={feature.previewUrl}
                        active={state.customize?.newestProducts}
                        title={state.customize?.npTitle}
                        toogleField="newestProducts"
                        titleField="npTitle"
                      />
                    );
                  case 2:
                    return (
                      <VaniSectionCard
                        key={feature.name}
                        name={feature.name}
                        defaultTitle={feature.defaultTitle}
                        description={feature.description}
                        pages={feature.pages}
                        previewUrl={feature.previewUrl}
                        active={state.customize?.recommendedProducts}
                        title={state.customize?.rpTitle}
                        toogleField="recommendedProducts"
                        titleField="rpTitle"
                      />
                    );
                  case 3:
                    return (
                      <VaniSectionCard
                        key={feature.name}
                        name={feature.name}
                        defaultTitle={feature.defaultTitle}
                        description={feature.description}
                        pages={feature.pages}
                        previewUrl={feature.previewUrl}
                        active={state.customize?.recentlyViewedProducts}
                        title={state.customize?.rvpTitle}
                        toogleField="recentlyViewedProducts"
                        titleField="rvpTitle"
                      />
                    );
                  default:
                    return null;
                }
              })()
            )}
          </Layout>
        </Layout.Section>
      )}
    </>
  );
};

export default Index;
