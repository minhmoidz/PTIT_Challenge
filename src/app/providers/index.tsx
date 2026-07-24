import type { ReactNode } from 'react';
import { StrictMode } from 'react';
import { ThemeProvider, StyledEngineProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createPiccTheme } from '@/theme/createPiccTheme';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  },
});

const theme = createPiccTheme();

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <StrictMode>
    <ErrorBoundary>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </ErrorBoundary>
  </StrictMode>
);
