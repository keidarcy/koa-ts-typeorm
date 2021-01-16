import { TitleBar } from '@shopify/app-bridge-react';
import { useRouter } from 'next/router';
import React from 'react';
import t from '../../utils/en.json';

interface VaniTitleBarProps {}

export const VaniTitleBar: React.FC<VaniTitleBarProps> = ({}) => {
  const router = useRouter();
  return (
    <TitleBar
      title=""
      secondaryActions={[
        {
          content: t.meun.home,
          onAction: () => router.push('/')
        },
        {
          content: t.meun.contact,
          onAction: () => router.push('/contact')
        },
        {
          content: t.meun.faq,
          onAction: () => router.push('/faq')
        }
      ]}
    />
  );
};
