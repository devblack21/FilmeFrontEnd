import moment from 'moment';
import {FAILURE, REQUEST, SUCCESS} from '../actions';
import * as Actions from './actions';

const INITIAL_STATE = {
  erro: null,
  carregando: false,
  lista: [],
  itemAberto: null,
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
      newState.lista = payload.map(item => ({
        ...item,
        lancamento: moment(item.lancamento),
      }));
      return newState;
    }
    case Actions.LISTAR[FAILURE]: {
      const newState = {...state};
      newState.erro = payload.erro;
      newState.carregando = false;
      return newState;
    }

    case Actions.SALVAR[REQUEST]: {
      const newState = {...state};
      newState.erro = null;
      return newState;
    }
    case Actions.SALVAR[SUCCESS]: {
      const newItem = {...payload};
      newItem.lancamento = moment(newItem.lancamento);

      const newState = {...state};
      newState.lista = [...newState.lista];
      const index = newState.lista.findIndex(({id}) => id === newItem.id);
      if (index >= 0)
        newState.lista[index] = newItem;
      else
        newState.lista.push(newItem);
        newState.itemAberto = null;
      return newState;
    }
    case Actions.SALVAR[FAILURE]: {
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
      const index = newState.lista.findIndex(({id}) => id === payload.id);
      if (index >= 0)
        newState.lista.splice(index, 1);
      newState.itemAberto = null;
      return newState;
    }
    case Actions.EXCLUIR[FAILURE]: {
      const newState = {...state};
      newState.erro = payload.erro;
      return newState;
    }

    case Actions.ABRIR: {
      const newState = {...state};
      newState.itemAberto = payload;
      return newState;
    }

    case Actions.FECHAR: {
      const newState = {...state};
      newState.itemAberto = null;
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
