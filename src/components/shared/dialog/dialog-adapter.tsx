import { ReactNode } from 'react';
import { Dialog } from '@radix-ui/react-dialog';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';

export interface IDialogAdapterProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: boolean;
  children: ReactNode;
  footer?: ReactNode;
}

export const DialogAdapter = (props: IDialogAdapterProps) => {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent>
        {(props.title || props.description) && (
          <DialogHeader>
            {props.title && <DialogTitle>{props.title}</DialogTitle>}
            {props.description && (
              <DialogDescription>{props.description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {props.children}
        {props.footer && <DialogFooter>{props.footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
