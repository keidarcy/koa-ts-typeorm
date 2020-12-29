import { ContextualSaveBar } from '@shopify/polaris';
import React from 'react';

interface VaniSaveBarProps {}

export const VaniSaveBar: React.FC<VaniSaveBarProps> = ({}) => {
  return (
    <>
      <ContextualSaveBar
        alignContentFlush
        message="Unsaved changes"
        saveAction={{
          onAction: () => console.log('add form submit logic'),
          loading: true
        }}
        discardAction={{
          onAction: () => console.log('add clear form logic')
        }}
      />
      <div style={{ marginTop: '5rem' }} />
    </>
  );
};
