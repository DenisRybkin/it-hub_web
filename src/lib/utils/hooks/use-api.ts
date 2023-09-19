import { useEffect, useRef, useState } from 'react';
import { BaseProcessedError } from '@lib/api/models';
import { AxiosError } from 'axios';

export interface IUseApiReturn<T> {
  value: T | undefined | null;
  fetch: () => Promise<T | null>;
  set: (data: T) => void;
  isLoading: boolean;
}

export const useApi = <T>(
  fetcher: () => Promise<T>,
  onError?: (error: AxiosError<BaseProcessedError>) => void,
  onSuccess?: (model: T) => void,
  fetchOnFirstRender = true
): IUseApiReturn<T> => {
  // Response state
  const [data, setData] = useState<T | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dataCopy = useRef<T | null | undefined>(undefined);

  const setDataSync = (v: T | null | undefined) => {
    dataCopy.current = v;
    setData(v);
  };

  const handleError = (error: AxiosError<BaseProcessedError>): null => {
    setIsLoading(false);
    onError && onError(error);
    return null;
  };

  const fetchApi = async (): Promise<T | null> => {
    try {
      setIsLoading(true);
      const response = await fetcher();
      setDataSync(response);
      setIsLoading(false);
      if (response == null) throw new Error();
      if (onSuccess) onSuccess(response);
      return response;
    } catch (e) {
      return handleError(e as AxiosError<BaseProcessedError>);
    }
  };

  useEffect(() => {
    if (fetchOnFirstRender) fetchApi();
  }, []);

  return {
    fetch: fetchApi,
    value: data,
    set: setData,
    isLoading,
  };
};
