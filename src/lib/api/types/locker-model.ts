import { Mutex, Semaphore } from "async-mutex";

export type LockerModel = Mutex | Semaphore;