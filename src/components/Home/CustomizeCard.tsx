import { Card, Layout, List } from '@shopify/polaris';

export const CustomizeCard = () => {
  return (
    <Layout.Section>
      <Card title="Staff accounts">
        <Card.Section>
          <List>
            <List.Item>Felix Crafford</List.Item>
            <List.Item>Ezequiel Manno</List.Item>
          </List>
        </Card.Section>
      </Card>
    </Layout.Section>
  );
};
