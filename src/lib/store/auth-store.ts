import { makeAutoObservable } from 'mobx';
import { RootStore } from './root-store';
import { LocaleStorageKeys } from '@lib/constants';
import { User } from '@lib/api/models';

export class AuthStore {
  root: RootStore;
  private accessToken: string | null = null;
  private user: User | null = null;

  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
    this.accessToken = localStorage.getItem(LocaleStorageKeys.JWT);
  }

  public get hasAccess() {
    return this.accessToken ?? localStorage.getItem(LocaleStorageKeys.JWT);
  }

  public get isAuth() {
    return (
      (this.accessToken ?? localStorage.getItem(LocaleStorageKeys.JWT)) &&
      this.user
    );
  }

  public get getUser() {
    return this.user;
  }

  public get getRole() {
    return this.user.role;
  }

  setUser(user?: User) {
    this.user = user;
  }

  setAccessToken(accessToken?: string) {
    this.accessToken = accessToken;
    if (!accessToken) localStorage.removeItem(LocaleStorageKeys.JWT);
  }
}
