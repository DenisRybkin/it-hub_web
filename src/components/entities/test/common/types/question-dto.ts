import {
  AnswerDto,
  AnswerWithoutIdDto,
} from '@components/entities/test/common/types/answer-dto';

export interface QuestionDto {
  id: number;
  name: string;
  answers: AnswerDto[];
}

export interface QuestionWithoutIdDto
  extends Omit<QuestionDto, 'id' | 'answers'> {
  answers: AnswerWithoutIdDto[];
}
