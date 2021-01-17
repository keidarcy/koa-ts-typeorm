import { Modal, Stack, TextContainer } from '@shopify/polaris';
import { useT } from '../../utils/hooks/useT';

interface VaniModalprops {
  showModal: boolean;
  toggleModal: () => void;
}

export const VaniModal: React.FC<VaniModalprops> = ({ showModal, toggleModal }) => {
  const t = useT();
  return (
    <Modal
      open={showModal}
      onClose={toggleModal}
      title={t.contact.title}
      primaryAction={{
        content: t.contact.close,
        onAction: toggleModal
      }}
    >
      <Modal.Section>
        <Stack vertical>
          <Stack.Item>
            <TextContainer>
              <p>{t.contact.install}</p>
              <p>{t.contact.question}</p>
            </TextContainer>
          </Stack.Item>
          <Stack.Item fill>
            <a target="_blank" href="mailto:xxx@xxx.xxx" style={{ color: '#000' }}>
              {t.contact.email}
            </a>{' '}
            or{' '}
            <span
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
              onClick={() => globalThis.Tawk_API.toggle()}
            >
              {t.contact.live}
            </span>
          </Stack.Item>
        </Stack>
      </Modal.Section>
    </Modal>
  );
};
