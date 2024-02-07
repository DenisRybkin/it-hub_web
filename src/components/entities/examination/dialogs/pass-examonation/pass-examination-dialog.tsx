import { QuestionDto } from '@components/entities/test/common/types';
import { TestRunner } from '@components/entities/test/misc/test-runner';
import { DialogAdapter, IBaseDialogProps } from '@components/shared/dialog';
import { CircularLoader } from '@components/ui/loader';
import { toast } from '@components/ui/use-toast';
import { api } from '@lib/api/plugins';
import { QueryKeys } from '@lib/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

const EXAMINATION_ID = 1;

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
    queryKey: [api.examination.toString(), 1],
    enabled: props.isOpen,
    queryFn: async () =>
      await api.examination.getById(EXAMINATION_ID, undefined, handleError),
  });

  const { mutate } = useMutation({
    mutationKey: [QueryKeys.GET_ME],
    mutationFn: () =>
      api.examination.passExamination(
        EXAMINATION_ID,
        handleSuccess,
        handleError
      ),
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
