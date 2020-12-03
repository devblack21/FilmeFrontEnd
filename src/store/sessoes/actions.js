import {REQUEST, SUCCESS, FAILURE, createRequestType, action} from '../actions';

export const LISTAR = createRequestType('SESSOES_LISTAR');
export const SELECT_CINEMA = createRequestType('SELECT_CINEMA');

export const listar = {
  request: () => action(LISTAR[REQUEST]),
  success: (lista) => action(LISTAR[SUCCESS], lista),
  failure: (erro) => action(LISTAR[FAILURE], {erro}),
};

export const select = (selected) => action(SELECT_CINEMA,selected);

export const fechar = () => action(FECHAR);

export const limparErro = () => action(LIMPAR_ERRO);