import { Component, ErrorInfo, ReactNode } from 'react';

export type ErrorBoundaryError = Error;
export type ErrorBoundaryReset = () => void;

export interface ErrorBoundaryProps {
  deps?: unknown[];
  fallback: (
    reset: ErrorBoundaryReset,
    error?: ErrorBoundaryError,
    errorInfo?: ErrorInfo
  ) => JSX.Element;
  children: ReactNode;
}
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: ErrorBoundaryError;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  state: ErrorBoundaryState = {
    hasError: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);

    this.setState({ hasError: true, error, errorInfo });
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.props.deps?.toString() !== prevProps.deps?.toString()) {
      this.reset();
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };
  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback == 'function') {
        return (this.props.fallback as Function)(
          this.reset,
          this.state.error,
          this.state.errorInfo
        );
      }

      return this.props.fallback;
    }

    return this.props.children;
  }
}
