import { Route, Routes } from 'react-router-dom';
import { RootLayout } from '@components/layouts';
import { routerConfig } from '@app/router/config';
import { ProtectedRoute } from '@app/router/protected-route';

export const Router = () => {
  return (
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
