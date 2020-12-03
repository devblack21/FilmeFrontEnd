import {_cor, _idades, _texto} from './_utils';
import {Select,Option} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect, useMemo} from 'react';
import * as Actions from '../../store/sessoes/actions';


//retornamos a lista de cinemas
function _Select(props) {

  const {value} = props;
  const { Option } = Select;
  const dispatch = useDispatch();
  const model = useSelector(state => state.sessoes);
  const cinema = model;
  const select = useCallback(selected => dispatch(Actions.select(selected)), [dispatch]);
  const handleProvinceChange = value => {
      select(value);
  };

  return (
                <Select
                   placeholder="Selecione um Cinema"
                   style={{ width: '20%' }}
                   value={value}
                   onChange={handleProvinceChange}
                   >
                   {_idades.map(item => (
                     <Select.Option key={item} value={item} >
                       {item}
                     </Select.Option>
                   ))}
                 </Select>

    );
}

export default _Select;
