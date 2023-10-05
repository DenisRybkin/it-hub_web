import { AxiosInstance } from 'axios';
import { LockerModel } from '@/lib/api/types';
import { mutexLocker } from '@/lib/api/plugins/locker';
import {
  AuthController,
  CategoryController,
  UserController,
  ExaminationController,
  StaticFieldController,
  QuestionController,
  AnswerController,
} from '@/lib/api/controllers';
import { client } from '@/lib/api/plugins/client';

class Api {
  auth: AuthController;
  user: UserController;
  staticField: StaticFieldController;
  category: CategoryController;
  examination: ExaminationController;
  question: QuestionController;
  answer: AnswerController;

  constructor(client: AxiosInstance, locker: LockerModel) {
    this.auth = new AuthController(client, locker);
    this.user = new UserController(client, locker);
    this.staticField = new StaticFieldController(client, locker);
    this.category = new CategoryController(client, locker);
    this.examination = new ExaminationController(client, locker);
    this.question = new QuestionController(client, locker);
    this.answer = new AnswerController(client, locker);
  }
}
export const api = new Api(client, mutexLocker);
