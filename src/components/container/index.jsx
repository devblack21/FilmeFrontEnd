import {Breadcrumb, Layout} from 'antd';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
import './_container.css';

const {Content} = Layout;

function Container(props) {
  const {breadcrumb, children} = props;

  const breadcrumbNode = useMemo(() => {
    if (breadcrumb && breadcrumb.length) {
      const items = breadcrumb.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>);
      return <Breadcrumb className="Container--Breadcrumb" children={items} />;
    }
    return null;
  }, [breadcrumb]);

  return (
      <Content className="Container">
        {breadcrumbNode}
        <div className="Container--Content">{children}</div>
      </Content>
  );
}

Container.propTypes = {
breadcrumb: PropTypes.arrayOf(PropTypes.string),
children: PropTypes.node,
};

export default Container;
