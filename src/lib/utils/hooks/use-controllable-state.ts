import { Dispatch, SetStateAction, useState } from 'react';

interface IUseControllableState<T> {
  defaultValue: T;
  value?: T;
  onChange?: Dispatch<SetStateAction<T>>;
}

export const useControllableState = <T>(
  params: IUseControllableState<T>
): [T, Dispatch<SetStateAction<T>>] => {
  const isValueControlled = params.value !== undefined;
  const [state, setState] = useState<T>(params.defaultValue);

  const currentState = isValueControlled ? (params.value as T) : state;

  const setStateValue = (newStateValue: SetStateAction<T>) => {
    if (!isValueControlled) setState(newStateValue);
    params.onChange?.(newStateValue);
  };

  return [currentState, setStateValue];
};
