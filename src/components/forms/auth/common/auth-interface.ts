import { ReactNode } from 'react';

export interface IAuthFormProps<T> {
  onSubmit: (values: T) => void;
  isLoading?: boolean;
  extraFromContent?: ReactNode;
}

export interface ForwardRefAuthForm {
  submitTrigger: () => void;
}
