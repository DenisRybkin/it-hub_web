import SmsileWink from '@assets/images/smiles/mind.png';
import SmileWink from '@assets/images/smiles/wink.png';
import { useTranslation } from 'react-i18next';

export const SuccessState = () => {
  const { t } = useTranslation();

  return (
    <div className="p-3 md:p-7 bg-dark-2 rounded-xl">
      <div className="w-full flex flex-col items-center gap-2">
        <img src={SmileWink} className="w-8 h-8" alt="smile" />
        <h1 className="text-body-medium">{t('text:you_passed_test')}</h1>
      </div>
    </div>
  );
};
