import _Radio from './_radio';
import {_getCor, _getTexto} from './_utils';
import {Tag} from 'antd';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
import './_classificacao.css';

//componente classificação (idade, texto, cor)
function Classificacao(props) {
  const {idade} = props;
  const texto = useMemo(() => _getTexto(idade), [idade]);
  const cor = useMemo(() => _getCor(idade), [idade]);
  return <Tag className="Classificacao" color={cor}>{texto}</Tag>;
}

//
Classificacao.propTypes = {
  idade: PropTypes.number,
};

//radio buttons
Classificacao.Radio = _Radio;

export default Classificacao;
