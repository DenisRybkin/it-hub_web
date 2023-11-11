import { ApiControllerBase } from '@lib/api/bases';
import { AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';
import { BaseProcessedError, StaticField } from '@lib/api/models';
import { LocaleKeys } from '@lib/constants';

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
