import { Button, EmptyState, Layout, Page } from '@shopify/polaris';
import React from 'react';
import { TitleBar } from '@shopify/app-bridge-react';
import Link from 'next/link';
import { Post, PrismaClient } from '@prisma/client';
import { GetStaticProps } from 'next';

const prisma = new PrismaClient();

export const getStaticProps: GetStaticProps = async () => {
  const posts = await prisma.post.findMany();
  return {
    props: {
      posts
    }
  };
};

interface IndexProps {
  posts: Post[];
}

const Index: React.FC<IndexProps> = ({ posts }) => {
  const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';
  return (
    <Page>
      <TitleBar
        title="Sample App"
        primaryAction={{
          content: 'Select products say HELLO' + posts[0].title
        }}
      />
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
          <Link href="/hello">
            <a>About Us</a>
          </Link>
        </EmptyState>
      </Layout>
    </Page>
  );
};

export default Index;
