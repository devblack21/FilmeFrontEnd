import {Select,Option,Form} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import React, {useCallback, useEffect, useMemo} from 'react';
import * as Actions from '../../store/sessoes/actions';


//retornamos a lista de cinemas
function _Select(props) {

  const {value} = props;
  const { Option } = Select;

  const dispatch = useDispatch();
  const model = useSelector(state => state.sessoes);
  const {erro, cinemaAberto} = model;
  const lista = [...model.listaCinemas, {}];

  useEffect(() => {
    dispatch(Actions.listarCinemas.request());
  }, [dispatch]);

  const abrirCinema = useCallback(selected => dispatch(Actions.abrirCinema(selected)), [dispatch]);
  const handleProvinceChange = value => {
      abrirCinema(value);
  };

  return (
                <Select
                   placeholder="Selecione um Cinema"
                   style={{ width: '20%' }}
                   value={cinemaAberto}
                   onChange={handleProvinceChange}
                   >
                     {lista.map(item => (
                       
                        <Option key={item.idCinema}  value={item.nome}>{item.nome}</Option>
                       
                    )) .filter((item) => item.key !== null)}
                 </Select>
    );
}

export default _Select;
