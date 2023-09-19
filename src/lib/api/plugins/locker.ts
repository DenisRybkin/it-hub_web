import { Mutex, Semaphore } from 'async-mutex';

export const mutexLocker: Mutex = new Mutex();
export const semaphoreLockerFactory = (initValue: number): Semaphore =>
  new Semaphore(initValue);
