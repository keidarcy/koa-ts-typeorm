import { EmptyState, Layout, Page } from '@shopify/polaris';
import axios from 'axios';
import React, { useEffect } from 'react';

const Index: React.FC = () => {
  const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';
  useEffect(() => {
    const fn = async () => {
      const { data } = await axios.get('/api/product');
      console.log(data);
    };
    fn();
  });

  return (
    <Page>
      <Layout>
        <EmptyState
          heading="Discount your products temporarily"
          action={{
            content: 'Select products',
            onAction: () => console.log('clicked')
          }}
          image={img}
        >
          <p>Select products to change their price temporarily.</p>
        </EmptyState>
      </Layout>
    </Page>
  );
};

export default Index;
