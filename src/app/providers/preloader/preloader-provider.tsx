import React, { useState } from 'react';
import { IProviderProps } from '@app/providers/i-provider-props';
import { PreloaderContext } from '@app/providers/preloader/preloader-context';
import { Preloader } from '@app/providers/preloader/preloader';

export const PreloaderProvider = (props: IProviderProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <PreloaderContext.Provider value={{ isVisible, setVisible: setIsVisible }}>
      {isVisible ? <Preloader /> : props.children}
    </PreloaderContext.Provider>
  );
};
