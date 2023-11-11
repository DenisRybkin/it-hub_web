import { ApiControllerGet } from '@lib/api/bases';
import { Achievement, ReadAchievementFilterDto } from '@lib/api/models';
import { AxiosInstance } from 'axios';
import { LockerModel } from '@lib/api/types';

export class AchievementController extends ApiControllerGet<
  Achievement,
  ReadAchievementFilterDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'achievement');
  }
}
