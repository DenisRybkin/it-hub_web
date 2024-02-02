import { ApiControllerRead } from '@lib/api/bases';
import { Achievement, ReadAchievementFilterDto } from '@lib/api/models';
import { LockerModel } from '@lib/api/types';
import { AxiosInstance } from 'axios';

export class AchievementController extends ApiControllerRead<
  Achievement,
  ReadAchievementFilterDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'achievement');
  }
}
