import React from 'react';
import { Button } from 'antd';
import { useAppContext } from '@/contexts/appContext';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';

const ChangeThemeButton: React.FC = () => {
  const { isDark, setIsDark } = useAppContext();

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <Button
      type="text"
      icon={isDark ? <SunOutlined style={{ color: '#fadb14' }} /> : <MoonOutlined />}
      onClick={toggleTheme}
      shape="circle"
      size="large"
    />
  );
};

export default ChangeThemeButton;
