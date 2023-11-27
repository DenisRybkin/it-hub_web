export interface AnswerDto {
  id: number;
  name: string;
  questionId: number;
  isRight: boolean;
}

export interface AnswerWithoutIdDto
  extends Omit<AnswerDto, 'id' | 'questionId'> {}
