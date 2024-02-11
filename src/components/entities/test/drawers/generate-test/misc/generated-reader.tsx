import { QuestionWithoutIdDto } from '@components/entities/test/common/types';

interface IGeneratedReaderProps {
  data: QuestionWithoutIdDto[];
}

export const GeneratedReader = (props: IGeneratedReaderProps) => {
  return (
    <div className="rounded-lg p-4 pl-8 bg-dark-1">
      <ul className="list-decimal">
        {props.data.map((question, index) => (
          <li key={index}>
            <p>{question.name}</p>
            <ul className="list-disc pl-6">
              {question.answers.map((answer, index) => (
                <li key={index}>
                  {answer.name} {answer.isRight ? '✅' : '❌'}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
