import { TitleBar } from '@shopify/app-bridge-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useT } from '../../utils/hooks/useT';
import { VaniModal } from './VaniModal';

interface VaniTitleBarProps {}

export const VaniTitleBar: React.FC<VaniTitleBarProps> = ({}) => {
  const router = useRouter();
  const t = useT();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  return (
    <>
      <TitleBar
        title=""
        secondaryActions={[
          {
            content: t.meun.home,
            onAction: () => router.push('/')
          },
          {
            content: t.meun.help,
            onAction: () => setShowModal(!showModal)
          }
        ]}
      />
      <VaniModal showModal={showModal} toggleModal={toggleModal} />
    </>
  );
};
