import { FooterHelp } from '@shopify/polaris';
import React from 'react';
import { useT } from '../../utils/hooks/useT';

export const VaniFooter: React.FC = () => {
  const t = useT();
  return (
    <FooterHelp>
      <span
        style={{ textDecoration: 'underline', cursor: 'pointer' }}
        onClick={() => globalThis.Tawk_API.toggle()}
      >
        {t.footer.contact}
      </span>
    </FooterHelp>
  );
};
