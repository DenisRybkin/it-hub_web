import { Button } from '@components/ui/button';
import { Progress } from '@components/ui/progress';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ISwitchableRenderProps {
  renders: ReactNode[];
  onFinish?: () => void;
}

export const SwitchableRender = (props: ISwitchableRenderProps) => {
  const { t } = useTranslation();
  const [renderIndex, setRenderIndex] = useState<number>(0);

  const handlePrevRender = () =>
    setRenderIndex(prev => (prev <= 0 ? prev : prev - 1));

  const handleNextRender = () =>
    renderIndex < props.renders.length - 1
      ? setRenderIndex(prev => prev + 1)
      : props.onFinish?.();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <Progress value={((renderIndex + 1) * 100) / props.renders.length} />
        <div className="w-20 text-right text-small-medium">
          {renderIndex + 1} {t('text:out_of')} {props.renders.length}
        </div>
      </div>
      <div className="my-6">{props.renders[renderIndex]}</div>
      <div className="w-full flex items-center space-x-3 justify-end">
        <Button
          disabled={renderIndex == 0}
          variant="outline"
          onClick={handlePrevRender}
        >
          {t('ui:button.prev')}
        </Button>
        <Button variant="primary" onClick={handleNextRender}>
          {renderIndex == props.renders.length - 1
            ? t('ui:button.finish')
            : t('ui:button.next')}
        </Button>
      </div>
    </div>
  );
};
