import { AxiosInstance } from 'axios';
import { LockerModel } from '@/lib/api/types';
import { mutexLocker } from '@/lib/api/plugins/locker';
import {
  AuthController,
  CategoryController,
  UserController,
  ExaminationController,
  StaticFieldController,
  ExaminationQuestionController,
  ExaminationAnswerController,
  OpenAiController,
  HashtagController,
  RoleController,
  ArticleTestController,
  ArticleTestQuestionController,
  ArticleTestAnswerController,
  ArticleCommentController,
  ArticleController,
  AchievementController,
} from '@/lib/api/controllers';
import { client } from '@/lib/api/plugins/client';

class Api {
  auth: AuthController;
  user: UserController;
  staticField: StaticFieldController;
  category: CategoryController;
  examination: ExaminationController;
  examinationQuestion: ExaminationQuestionController;
  examinationAnswer: ExaminationAnswerController;
  role: RoleController;
  openAI: OpenAiController;
  hashtag: HashtagController;
  articleTest: ArticleTestController;
  articleTestQuestion: ArticleTestQuestionController;
  articleTestAnswer: ArticleTestAnswerController;
  articleComment: ArticleCommentController;
  article: ArticleController;
  achievement: AchievementController;

  constructor(client: AxiosInstance, locker: LockerModel) {
    this.auth = new AuthController(client, locker);
    this.user = new UserController(client, locker);
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
    this.articleTestAnswer = new ArticleTestAnswerController(client, locker);
    this.articleComment = new ArticleCommentController(client, locker);
    this.article = new ArticleController(client, locker);
    this.achievement = new AchievementController(client, locker);
  }
}
export const api = new Api(client, mutexLocker);
