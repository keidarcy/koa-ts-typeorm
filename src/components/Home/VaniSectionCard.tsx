import {
  Card,
  Heading,
  Layout,
  Link,
  SettingToggle,
  Stack,
  TextField
} from '@shopify/polaris';
import { useCallback, useContext } from 'react';
import { VaniContext } from '../../utils/contexts/VCScontext';
import { VaniActionEnum } from '../../utils/type.helper';

interface VaniSectionCardProps {
  active: boolean;
  name: string;
  description: string;
  pages: string[];
  defaultTitle: string;
  previewUrl: string;
  title: string;
  toogleField: string;
  titleField: string;
}

export const VaniSectionCard: React.FC<VaniSectionCardProps> = ({
  active,
  name,
  description,
  pages,
  defaultTitle,
  previewUrl,
  title,
  toogleField,
  titleField
}) => {
  const contentStatus = active ? 'Disable' : 'Enable';

  const { dispatch } = useContext(VaniContext);

  const handleChange = useCallback(
    (value) =>
      dispatch({
        type: VaniActionEnum.CHANGE_CUSTOMIZE_VALUE,
        field: titleField,
        value
      }),
    []
  );

  return (
    <>
      <Layout.Section>
        <Card>
          <Card.Section>
            <SettingToggle
              action={{
                content: contentStatus,
                onAction: () => {
                  dispatch({
                    type: VaniActionEnum.CHANGE_CUSTOMIZE_VALUE,
                    field: toogleField,
                    value: !active
                  });
                }
              }}
              enabled={active}
            >
              <Heading>{name}</Heading>
              <p>{description}</p>
            </SettingToggle>
          </Card.Section>
          <Card.Section subdued={!active}>
            <Stack alignment="center" distribution="fill">
              <Heading>Title</Heading>
              <TextField
                label={name}
                labelHidden
                disabled={!active}
                value={title}
                onChange={handleChange}
                placeholder={defaultTitle}
                align="left"
              />
            </Stack>
          </Card.Section>
          <Card.Section subdued={!active}>
            <Stack alignment="center" distribution="equalSpacing">
              <p>Shows on the following pages: {pages.join(',')}</p>
              {previewUrl && (
                <Link url={previewUrl} external>
                  preview
                </Link>
              )}
            </Stack>
          </Card.Section>
        </Card>
      </Layout.Section>
    </>
  );
};
