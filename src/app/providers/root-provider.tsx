import { BrowserRouter } from 'react-router-dom';
import { IProviderProps } from '@app/providers/i-provider-props';
import { StoreProvider } from '@app/providers/store';
import { LocaleProvider } from '@app/providers/locale';
import { LocationHistoryProvider } from '@app/providers/location-history';
import { ErrorBoundaryProvider } from '@app/providers/error-boundary';
import { ThemeProvider } from '@app/providers/theme';
import { SetupApi } from '@app/providers/setup-api';
import { AuthProvider } from '@app/providers/auth';
import { PreloaderProvider } from '@app/providers/preloader';
import { Toaster } from '@components/ui/toaster';

export const RootProvider = (props: IProviderProps) => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <SetupApi />
        <ThemeProvider>
          <LocaleProvider>
            <LocationHistoryProvider>
              <PreloaderProvider>
                <AuthProvider>
                  <Toaster />
                  <ErrorBoundaryProvider>
                    {props.children}
                  </ErrorBoundaryProvider>
                </AuthProvider>
              </PreloaderProvider>
            </LocationHistoryProvider>
          </LocaleProvider>
        </ThemeProvider>
      </StoreProvider>
    </BrowserRouter>
  );
};
