import { Banner, Card, Layout, Page, FormLayout } from '@shopify/polaris';
import axios from 'axios';
import React, { useEffect } from 'react';
import { VaniSectionCard } from '../components/Home/VaniSectionCard';

const Index: React.FC = (): JSX.Element => {
  useEffect(() => {
    const fn = async () => {
      const { data } = await axios.get('/api/product');
      console.log(fn);
    };
    // fn();
  });

  const features = [
    {
      title: 'Also Bought',
      description:
        'For every product, recommends the frequently bought together items with that product. E.g.: People who buy Baby Formula also buy Diapers',
      pages: ['Home page', 'cart page', 'product pages', 'collections'],
      showPreview: true,
      defaultTitle: 'People who bought this product, also bought'
    },
    {
      title: 'Related Products',
      description:
        'For every product, recommends the frequently bought together items with that product. E.g.: People who buy Baby Formula also buy Diapers',
      pages: ['Home page', 'cart page', 'product pages', 'collections'],
      showPreview: true,
      defaultTitle: 'People who bought this product, also bought'
    },
    {
      title: 'Recently Viewed Products',
      description:
        'For every product, recommends the frequently bought together items with that product. E.g.: People who buy Baby Formula also buy Diapers',
      pages: ['Home page', 'cart page', 'product pages', 'collections'],
      showPreview: true,
      defaultTitle: 'People who bought this product, also bought'
    },
    {
      title: 'Best Selling Products',
      description:
        'For every product, recommends the frequently bought together items with that product. E.g.: People who buy Baby Formula also buy Diapers',
      pages: ['Home page', 'cart page', 'product pages', 'collections'],
      showPreview: true,
      defaultTitle: 'People who bought this product, also bought'
    },
    {
      title: 'Newest Products',
      description:
        'For every product, recommends the frequently bought together items with that product. E.g.: People who buy Baby Formula also buy Diapers',
      pages: ['Home page', 'cart page', 'product pages', 'collections'],
      showPreview: true,
      defaultTitle: 'People who bought this product, also bought'
    },
    {
      title: 'MANUAL RECOMMENDATIONS',
      description:
        'For every product, recommends the frequently bought together items with that product. E.g.: People who buy Baby Formula also buy Diapers',
      pages: ['Home page', 'cart page', 'product pages', 'collections'],
      showPreview: true,
      defaultTitle: 'People who bought this product, also bought',
      previewUrl: 'https://'
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
      <Layout.Section>
        <Layout>
          {features.map((feature) => (
            <VaniSectionCard
              key={feature.title}
              title={feature.title}
              defaultTitle={feature.defaultTitle}
              description={feature.description}
              pages={feature.pages}
              showPreview={feature.showPreview}
              previewUrl={feature.previewUrl}
            />
          ))}
        </Layout>
      </Layout.Section>
    </>
  );
};

export default Index;
