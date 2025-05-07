import { ConfigProvider, theme } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { AppProvider } from '@/contexts/appContext';
import { useAppContext } from '@/contexts/appContext';
import { AuthProvider } from './contexts/authContext';
import ruRU from 'antd/locale/ru_RU';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <Main />
      </AppProvider>
    </AuthProvider>
  );
};

const Main = () => {
  const { isDark } = useAppContext();
  const { defaultAlgorithm, darkAlgorithm } = theme;

  dayjs.locale('ru');

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
      }}
      locale={ruRU}
    >
      <RouterProvider router={routes} />
    </ConfigProvider>
  );
};

export default App;
