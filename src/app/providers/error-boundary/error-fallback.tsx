import { ErrorInfo } from 'react';
import type {
  ErrorBoundaryError,
  ErrorBoundaryReset,
} from '@app/providers/error-boundary/error-boundary';

// TODO: переверстать

export const ErrorFallback = (
  reset: ErrorBoundaryReset,
  error?: ErrorBoundaryError,
  errorInfo?: ErrorInfo
) => {
  return (
    <div className="w-full max-w-2xl flex flex-col items-center">
      <div>
        <h2>Error {error?.name}</h2>
      </div>
      <pre>{errorInfo && JSON.stringify(errorInfo)}</pre>
      <button onClick={reset}>Go to home</button>
    </div>
  );
};
