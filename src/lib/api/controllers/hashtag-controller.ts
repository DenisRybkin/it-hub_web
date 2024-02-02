import { ApiControllerCRUD } from '@lib/api/bases';
import {
  CreateHashtagDto,
  Hashtag,
  ReadHashtagFilterDto,
  UpdateHashtagDto,
  UpdatePartiallyHashtagDto,
} from '@lib/api/models';
import { LockerModel } from '@lib/api/types';
import { AxiosInstance } from 'axios';

export class HashtagController extends ApiControllerCRUD<
  Hashtag,
  ReadHashtagFilterDto,
  CreateHashtagDto,
  UpdateHashtagDto,
  UpdatePartiallyHashtagDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'hashtag');
  }
}
