import { IProviderProps } from '@app/providers/i-provider-props';
import { Preloader } from '@app/providers/preloader/preloader';
import { PreloaderContext } from '@app/providers/preloader/preloader-context';
import React, { useState } from 'react';

export const PreloaderProvider = (props: IProviderProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  return (
    <PreloaderContext.Provider value={{ isVisible, setVisible: setIsVisible }}>
      <>
        {isVisible && <Preloader />}
        {props.children}
      </>
    </PreloaderContext.Provider>
  );
};
