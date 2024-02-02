import { ApiControllerRead } from '@lib/api/bases';
import {
  BaseProcessedError,
  ReadStaticFieldFilterDto,
  StaticField,
} from '@lib/api/models';
import { LockerModel, PagingModel } from '@lib/api/types';
import { AxiosInstance } from 'axios';

export class StaticFieldController extends ApiControllerRead<
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
      this.post('', {
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
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

  async getDefaultAvatars(
    onSuccess?: (model: PagingModel<StaticField>) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process(this.get('default-avatars'), onSuccess, onError);
  }

  async getPreviews(
    onSuccess?: (model: PagingModel<StaticField>) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process(this.get('previews'), onSuccess, onError);
  }
}
