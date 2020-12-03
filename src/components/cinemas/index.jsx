import _Select from './_select';
import {_getCor, _getTexto} from './_utils';
import {Tag} from 'antd';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
//import './_classificacao.css';

//componente classificação (idade, texto, cor)
function Cinemas(props) {
  const {idade} = props;
  const texto = useMemo(() => _getTexto(idade), [idade]);
  const cor = useMemo(() => _getCor(idade), [idade]);
  return <Tag className="" color={cor}>{texto}</Tag>;
}

//
Cinemas.propTypes = {
  idade: PropTypes.number,
};

//radio buttons
Cinemas.Select = _Select;

export default Cinemas;
