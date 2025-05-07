import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Извините, страница, которую вы посетили, не существует."
      extra={
        <Button type="default" size="large" onClick={() => navigate('/')}>
          Вернуться на главную
        </Button>
      }
    />
  );
};

export default NotFound;
