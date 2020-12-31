import { Frame, Page, Layout } from '@shopify/polaris';
import { VaniSaveBar } from './VaniSaveBar';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { VaniContextProvider } from '../../utils/contexts/VCScontext';

interface VaniProviderProps {
  children?: React.ReactNode;
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export const VaniProvider: React.FC<VaniProviderProps> = ({ children }) => {
  return (
    <Frame>
      <QueryClientProvider client={queryClient}>
        <VaniContextProvider>
          <VaniSaveBar />
          <Page>{children}</Page>
        </VaniContextProvider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </Frame>
  );
};
