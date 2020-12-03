import moment from 'moment';
import {FAILURE, REQUEST, SUCCESS} from '../actions';
import * as Actions from './actions';

const INITIAL_STATE = {
    cinema: null,
};

export default function(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  //verifica qual ações foi solicitada
  //atualiza os estados
  switch (type) {

    case Actions.SELECT_CINEMA: {
       const newState = {...state};
       newState.cinema = payload;
      return newState;
    }

    case Actions.FECHAR: {
          const newState = {...state};
           newState.cinema = null;
       return newState;
    }

    case Actions.LIMPAR_ERRO: {
          const newState = {...state};
           newState.cinema = null;
          return newState;
       }

	default:
	  return state;
  }
}
