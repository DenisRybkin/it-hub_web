import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@components/ui/alert-dialog';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export interface IConfirmDialogProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  onConfirm?: () => void;
}

export const ConfirmDialog = (props: IConfirmDialogProps) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialogTrigger onClick={handleOpen}>
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
          <AlertDialogAction onClick={props.onConfirm}>
            {t('ui:button.confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
