import { ApiControllerBase } from '@lib/api/bases';
import { BaseProcessedError, StaticField } from '@lib/api/models';
import { LockerModel } from '@lib/api/types';
import { LocaleKeys } from '@lib/constants';
import { AxiosInstance } from 'axios';

export class OpenAiController extends ApiControllerBase {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'open-ai');
  }

  async genText(
    message: string,
    onSuccess?: (model: string) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return this.process(
      this.get('text', { params: { message } }),
      onSuccess,
      onError
    );
  }

  async genQuestion(
    topic: string,
    locale: LocaleKeys,
    count: number,
    onSuccess?: (model: string) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return this.process(
      this.get('questions', { params: { topic, locale, count } }),
      onSuccess,
      onError
    );
  }
}
