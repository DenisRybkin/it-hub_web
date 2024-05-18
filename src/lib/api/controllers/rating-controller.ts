import { ApiControllerRead } from '@lib/api/bases';
import { ReadRatingFilterDto, UserAchievement } from '@lib/api/models';
import { LockerModel } from '@lib/api/types';
import { AxiosInstance } from 'axios';

export class RatingController extends ApiControllerRead<
  UserAchievement,
  ReadRatingFilterDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'rating');
  }
}
