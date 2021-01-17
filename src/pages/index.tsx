import { Banner, Layout } from '@shopify/polaris';
import React, { useContext, useEffect, useState } from 'react';
import { CustomizeArea } from '../components/Home/CustomizeArea';
import { VaniSectionCard } from '../components/Home/VaniSectionCard';
import { VaniContext } from '../utils/contexts/VCScontext';
import useCustomizeQuery from '../utils/hooks/useCustomizeQuery';
import { VaniActionEnum } from '../utils/type.helper';
import { VaniSpinner } from '../components/Layouts/VaniSpinner';
import { useT } from '../utils/hooks/useT';

const Index: React.FC = (): JSX.Element => {
  const { status, data } = useCustomizeQuery();
  const { state, dispatch } = useContext(VaniContext);
  useEffect(() => {
    dispatch({
      type: VaniActionEnum.SET_API_VALUES,
      customize: data?.customize,
      product: data?.product
    });
  }, [data]);

  const t = useT();

  const features = [
    {
      name: t.main.bsp.name,
      description: t.main.bsp.description,
      pages: t.main.bsp.pages,
      previewUrl: `https://${state.customize?.shop}`,
      defaultTitle: t.main.bsp.default
    },
    {
      name: t.main.np.name,
      description: t.main.np.description,
      pages: t.main.np.pages,
      previewUrl: `https://${state.customize?.shop}`,
      defaultTitle: t.main.np.default
    },
    {
      name: t.main.rp.name,
      description: t.main.rp.description,
      pages: t.main.rp.pages,
      previewUrl: state.product?.url,
      defaultTitle: t.main.rp.default
    },
    {
      name: t.main.rvp.name,
      description: t.main.rvp.description,
      pages: t.main.rvp.pages,
      previewUrl: state.product?.url,
      defaultTitle: t.main.rvp.default
    }
  ];

  const [showBanner, setShowBanner] = useState(true);

  return (
    <>
      {status === 'loading' ? (
        <VaniSpinner color="#000" />
      ) : status === 'error' ? (
        <span>Error</span>
      ) : (
        <Layout>
          <Layout.Section>
            <Layout>
              <Layout.Section>
                {showBanner && (
                  <Banner
                    title={t.banner.title}
                    action={{
                      content: t.banner.contact,
                      onAction: () => globalThis.Tawk_API.toggle()
                    }}
                    onDismiss={() => setShowBanner(false)}
                  >
                    <p>{t.banner.support}</p>
                  </Banner>
                )}
              </Layout.Section>
              <>
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
              </>
            </Layout>
          </Layout.Section>
          <Layout.Section secondary>
            <CustomizeArea />
          </Layout.Section>
        </Layout>
      )}
    </>
  );
};

export default Index;
