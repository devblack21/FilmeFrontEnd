import moment from 'moment';
import {FAILURE, REQUEST, SUCCESS} from '../actions';
import * as Actions from './actions';

const INITIAL_STATE = {
  erro: null,
  carregando: false,
  lista: [],
  itemAbertoCinema: null,
};

//reducer de filmes
export default function(state = INITIAL_STATE, action) {
  const {type, payload} = action;

  //verifica qual ações foi solicitada
  //atualiza os estados
  switch (type) {

    case Actions.LISTAR[REQUEST]: {
      const newState = {...state};
      newState.erro = null;
      newState.carregando = true;
      return newState;
    }
    case Actions.LISTAR[SUCCESS]: {
      const newState = {...state};
      newState.carregando = false;
      newState.lista = payload;
      return newState;
    }
    case Actions.LISTAR[FAILURE]: {
      const newState = {...state};
      newState.erro = payload.erro;
      newState.carregando = false;
      return newState;
    }

    case Actions.SALVAR_CINEMA[REQUEST]: {
      const newState = {...state};
      newState.erro = null;
      return newState;
    }
    case Actions.SALVAR_CINEMA[SUCCESS]: {
      const newItem = {...payload};

      const newState = {...state};
      newState.lista = [...newState.lista];
      const index = newState.lista.findIndex(({idCinema}) => idCinema === newItem.idCinema);
      if (index >= 0)
        newState.lista[index] = newItem;
      else
        newState.lista.push(newItem);
        newState.itemAbertoCinema = null;
      return newState;
    }
    case Actions.SALVAR_CINEMA[FAILURE]: {
      const newState = {...state};
      newState.erro = payload.erro;
      return newState;
    }

    case Actions.EXCLUIR[REQUEST]: {
      const newState = {...state};
      newState.erro = null;
      return newState;
    }
    case Actions.EXCLUIR[SUCCESS]: {
      const newState = {...state};
      newState.lista = [...newState.lista];
      const index = newState.lista.findIndex(({idCinema}) => idCinema === payload.idCinema);
      if (index >= 0)
        newState.lista.splice(index, 1);
      newState.itemAbertoCinema = null;
      return newState;
    }
    case Actions.EXCLUIR[FAILURE]: {
      const newState = {...state};
      newState.erro = payload.erro;
      return newState;
    }

    case Actions.ABRIR: {
      const newState = {...state};
      newState.itemAbertoCinema = payload;
      return newState;
    }

    case Actions.FECHAR: {
      const newState = {...state};
      newState.itemAbertoCinema = null;
      return newState;
    }

    case Actions.LIMPAR_ERRO: {
      const newState = {...state};
      newState.erro = null;
      return newState;
    }

	default:
	  return state;
  }
}
