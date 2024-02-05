import { AuthProvider } from '@app/providers/auth';
import { ErrorBoundaryProvider } from '@app/providers/error-boundary';
import { HealthProvider } from '@app/providers/health';
import { IProviderProps } from '@app/providers/i-provider-props';
import { LocaleProvider } from '@app/providers/locale';
import { LocationHistoryProvider } from '@app/providers/location-history';
import { PreloaderProvider } from '@app/providers/preloader';
import { QueryProvider } from '@app/providers/query/query-provider';
import { SetupApi } from '@app/providers/setup-api';
import { ThemeProvider } from '@app/providers/theme';
import { Toaster } from '@components/ui/toaster';
import { TooltipProvider } from '@components/ui/tooltip';
import { BrowserRouter } from 'react-router-dom';

export const RootProvider = (props: IProviderProps) => {
  return (
    <BrowserRouter>
      <SetupApi />
      <QueryProvider>
        <ThemeProvider>
          <LocaleProvider>
            <LocationHistoryProvider>
              <HealthProvider>
                <PreloaderProvider>
                  <AuthProvider>
                    <Toaster />
                    <ErrorBoundaryProvider>
                      {props.children}
                    </ErrorBoundaryProvider>
                  </AuthProvider>
                </PreloaderProvider>
              </HealthProvider>
            </LocationHistoryProvider>
          </LocaleProvider>
        </ThemeProvider>
      </QueryProvider>
    </BrowserRouter>
  );
};
