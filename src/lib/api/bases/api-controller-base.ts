import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { LockerModel } from '@/lib/api/types';
import type { BaseProcessedError } from '@lib/api/models';

export abstract class ApiControllerBase<
  Template = Object,
  DCreate = Object,
  DUpdate = {},
  DUpdatePartially = Object
> {
  protected constructor(
    protected readonly client: AxiosInstance,
    private readonly locker: LockerModel,
    protected readonly controllerName: string
  ) {
    this.client = client;
    this.controllerName = controllerName;
  }

  protected url(next?: string): string {
    return `api/${this.controllerName}` + (next ? `/${next}` : '');
  }

  protected async process<T>(
    request: Promise<T>,
    onSuccess?: (model: T) => void,
    onError?: (error: AxiosError<BaseProcessedError>) => void,
    exclusive: boolean | null = null
  ): Promise<T> {
    if (this.locker.isLocked()) await this.locker.waitForUnlock();
    try {
      const data: T = exclusive
        ? await this.runExclusive<T>(request)
        : await request;
      onSuccess && onSuccess(data);
      return data;
    } catch (error: unknown) {
      if (onError && error instanceof AxiosError)
        onError(error.response?.data as AxiosError<BaseProcessedError>);
      throw error;
    }
  }

  private static async internalRequest<T = never>(
    req: Promise<AxiosResponse<T>>
  ) {
    const request = await req;
    return request?.data;
  }

  private async runExclusive<T>(request: Promise<T>): Promise<T> {
    const release = await this.locker.acquire();
    try {
      return await this.locker.runExclusive<T>(async () => await request);
    } finally {
      if (Array.isArray(release)) release[1]();
      // eslint-disable-next-line @typescript-eslint/ban-types
      else (release as Function)();
    }
  }

  protected async get<T = never, R = AxiosResponse<T>, D = unknown>(
    uri: string,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return await ApiControllerBase.internalRequest(
      this.client.get(this.url(uri), { ...(config ?? {}) })
    );
  }

  protected async post<T = Template, R = AxiosResponse<T>, D = DCreate>(
    uri: string,
    config?: AxiosRequestConfig<D | undefined>
  ): Promise<T> {
    return await ApiControllerBase.internalRequest(
      this.client.post(this.url(uri), config?.data)
    );
  }

  protected async patch<
    T = Template,
    R = AxiosResponse<T>,
    D = DUpdatePartially
  >(uri: string, config?: AxiosRequestConfig<D | undefined>): Promise<T> {
    return await ApiControllerBase.internalRequest(
      this.client.patch(this.url(uri), config?.data)
    );
  }

  protected async put<T = Template, R = AxiosResponse<T>, D = any>(
    uri: string,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return await ApiControllerBase.internalRequest(
      this.client.put(this.url(uri), config?.data)
    );
  }

  protected async remove<T = boolean>(url: string): Promise<T> {
    return await ApiControllerBase.internalRequest(
      this.client.delete(this.url(url))
    );
  }
}
