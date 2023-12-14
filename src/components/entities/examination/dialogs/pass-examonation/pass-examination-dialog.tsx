import { DialogAdapter, IBaseDialogProps } from '@components/shared/dialog';
import { useTranslation } from 'react-i18next';
import { toast } from '@components/ui/use-toast';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@lib/api/plugins';
import { CircularLoader } from '@components/ui/loader';
import { TestRunner } from '@components/entities/test/misc/test-runner';
import { QuestionDto } from '@components/entities/test/misc/common/types';
import { QueryKeys } from '@lib/constants';

interface IPassExaminationDialogProps extends IBaseDialogProps {}

export const PassExaminationDialog = (props: IPassExaminationDialogProps) => {
  const { t } = useTranslation();

  const handleError = () =>
    toast({ title: t('toast:error.default'), variant: 'destructive' });

  const handleSuccess = () => {
    toast({ title: t('toast:success.publisher_received'), variant: 'success' });
    props.onOpenChange(false);
  };

  const { data, isLoading } = useQuery({
    queryKey: [api.examination, 1],
    queryFn: async () =>
      await api.examination.getById(1, undefined, handleError),
  });

  const { mutate } = useMutation({
    mutationKey: [QueryKeys.GET_ME],
    mutationFn: () =>
      api.examination.passExamination(1, handleSuccess, handleError),
  });

  return (
    <DialogAdapter
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      title={t('ui:title.pass_examination')}
    >
      {isLoading || !data ? (
        <CircularLoader size="lg" />
      ) : (
        <TestRunner
          title={t('ui:title.take_examination')}
          onPassTest={mutate}
          questions={data.questions as QuestionDto[]}
        />
      )}
    </DialogAdapter>
  );
};
