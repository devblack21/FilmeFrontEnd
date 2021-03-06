import { Alert } from 'antd';
import moment from 'moment';
import {FAILURE, REQUEST, SUCCESS} from '../actions';
import * as Actions from './actions';

const INITIAL_STATE = {
  erro: null,
  carregando: false,
  lista: [],
  listaCinemas: [],
  itemAberto: null,
  cinemaAberto: null,
  cinemaDigitado: null,
  filmeDigitado: null,
};

export default function(state = INITIAL_STATE, action) {
  const {type, payload} = action;
  //verifica qual ações foi solicitada
  //atualiza os estados
  switch (type) {

    case Actions.LISTAR_CINEMA[REQUEST]: {
     
      const newState = {...state};
      newState.erro = null;
      newState.carregando = true;
      return newState;
    }
    case Actions.LISTAR_CINEMA[SUCCESS]: {
      const newState = {...state};
      newState.carregando = false;
      newState.lista = payload;
      return newState;
    }
    case Actions.LISTAR_CINEMA[FAILURE]: {
      const newState = {...state};
      newState.erro = payload.erro;
      newState.carregando = false;
      return newState;
    }

    case Actions.LISTAR_CINEMAS[REQUEST]: {
     
      const newState = {...state};
      newState.erro = null;
      newState.carregando = true;
      return newState;
    }
    case Actions.LISTAR_CINEMAS[SUCCESS]: {
      const newState = {...state};
      newState.carregando = false;
      newState.listaCinemas = payload;
      return newState;
    }
    case Actions.LISTAR_CINEMAS[FAILURE]: {
      const newState = {...state};
      newState.erro = payload.erro;
      newState.carregando = false;
      return newState;
    }

    case Actions.RETORNAR_CINEMA[REQUEST]: {
     
      const newState = {...state};
      newState.erro = null;
      //newState.carregando = true;
      return newState;
    }
    case Actions.RETORNAR_CINEMA[SUCCESS]: {
      const newState = {...state};
      newState.carregando = false;
      newState.itemAberto.cinema = payload;
      return newState;
    }
    case Actions.RETORNAR_CINEMA[FAILURE]: {
      const newState = {...state};
      newState.erro = payload.erro;
      newState.carregando = false;
      return newState;
    }

    case Actions.RETORNAR_FILME[REQUEST]: {
     
      const newState = {...state};
      newState.erro = null;
      //newState.carregando = true;
      return newState;
    }
    case Actions.RETORNAR_FILME[SUCCESS]: {
      const newState = {...state};
      newState.carregando = false;
      newState.itemAberto.filme = payload;
      return newState;
    }
    case Actions.RETORNAR_FILME[FAILURE]: {
      const newState = {...state};
      newState.erro = payload.erro;
      newState.carregando = false;
      return newState;
    }

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
      newState.lista.map(item  => {
        item.nomeCinema = item.cinema.nome;
        item.nomeFilme = item.filme.nome;
      });
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
   
      const newState = {...state};
      
      newState.lista = [...newState.lista];
    
      const index = newState.lista.findIndex(({idSessao}) => idSessao === newItem.idSessao);
   
      if (index >= 0){
        if(newItem.cinemaid !== newState.lista[index].idRefresh){
          newState.lista.splice(index,1);
        }else{
          newState.lista[index] = newItem;
          newState.lista.map(item  => {
            item.nomeCinema = item.cinema.nome;
            item.nomeFilme = item.filme.nome;
            item.idRefresh = item.cinema.idCinema;
          });
        }
      }
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
      const index = newState.lista.findIndex(({idSessao}) => idSessao === payload.idSessao);
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
      newState.itemAberto.cinemaid = newState.itemAberto.cinema.idCinema;
      newState.itemAberto.filmeid = newState.itemAberto.filme.idFilme;
      return newState;
    }

    case Actions.ABRIR_CINEMA: {
      const newState = {...state};
      newState.cinemaAberto = payload;
      return newState;
    }

    case Actions.CINEMA_DIGITADO: {
      const newState = {...state};
      newState.cinemaDigitado = payload;
      
      return newState;
    }

    case Actions.FILME_DIGITADO: {
      const newState = {...state};
      newState.filmeDigitado = payload;
      
      return newState;
    }


    case Actions.FECHAR: {
      const newState = {...state};
      newState.itemAberto = null;
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
