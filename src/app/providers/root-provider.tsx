import { BrowserRouter } from 'react-router-dom';
import { IProviderProps } from '@app/providers/i-provider-props';
import { StoreProvider } from '@app/providers/store';
import { LocaleProvider } from '@app/providers/locale';
import { LocationHistoryProvider } from '@app/providers/location-history';
import { ErrorBoundaryProvider } from '@app/providers/error-boundary';
import { ThemeProvider } from '@app/providers/theme';

export const RootProvider = (props: IProviderProps) => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <ThemeProvider>
          <LocaleProvider>
            <LocationHistoryProvider>
              <ErrorBoundaryProvider>{props.children}</ErrorBoundaryProvider>
            </LocationHistoryProvider>
          </LocaleProvider>
        </ThemeProvider>
      </StoreProvider>
    </BrowserRouter>
  );
};
