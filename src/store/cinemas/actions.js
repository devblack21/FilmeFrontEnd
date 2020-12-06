import {REQUEST, SUCCESS, FAILURE, createRequestType, action} from '../actions';

//todas as actions de filmes

export const LISTAR = createRequestType('CINEMAS_LISTAR');
export const SALVAR_CINEMA = createRequestType('CINEMAS_SALVAR');
export const EXCLUIR = createRequestType('CINEMAS_EXCLUIR');
export const ABRIR = 'CINEMAS_ABRIR';
export const FECHAR = 'CINEMAS_FECHAR';
export const LIMPAR_ERRO = 'CINEMAS_LIMPAR_ERRO';

export const listar = {
  request: () => action(LISTAR[REQUEST]),
  success: (lista) => action(LISTAR[SUCCESS], lista),
  failure: (erro) => action(LISTAR[FAILURE], {erro}),
};

export const salvar = {
  request: (filme) => action(SALVAR_CINEMA[REQUEST], filme),
  success: (filme) => action(SALVAR_CINEMA[SUCCESS], filme),
  failure: (erro) => action(SALVAR_CINEMA[FAILURE], {erro}),
};

export const excluir = {
  request: (id) => action(EXCLUIR[REQUEST], {id}),
  success: (id) => action(EXCLUIR[SUCCESS], {id}),
  failure: (erro) => action(EXCLUIR[FAILURE], {erro}),
};

export const abrir = (filme) => action(ABRIR, filme);

export const fechar = () => action(FECHAR);

export const limparErro = () => action(LIMPAR_ERRO);
