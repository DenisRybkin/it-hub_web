import { HealthContext } from '@app/providers/health';
import { routerConfig } from '@app/router/config';
import { ProtectedRoute } from '@app/router/protected-route';
import { RootLayout } from '@components/layouts';
import { TechnicalWorkPage } from '@components/pages/technical-work';
import { useContext, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

export const Router = () => {
  const location = useLocation();
  const health = useContext(HealthContext);

  const resetScroll = () => window.scrollTo(0, 0);

  useEffect(() => {
    resetScroll();
  }, [location.pathname]);

  return health.isTechnicalWork ? (
    <TechnicalWorkPage />
  ) : (
    <Routes>
      <Route element={<RootLayout />}>
        {routerConfig.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute
                isPrivate={route.isPrivate}
                requiredRole={route.requiredRole}
              >
                {route.element}
              </ProtectedRoute>
            }
          />
        ))}
      </Route>
    </Routes>
  );
};
