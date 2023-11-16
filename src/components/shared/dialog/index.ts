export { DialogAdapter } from './dialog-adapter';
export type { IDialogAdapterProps } from './dialog-adapter';
export { ConfirmDialog } from './confirm-dialog';

export interface IBaseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
