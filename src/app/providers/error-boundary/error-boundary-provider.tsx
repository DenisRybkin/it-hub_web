import { ErrorBoundary } from '@app/providers/error-boundary/error-boundary';
import { ErrorFallback } from '@app/providers/error-boundary/error-fallback';
import { IProviderProps } from '@app/providers/i-provider-props';

export const ErrorBoundaryProvider = (props: IProviderProps) => {
  return (
    <ErrorBoundary fallback={ErrorFallback}>{props.children}</ErrorBoundary>
  );
};
