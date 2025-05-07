import { FileExcelOutlined, DashboardOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

export const menuItems: MenuItem[] = [
  {
    key: 'home',
    name: 'Главная',
    icon: <DashboardOutlined />,
    path: '/',
  },
  {
    key: 'transactions',
    name: 'Транзакции',
    icon: <DashboardOutlined />,
    path: '/transactions',
  },
  {
    key: 'reports',
    name: 'Отчеты',
    icon: <FileExcelOutlined />,
    path: '/reports',
  },
];

export interface MenuItem {
  key: string;
  name: string;
  icon: ReactNode;
  path: string;
  children?: MenuItem[]; // для возможных подэлементов
}
