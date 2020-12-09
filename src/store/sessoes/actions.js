import {REQUEST, SUCCESS, FAILURE, createRequestType, action} from '../actions';

export const LISTAR = createRequestType('SESSOES_LISTAR');
export const LISTAR_CINEMAS = createRequestType('CINEMAS_LISTAR');
export const LISTAR_CINEMA = createRequestType('LISTAR_CINEMA');
export const RETORNAR_CINEMA = createRequestType('RETORNAR_CINEMA');
export const RETORNAR_FILME = createRequestType('RETORNAR_FILME');
export const SALVAR = createRequestType('SESSOES_SALVAR');
export const EXCLUIR = createRequestType('SESSOES_EXCLUIR');
export const ABRIR = 'SESSOES_ABRIR';
export const ABRIR_CINEMA = 'SESSOES_ABRIR_CINEMA';
export const CINEMA_DIGITADO = 'CINEMA_DIGITADO';
export const FILME_DIGITADO = 'FILME_DIGITADO';
export const FECHAR = 'SESSOES_FECHAR';
export const LIMPAR_ERRO = 'SESSOES_LIMPAR_ERRO';


export const listarPorCinema = {
  request: () => action(LISTAR_CINEMA[REQUEST]),
  success: (lista) => action(LISTAR_CINEMA[SUCCESS], lista),
  failure: (erro) => action(LISTAR_CINEMA[FAILURE], {erro}),
};

export const listar = {
  request: () => action(LISTAR[REQUEST]),
  success: (lista) => action(LISTAR[SUCCESS], lista),
  failure: (erro) => action(LISTAR[FAILURE], {erro}),
};

export const retornarCinema = {
  request: () => action(RETORNAR_CINEMA[REQUEST]),
  success: (lista) => action(RETORNAR_CINEMA[SUCCESS], lista),
  failure: (erro) => action(RETORNAR_CINEMA[FAILURE], {erro}),
};

export const retornarFilme = {
  request: () => action(RETORNAR_FILME[REQUEST]),
  success: (lista) => action(RETORNAR_FILME[SUCCESS], lista),
  failure: (erro) => action(RETORNAR_FILME[FAILURE], {erro}),
};

export const listarCinemas = {
  
  request: () => action(LISTAR_CINEMAS[REQUEST]),
  success: (listaCinemas) => action(LISTAR_CINEMAS[SUCCESS], listaCinemas),
  failure: (erro) => action(LISTAR_CINEMAS[FAILURE], {erro}),
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

export const abrir = (sessao) => action(ABRIR, sessao);
export const abrirCinema = (cinema) => action(ABRIR_CINEMA, cinema);
export const cinemaDigitado = (cinema) => action(CINEMA_DIGITADO, cinema);
export const filmeDigitado = (filme) => action(FILME_DIGITADO, filme);

export const fechar = () => action(FECHAR);

export const limparErro = () => action(LIMPAR_ERRO);
