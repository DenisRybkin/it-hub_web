import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@components/ui/alert-dialog';
import { cn } from '@lib/utils/tools';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface IConfirmDialogProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  onConfirm?: () => void;
  confirmIsLoading?: boolean;
}

export const ConfirmDialog = (props: IConfirmDialogProps) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => void setIsOpen(false) || props.onConfirm?.();

  return (
    <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialogTrigger asChild={!!props.trigger} onClick={handleOpen}>
        {props.trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          {props.description && (
            <AlertDialogDescription>{props.description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>
            {t('ui:button.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            data={{ isLoading: props.confirmIsLoading }}
            onClick={handleConfirm}
          >
            {t('ui:button.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
