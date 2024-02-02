import SmileMind from '@assets/images/smiles/mind.png';
import { Button } from '@components/ui/button';
import { useTranslation } from 'react-i18next';

interface IFailedStateProps {
  onRetry: () => void;
}

export const FailedState = (props: IFailedStateProps) => {
  const { t } = useTranslation();

  return (
    <div className="p-3 md:p-7 bg-dark-2 rounded-xl">
      <div className="w-full flex flex-col items-center gap-2">
        <img src={SmileMind} className="w-8 h-8" alt="smile" />
        <h1 className="text-body-medium">{t('text:you_not_passed_test')}</h1>
        <Button variant="primary" onClick={props.onRetry}>
          {t('ui:button.retry')}
        </Button>
      </div>
    </div>
  );
};
