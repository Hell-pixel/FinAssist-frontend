import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/layout/route/protectedRoute';
import LoginRoute from '@/components/layout/route/loginRoute';

// PAGE
import Login from '@/pages/login';
import Home from '@/pages/home';
import NotFound from '@/pages/notFound';

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/login"
        element={
          <LoginRoute>
            <Login />
          </LoginRoute>
        }
      />

      {/* Защищенные маршруты */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Страница 404 */}
      <Route path="*" element={<NotFound />} />
    </>
  )
);
