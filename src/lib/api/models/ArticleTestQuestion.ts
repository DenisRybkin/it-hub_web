/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ArticleTest } from './ArticleTest';
import type { ArticleTestAnswer } from './ArticleTestAnswer';

export type ArticleTestQuestion = {
  /**
   * id of test create-examination-question
   */
  id: number;
  /**
   * name of create-examination-question
   */
  name: string;
  /**
   * FK of ArticleTest
   */
  testId: number;
  /**
   * test of this create-examination-question
   */
  test?: ArticleTest;
  /**
   * answers of create-examination-question
   */
  answers?: Array<ArticleTestAnswer>;
};
