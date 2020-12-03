import {Layout, Menu} from 'antd';
import React, {useCallback} from 'react';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import routes from '../routes';
import './index.css';

const {Header, Footer} = Layout;

export default function BasicLayout(props) {
  const history = useHistory();
  const location = useLocation();
  const {pathname} = location;

  const handleSelect = useCallback(({key}) => {
    history.push(`${key}`);
  }, [history]);

  return (
      <Layout className="Layout">
        <Header>
          <div className="Layout--Logo" />
          <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]} onSelect={handleSelect}>
            {routes.map(route => (
                <Menu.Item key={route.path}>{route.title}</Menu.Item>
            ))}
          </Menu>
        </Header>
        <Switch>
          {routes.map((route, i) => (
              <Route key={i} {...route} />
          ))}
        </Switch>
        <Footer style={{textAlign: 'center'}}>Capela Software ©2020</Footer>
      </Layout>
  );
}
