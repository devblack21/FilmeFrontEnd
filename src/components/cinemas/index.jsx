import _Select from './_select';
import {_getCor, _getTexto} from './_utils';
import {Tag} from 'antd';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
//import './_classificacao.css';

//componente classificação (idade, texto, cor)
function Cinemas(props) {
  const {value} = props;
return <Tag className="Cinemas"></Tag>;
}

//
Cinemas.propTypes = {
  value: PropTypes.number,
};

//radio buttons
Cinemas.Select = _Select;

export default Cinemas;
