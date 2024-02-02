import { AxiosInstance } from 'axios';

import {
  AchievementController,
  AppController,
  ArticleCommentController,
  ArticleController,
  ArticleShortController,
  ArticleTestAnswerController,
  ArticleTestController,
  ArticleTestQuestionController,
  ArticleTestUserController,
  AuthController,
  CategoryController,
  ExaminationAnswerController,
  ExaminationController,
  ExaminationQuestionController,
  HashtagController,
  OpenAiController,
  RoleController,
  StaticFieldController,
  UserController,
  UserShortController,
} from '@/lib/api/controllers';
import { client } from '@/lib/api/plugins/client';
import { mutexLocker } from '@/lib/api/plugins/locker';
import { LockerModel } from '@/lib/api/types';

class Api {
  readonly app: AppController;
  readonly auth: AuthController;
  readonly user: UserController;
  readonly userShort: UserShortController;
  readonly staticField: StaticFieldController;
  readonly category: CategoryController;
  readonly examination: ExaminationController;
  readonly examinationQuestion: ExaminationQuestionController;
  readonly examinationAnswer: ExaminationAnswerController;
  readonly role: RoleController;
  readonly openAI: OpenAiController;
  readonly hashtag: HashtagController;
  readonly articleTest: ArticleTestController;
  readonly articleTestQuestion: ArticleTestQuestionController;
  readonly articleTestAnswer: ArticleTestAnswerController;
  readonly articleComment: ArticleCommentController;
  readonly article: ArticleController;
  readonly articleShort: ArticleShortController;
  readonly achievement: AchievementController;
  readonly articleTestUser: ArticleTestUserController;

  constructor(client: AxiosInstance, locker: LockerModel) {
    this.app = new AppController(client, locker);
    this.auth = new AuthController(client, locker);
    this.user = new UserController(client, locker);
    this.userShort = new UserShortController(client, locker);
    this.staticField = new StaticFieldController(client, locker);
    this.category = new CategoryController(client, locker);
    this.examination = new ExaminationController(client, locker);
    this.examinationQuestion = new ExaminationQuestionController(
      client,
      locker
    );
    this.examinationAnswer = new ExaminationAnswerController(client, locker);
    this.role = new RoleController(client, locker);
    this.openAI = new OpenAiController(client, locker);
    this.hashtag = new HashtagController(client, locker);
    this.articleTest = new ArticleTestController(client, locker);
    this.articleTestQuestion = new ArticleTestQuestionController(
      client,
      locker
    );
    this.articleTestUser = new ArticleTestUserController(client, locker);
    this.articleTestAnswer = new ArticleTestAnswerController(client, locker);
    this.articleComment = new ArticleCommentController(client, locker);
    this.article = new ArticleController(client, locker);
    this.articleShort = new ArticleShortController(client, locker);
    this.achievement = new AchievementController(client, locker);
  }
}
export const api = new Api(client, mutexLocker);
