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

  public get isAuth() {
    return (
      (this.accessToken ?? localStorage.getItem(LocaleStorageKeys.JWT)) &&
      this.user
    );
  }

  public getUser() {
    return this.user;
  }

  public getRole() {
    return this.user.role;
  }

  setUser(user?: User) {
    this.user = user ?? null;
  }

  setAccessToken(accessToken: string) {
    this.accessToken =
      accessToken ?? localStorage.getItem(LocaleStorageKeys.JWT);
  }
}
