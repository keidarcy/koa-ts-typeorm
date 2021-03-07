import { Frame, Page } from '@shopify/polaris';
import { VaniSaveBar } from './VaniSaveBar';
import { QueryClient, QueryClientProvider } from 'react-query';
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
      </QueryClientProvider>
    </Frame>
  );
};
