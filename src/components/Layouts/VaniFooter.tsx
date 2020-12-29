import { FooterHelp, Link } from '@shopify/polaris';
import React from 'react';

interface VaniFooterProps {}

export const VaniFooter: React.FC<VaniFooterProps> = ({}) => {
  return (
    <FooterHelp>
      <Link url="https://github.com/keidarcy" external>
        お問い合わせ
      </Link>
    </FooterHelp>
  );
};
