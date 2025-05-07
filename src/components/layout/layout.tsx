import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Layout,
  Menu,
  Divider,
  Drawer,
  Button,
  FloatButton,
  Skeleton,
} from 'antd';
import { useAppContext } from '@/contexts/appContext';
import { useAuthContext } from '@/contexts/authContext';
import { useMediaQuery } from 'react-responsive';
import { MenuItem, menuItems } from './menuItems';
import ChangeThemeButton from '@/components/base/changeThemeButton';
import {
  UserOutlined,
  ArrowUpOutlined,
  DownOutlined,
  LogoutOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Typography } from 'antd/lib';

const { Sider, Content, Header } = Layout;

const AppLayout: React.FC = () => {
  const { isDark } = useAppContext();
  const { user, logout } = useAuthContext();
  const [collapsed, setCollapsed] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 992 });

  const handleScroll = () => {
    setShowScroll(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true, state: { from: location } });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderMenuItems = (items: MenuItem[]) =>
    items
      .map((item) =>
        item.children ? (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.name}>
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        ) : (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            onClick={() => setDrawerVisible(false)}
          >
            <NavLink to={item.path}>{item.name}</NavLink>
          </Menu.Item>
        )
      );

  const renderMenu = () => (
    <Menu
      theme={isDark ? 'dark' : 'light'}
      selectedKeys={[location.pathname.replace(/^\//, '') || 'home']}
    >
      {renderMenuItems(menuItems)}
      <Divider style={{ margin: '0' }} />
      <Menu.ItemGroup
        key={'change-theme'}
        style={{ textAlign: 'center' }}
        title={collapsed && !isMobile ? '' : 'Сменить тему'}
      >
        <ChangeThemeButton />
      </Menu.ItemGroup>
    </Menu>
  );

  const renderLogo = () => (
    <div style={{ height: 32, margin: 16 }}>
      <Typography.Title
        level={4}
        style={{
          textAlign: 'center',
        }}
      >
        FinAssist
      </Typography.Title>
    </div>
  );

  return (
    <Layout>
      {!isMobile && (
        <Sider
          theme={isDark ? 'dark' : 'light'}
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        >
          {renderLogo()}
          {renderMenu()}
        </Sider>
      )}

      <Layout>
        <Header style={{ padding: 0 }}>
          <Menu
            mode="horizontal"
            selectedKeys={[]}
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: 'auto',
              justifyContent: 'flex-end',
              userSelect: 'none',
            }}
          >
            {isMobile && (
              <Button
                style={{
                  left: 20,
                  position: 'absolute',
                }}
                size="large"
                icon={<MenuOutlined />}
                onClick={() => setDrawerVisible(true)}
              />
            )}
            <Menu.SubMenu
              title={
                <>
                  {user ? (
                    <>
                      <span>{user?.name}</span>
                      <DownOutlined style={{ marginLeft: 8 }} />
                    </>
                  ) : (
                    <>
                      <Skeleton.Input active style={{ marginTop: 18 }} />
                      <DownOutlined style={{ marginLeft: 8 }} />
                    </>
                  )}
                </>
              }
            >
              <Menu.Item key={'profile'} icon={<UserOutlined />}>
                <NavLink to={'/profile'}>{'Профиль'}</NavLink>
              </Menu.Item>
              <Menu.Item
                key={'logout'}
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Выход
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Header>

        <Content
          style={{ minHeight: '100vh' }}
        >
          <Outlet />

          {showScroll && (
            <FloatButton
              type="primary"
              shape="circle"
              icon={<ArrowUpOutlined />}
              onClick={scrollToTop}
            />
          )}
        </Content>
        </Layout>

      {isMobile && (
        <Drawer
          title={renderLogo()}
          placement="left"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
        >
          {renderMenu()}
        </Drawer>
      )}
    </Layout>
  );
};

export default AppLayout;