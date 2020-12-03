import {_cor, _idades, _texto} from './_utils';
import {Radio} from 'antd';
import React, {useMemo} from 'react';

function _Radio(props) {
  const {value} = props;

  const buttons = useMemo(() =>
      _idades.map(idade => {
        const style = {fontWeight: ''};
        if (idade === value) {

          const cor = _cor[idade];
          style['--antd-wave-shadow-color'] = cor;
          style.background = cor;
          style.backgroundColor = cor;
          style.borderColor = cor;
        }
        return (
          <Radio.Button key={idade} value={idade} style={style}>
            {_texto[idade]}
          </Radio.Button>);
      }),
    [value]);

  return (<Radio.Group buttonStyle='solid' {...props}>
    {buttons}
  </Radio.Group>);
}

export default _Radio;
