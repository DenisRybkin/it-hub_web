import { ApiControllerCRUD } from '@lib/api/bases';
import {
  BaseProcessedError,
  CreateUserDto,
  CreateUserFollowingDto,
  FollowDto,
  ReadUserFilterDto,
  UpdatePartiallyUserDto,
  UpdateUserDto,
  User,
  UserAvatar,
  UserAvatarDto,
  UserInfoDto,
} from '@lib/api/models';
import { LockerModel, PagingModel } from '@lib/api/types';
import { AxiosInstance } from 'axios';

export class UserController extends ApiControllerCRUD<
  User,
  ReadUserFilterDto,
  CreateUserDto,
  UpdateUserDto,
  UpdatePartiallyUserDto
> {
  constructor(client: AxiosInstance, locker: LockerModel) {
    super(client, locker, 'user');
  }

  async getMe(
    onSuccess?: (model: User) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<User>(this.get('get-me'), onSuccess, onError);
  }

  async getCountFollowers(
    userId: number,
    onSuccess?: (model: number) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<number>(
      this.get(`follower/${userId}/count`),
      onSuccess,
      onError
    );
  }

  async getFollowers(
    userId: number,
    onSuccess?: (model: PagingModel<User>) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<PagingModel<User>>(
      this.get('follower/:userId'),
      onSuccess,
      onError
    );
  }

  async getCountFollowing(
    userId: number,
    onSuccess?: (model: number) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<number>(
      this.get(`following/${userId}/count`),
      onSuccess,
      onError
    );
  }

  async getFollowings(
    userId: number,
    onSuccess?: (model: PagingModel<User>) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<PagingModel<User>>(
      this.get('following/:userId'),
      onSuccess,
      onError
    );
  }

  async getInfo(
    userId: number,
    onSuccess?: (model: UserInfoDto) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process(this.get(`info/${userId}`), onSuccess, onError);
  }

  async follow(
    dto: CreateUserFollowingDto,
    onSuccess?: (model: FollowDto) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<FollowDto>(
      this.post('follow', { data: dto }),
      onSuccess,
      onError
    );
  }

  async unfollow(
    userId: number,
    onSuccess?: (model: boolean) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<boolean>(
      this.remove(`unfollow/${userId}`),
      onSuccess,
      onError
    );
  }

  async addAvatar(
    dto: UserAvatarDto,
    onSuccess?: (model: UserAvatar) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<UserAvatar>(
      this.post('avatar', { data: dto }),
      onSuccess,
      onError
    );
  }

  async updateAvatar(
    dto: UserAvatarDto,
    onSuccess?: (model: UserAvatar) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process<UserAvatar>(
      this.patch('avatar', { data: dto }),
      onSuccess,
      onError
    );
  }

  async deleteAvatar(
    userId: number,
    onSuccess?: (model: boolean) => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process(
      this.remove(userId.toString()),
      onSuccess,
      onError
    );
  }

  async toggleFavoriteCategory(
    categoryId: number,
    onSuccess?: () => void,
    onError?: (error: BaseProcessedError) => void
  ) {
    return await this.process(
      this.post('category/favorite', { data: { categoryId } })
    );
  }
}
