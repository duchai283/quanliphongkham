import React, { useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, NotificationOutlined } from '@ant-design/icons';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { getCurrentUser } from '../../utils/localStorage';
import Router from '../../routes';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Home = () => {
  const history = useHistory();
  let { path, url } = useRouteMatch();

  useEffect(() => {
    const user = getCurrentUser();

    console.log('user', user);
    if (!user) {
      history.push('/');
    }
  }, [history]);

  const handleLogOut = () => {
    localStorage.removeItem('user');
    history.push('/');
  };

  const handleAbout = () => {
    history.push('/home/about');
  };
  return (
    <Layout>
      <Header className="header"></Header>
      <Layout>
        <Sider
          width={200}
          className="site-layout-background"
          style={{ height: '100vh' }}
        >
          <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
            <SubMenu
              key="sub1"
              icon={<NotificationOutlined />}
              title="CHỨC NĂNG"
            >
              <Menu.Item key="1">
                <Link to={`${path}/lichhen`}>Lịch Hẹn</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={`${path}/benhnhan`}>Bệnh nhân</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={`${path}/bacsi`}>Bác Sĩ</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="sub2" icon={<UserOutlined />} title="USER">
              <Menu.Item key="4" onClick={handleAbout}>
                About
              </Menu.Item>
              <Menu.Item key="5" onClick={handleLogOut}>
                Logout
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <Router></Router>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
