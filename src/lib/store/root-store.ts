import { makeAutoObservable } from 'mobx';
import { AuthStore } from '@lib/store/auth-store';

export class RootStore {
  public authStore: AuthStore;

  constructor() {
    makeAutoObservable(this);
    this.authStore = new AuthStore(this);
  }
}

export const rootStore = new RootStore();
