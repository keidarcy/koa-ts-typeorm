import { Frame, Page, Layout } from '@shopify/polaris';
import React from 'react';
import { VaniSaveBar } from './VaniSaveBar';

interface VaniFrameProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export const VaniFrame: React.FC<VaniFrameProps> = ({ state, setState, children }) => {
  return (
    <Frame>
      {state && <VaniSaveBar />}
      <div onClick={() => setState(!state)}>nice</div>
      <Page>
        <Layout>{children}</Layout>
      </Page>
    </Frame>
  );
};
