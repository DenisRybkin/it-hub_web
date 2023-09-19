import { IProviderProps } from '@app/providers/i-provider-props';
import { StoreContext } from '@app/providers/store/store-context';
import { rootStore } from '@lib/store/root-store';

export const StoreProvider = (props: IProviderProps) => {
  return (
    <StoreContext.Provider value={rootStore}>
      {props.children}
    </StoreContext.Provider>
  );
};
