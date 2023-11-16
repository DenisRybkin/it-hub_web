import { ReactNode } from 'react';
import { Button } from '@components/ui/button';
import { FiImage } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

interface ICoverImageProps {
  bottomPanel?: ReactNode;
  url?: string;
}

export const CoverImage = (props: ICoverImageProps) => {
  const { t } = useTranslation();

  const BottomPanel = () => (
    <div className="flex items-center gap-x-2">
      <Button variant="ghost" data={{ leftIcon: <FiImage /> }}>
        {t('ui:button.change_cover')}
      </Button>
    </div>
  );

  return (
    <div className="w-screen md:w-[calc(100vw-104px)] lg:w-[calc(100vw-231px)] relative bg-gray -translate-x-2/4 ml-[50%] -mt-8 [&>div]:hover:block">
      <img
        className="w-full object-cover max-h-56"
        src="https://storage.yandexcloud.net/it-hub/uploads/e4ca936b-5c4c-4e2d-9583-907f6730b5fc.webp"
        alt=""
      />
      {
        <div className="hidden absolute bottom-5 right-5">
          <BottomPanel />
        </div>
      }
    </div>
  );
};
