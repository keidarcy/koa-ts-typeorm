import { Card, Layout, Page } from '@shopify/polaris';

const Hello: React.FC = () => {
  return (
    <Page>
      <Layout>
        <Layout.AnnotatedSection
          title="gan ni shuone Default he lodiscount"
          description="Add a product to Sample App, it will automatically be discounted."
        >
          <Card sectioned>
            <div>Card</div>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
};

export default Hello;
