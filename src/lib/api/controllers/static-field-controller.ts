import { ApiControllerGet } from '@lib/api/bases';
import {
  BaseProcessedError,
  ReadStaticFieldFilterDto,
  StaticField,
  User,
} from '@lib/api/models';
import { AxiosError, AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';

export class StaticFieldController extends ApiControllerGet<
  StaticField,
  ReadStaticFieldFilterDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'static-field');
  }

  async upload(
    data: FormData,
    onSuccess?: (model: StaticField) => void,
    onError?: (error: BaseProcessedError) => void
  ): Promise<StaticField> {
    return await this.process<StaticField>(
      this.post('', { data: { image: data } }),
      onSuccess,
      onError
    );
  }

  async delete(
    id: number,
    onSuccess?: (result: boolean) => void,
    onError?: (error: BaseProcessedError) => void
  ): Promise<boolean> {
    return await this.process(this.remove(id.toString()), onSuccess, onError);
  }
}
