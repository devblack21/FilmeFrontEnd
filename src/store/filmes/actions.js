import {REQUEST, SUCCESS, FAILURE, createRequestType, action} from '../actions';

//todas as actions de filmes

export const LISTAR = createRequestType('FILMES_LISTAR');
export const SALVAR = createRequestType('FILMES_SALVAR');
export const EXCLUIR = createRequestType('FILMES_EXCLUIR');
export const ABRIR = 'FILMES_ABRIR';
export const FECHAR = 'FILMES_FECHAR';
export const LIMPAR_ERRO = 'FILMES_LIMPAR_ERRO';

export const listar = {
  request: () => action(LISTAR[REQUEST]),
  success: (lista) => action(LISTAR[SUCCESS], lista),
  failure: (erro) => action(LISTAR[FAILURE], {erro}),
};

export const salvar = {
  request: (filme) => action(SALVAR[REQUEST], filme),
  success: (filme) => action(SALVAR[SUCCESS], filme),
  failure: (erro) => action(SALVAR[FAILURE], {erro}),
};

export const excluir = {
  request: (id) => action(EXCLUIR[REQUEST], {id}),
  success: (id) => action(EXCLUIR[SUCCESS], {id}),
  failure: (erro) => action(EXCLUIR[FAILURE], {erro}),
};

export const abrir = (filme) => action(ABRIR, filme);

export const fechar = () => action(FECHAR);

export const limparErro = () => action(LIMPAR_ERRO);
