import { IProviderProps } from '@app/providers/i-provider-props';
import { MetaContext } from '@app/providers/meta/meta-context';
import { RoutePaths } from '@app/router';
import { RouteKeys } from '@lib/constants';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const routsWithDefaultTitle = [
  RoutePaths[RouteKeys.HOME],
  RoutePaths[RouteKeys.LATEST],
  RoutePaths[RouteKeys.SUBSCRIPTIONS],
  RoutePaths[RouteKeys.WRITE],
  RoutePaths[RouteKeys.VACANCY],
];

export const MetaProvider = (props: IProviderProps) => {
  const { pathname } = useLocation();
  const [title, setTitle] = useState<string>(import.meta.env.VITE_APP_TITLE);

  useEffect(() => {
    if (routsWithDefaultTitle.includes(pathname))
      setTitle(import.meta.env.VITE_APP_TITLE);
  }, [pathname]);

  return (
    <MetaContext.Provider value={{ title, setTitle }}>
      <Helmet>
        <title>{title ?? import.meta.env.VITE_APP_TITLE}</title>
      </Helmet>
      {props.children}
    </MetaContext.Provider>
  );
};
