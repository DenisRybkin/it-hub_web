export { DialogAdapter } from './dialog-adapter';
export type { IDialogAdapterProps } from './dialog-adapter';

export interface IBaseDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
