import {
  Card,
  Heading,
  Layout,
  Link,
  SettingToggle,
  Stack,
  TextField
} from '@shopify/polaris';
import { useCallback, useState } from 'react';

interface VaniSectionCardProps {
  title: string;
  description: string;
  pages: string[];
  showPreview: boolean;
  defaultTitle: string;
  previewUrl: string;
}

export const VaniSectionCard: React.FC<VaniSectionCardProps> = ({
  title,
  description,
  pages,
  showPreview,
  defaultTitle,
  previewUrl
}) => {
  const [active, setActive] = useState(false);

  const handleToggle = useCallback(() => setActive((active) => !active), []);

  const contentStatus = active ? 'Disable' : 'Enable';
  const textStatus = active ? 'enabled' : 'disabled';

  return (
    <>
      <Layout.Section oneHalf>
        <Card>
          <Card.Section>
            <SettingToggle
              action={{
                content: contentStatus,
                onAction: handleToggle
              }}
              enabled={active}
            >
              <Heading>{title}</Heading>
              <p>{description}</p>
            </SettingToggle>
          </Card.Section>
          <Card.Section subdued={!active}>
            <Stack alignment="center" distribution="fill">
              <Heading>Title show in front page</Heading>
              <TextField
                label={title}
                labelHidden
                disabled={!active}
                value={`default text ${defaultTitle}`}
                onChange={() => {}}
                helpText={defaultTitle}
                align="left"
              />
            </Stack>
          </Card.Section>
          <Card.Section subdued={!active}>
            <Stack alignment="center" distribution="equalSpacing">
              <p>Shows on the following pages: {pages.join(',')}</p>
              <Link url={previewUrl} external>
                preview
              </Link>
            </Stack>
          </Card.Section>
        </Card>
      </Layout.Section>
    </>
  );
};
