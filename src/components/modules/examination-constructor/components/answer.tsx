import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';
import { FiX } from 'react-icons/fi';
import { Button } from '@components/ui/button';

interface IAnswerPropsProps {
  answerId: number;
  isRight: boolean;
  onChangeIsRight: (isRight: boolean, id: number) => void;
  name: string;
  onChangeName: (title: string, id: number) => void;
  onDelete: (id: number) => void;
}

export const Answer = (props: IAnswerPropsProps) => {
  const { t } = useTranslation();

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleChangeChecked = (isRight: boolean) =>
    props.onChangeIsRight(isRight, props.answerId);

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) =>
    props.onChangeName(event.target.value, props.answerId);

  const handleDelete = () => props.onDelete(props.answerId);

  return (
    <div className="flex items-center gap-3 justify-start items-start w-full">
      <Checkbox checked={props.isRight} onCheckedChange={handleChangeChecked} />
      <Input
        size="sm"
        variant="ghost"
        value={props.name}
        onChange={handleChangeName}
        placeholder={t('ui:placeholder.come_up_answer')}
        type="text"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      {!isFocus && (
        <Button size="icon-sm" variant="ghost" onClick={handleDelete}>
          <FiX height={15} width={15} />
        </Button>
      )}
    </div>
  );
};
