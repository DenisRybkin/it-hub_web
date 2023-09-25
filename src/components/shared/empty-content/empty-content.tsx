import React from 'react';
import { useTranslation } from 'react-i18next';

interface IEmptyContent {
  text?: string;
}

export const EmptyContent = (props: IEmptyContent) => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <img src="/empty-content.png" alt="Not found image" />
      <h3 className="md:text-body-medium text-gray-1">
        {props.text ?? t('ui:subheader.empty_content')}
      </h3>
    </div>
  );
};
