import { ErrorInfo } from 'react';
import type {
  ErrorBoundaryError,
  ErrorBoundaryReset,
} from '@app/providers/error-boundary/error-boundary';
import { RootLayout } from '@components/layouts';
import { Button } from '@components/ui/button';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@app/router';
import { RouteKeys } from '@lib/constants';
import { useTranslation } from 'react-i18next';

// TODO: переверстать

export const ErrorFallback = (
  reset: ErrorBoundaryReset,
  error?: ErrorBoundaryError,
  errorInfo?: ErrorInfo
) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRedirectToHome = () => navigate(RoutePaths[RouteKeys.HOME]);

  return (
    <RootLayout>
      <div className="w-full max-w-2xl flex flex-col items-center">
        <div>
          <h2>Error: {error?.name}</h2>
        </div>
        <pre className="overflow-hidden break-words">
          {errorInfo && JSON.stringify(errorInfo)}
        </pre>
        <Button variant="primary" onClick={reset ?? handleRedirectToHome}>
          {t('ui:link.go_home')}
        </Button>
      </div>
    </RootLayout>
  );
};
