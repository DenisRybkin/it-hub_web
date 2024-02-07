import { QuestionWithoutIdDto } from '@components/entities/test/common/types';
import { ApiControllerBase } from '@lib/api/bases';
import { BaseProcessedError } from '@lib/api/models';
import { LockerModel } from '@lib/api/types';
import { LocaleKeys } from '@lib/constants';
import { AxiosInstance } from 'axios';

export class OpenAiController extends ApiControllerBase {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'open-ai');
  }

  async genQuestion(
    topic: string,
    locale: LocaleKeys,
    count: number,
    onSuccess?: (model: { questions: QuestionWithoutIdDto[] }) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return this.process(
      this.get('questions', {
        params: { topic, locale, count },
      }),
      onSuccess,
      onError
    );
  }
}
