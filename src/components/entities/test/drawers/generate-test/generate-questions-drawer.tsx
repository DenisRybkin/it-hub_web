import { QuestionWithoutIdDto } from '@components/entities/test/common/types';
import { GenerateTestFrom } from '@components/entities/test/drawers/generate-test/forms/generate-test-from';
import { GeneratedReader } from '@components/entities/test/drawers/generate-test/misc/generated-reader';
import { Button } from '@components/ui/button';
import { DrawerAdapter } from '@components/ui/drawer';
import { CircularLoader } from '@components/ui/loader';
import { toast } from '@components/ui/use-toast';
import { api } from '@lib/api/plugins';
import { LocaleKeys } from '@lib/constants';
import { GenerateTestSchema } from '@lib/utils/validations';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

interface IGenerateQuestionsDrawerProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  onAddQuestions: (DTOs: QuestionWithoutIdDto[]) => void;
  getTopic: () => Promise<string>;
}

export const GenerateQuestionsDrawer = (
  props: IGenerateQuestionsDrawerProps
) => {
  const { t, i18n } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isShowMode, setIsShowMode] = useState<boolean>(false);
  const [state, setState] = useState<undefined | QuestionWithoutIdDto[]>(
    undefined
  );

  const handleToggleShowMode = () => setIsShowMode(prev => !prev);

  const handleInjectQuestions = () =>
    (state && void props.onAddQuestions(state)) ||
    void setIsAdded(true) ||
    props.onOpenChange(false);

  const handleError = () => {
    toast({
      variant: 'destructive',
      title: t('toast:error.default'),
    });
  };

  const handleGenerateQuestions = async (
    dto: z.infer<typeof GenerateTestSchema>
  ) => {
    setIsLoading(true);
    await api.openAI.genQuestion(
      dto.topic,
      (i18n.language as LocaleKeys) ?? LocaleKeys.EN,
      dto.count,
      dto =>
        void setState(dto.questions) ||
        void setIsAdded(false) ||
        setIsShowMode(true),
      handleError
    );
    setIsLoading(false);
  };

  return (
    <DrawerAdapter
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      title={t('ui:title.generating_test')}
      description={t('ui:subheader.generating_test')}
      extraContent={
        state &&
        !isLoading && (
          <Button variant="primary" onClick={handleToggleShowMode}>
            {t(isShowMode ? 'ui:button.options' : 'ui:button.result')}
          </Button>
        )
      }
    >
      <div className="h-96 w-full flex items-start justify-center">
        {isLoading ? (
          <div className="flex flex-col gap-2 w-full h-full">
            <CircularLoader size="lg" />
            <span className="text-center">{t('text:please_wait')}</span>
          </div>
        ) : isShowMode ? (
          <div className="flex flex-col gap-2 h-full overflow-y-auto">
            <GeneratedReader data={state ?? []} />
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {t('text:generated_questions_info')}
            </span>
            <Button
              disabled={isAdded}
              className="mt-auto"
              variant="primary"
              onClick={handleInjectQuestions}
            >
              {t('ui:button.add')}
            </Button>
          </div>
        ) : (
          <GenerateTestFrom
            getTopic={props.getTopic}
            onSubmit={handleGenerateQuestions}
          />
        )}
      </div>
    </DrawerAdapter>
  );
};
