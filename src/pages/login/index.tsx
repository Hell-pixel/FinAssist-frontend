import React, { useState } from 'react';
import { Form, Input, Button, Typography, Divider, Space, Card, Flex, theme, message } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/contexts/authContext';
import ChangeThemeButton from '@/components/base/changeThemeButton';
import { accountService } from '@/services/accountService';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const [tab, setTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();
  const { token } = theme.useToken();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      await login(values.email, values.password);

      navigate(from, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values: { name: string; email: string; password: string }) => {
    try {
      setLoading(true);
      await accountService.register(values.name, values.email, values.password);
      setTab('login');
      message.success('Регистрация прошла успешно. Теперь вы можете войти в систему.');
    } finally {
      setLoading(false);
    }
  };

  const cardTitle = () => {
    return (
      <>
        <div style={{ textAlign: 'right' }}>
          <ChangeThemeButton />
        </div>
        <Title level={3} style={{ textAlign: 'center' }}>
          FinAssist
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 24 }}>
          Управляйте финансами эффективно
        </Text>
      </>
    );
  };

  const tabList = [
    {
      key: 'login',
      tab: 'Вход',
    },
    {
      key: 'register',
      tab: 'Регистрация',
    },
  ];

  const contentList: Record<string, React.ReactNode> = {
    login: (
      <Form layout="vertical" onFinish={handleLogin} size="large">
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите email',
            },
            {
              type: 'email',
              message: 'Пожалуйста, введите корректный email',
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email пользователя" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Введите пароль',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    ),
    register: (
      <Form layout="vertical" onFinish={handleRegister} size="large" >
        <Form.Item name="name" rules={[{ required: true, message: 'Введите имя пользователя' }]}>
          <Input prefix={<UserOutlined />} placeholder="Имя пользователя" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите email',
            },
            {
              type: 'email',
              message: 'Пожалуйста, введите корректный email',
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Введите пароль',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    ),
  };

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        minHeight: '100vh',
        backgroundColor: token.colorBgContainer,
      }}
    >
      <Card
        variant="outlined"
        title={cardTitle()}
        tabList={tabList}
        onTabChange={(key) => setTab(key)}
        defaultActiveTabKey={tab}
        activeTabKey={tab}
        style={{ minWidth: 300, maxWidth: 400, width: '100%', margin: 10 }}
      >
        {contentList[tab]}
        <Divider>или войти через</Divider>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Button icon={<GoogleOutlined />} block size="large" disabled>
            Google
          </Button>
          <Button icon={<GoogleOutlined />} block size="large" disabled>
            Яндекс
          </Button>
        </Space>
      </Card>
    </Flex>
  );
};

export default LoginPage;
