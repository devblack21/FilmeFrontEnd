import axios from 'axios';
import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {FAILURE, REQUEST} from '../actions';
import * as Actions from './actions';

//consumindo a api

function* listarCinemas() {

  try {
    const res = yield call(axios.get, '/cinemas');

    yield put(Actions.listarCinemas.success(res.data));
  } catch (e) {
    yield put(Actions.listarCinemas.failure(e));
  }
}

function* listarPorCinema() {
  try {
    const estado = yield select(state => state.sessoes);
    //if(cinemaAberto){
      if(estado.cinemaAberto){
        const res = yield call(axios.get, `/sessoes/list/${estado.cinemaAberto}`);
        yield put(Actions.listar.success(res.data));
      }
      
   // }
  } catch (e) {
    yield put(Actions.listar.failure(e));
  }
}

function* listar() {
    try {
  
     
        const res = yield call(axios.get, '/sessoes');
        yield put(Actions.listar.success(res.data));
      
    } catch (e) {
      yield put(Actions.listar.failure(e));
    }
  }

function* salvar({payload}) {
  try {
    
    let {idSessao, ...values} = payload;
    //payload.cinema = yield call(axios.get, `/cinemas/${payload.cinema}`);
    //payload.filme = yield call(axios.get, `/filmes/${payload.filme}`);
   // alert(payload.cinema.nome);

    if (idSessao){
     
      yield call(axios.put, `/sessoes/${idSessao}`, values);
    }
    else {
      
      const res = yield call(axios.post, '/sessoes', values);
      idSessao = res.data.idSessao;
    }
    const {data} = yield call(axios.get, `/sessoes/${idSessao}`);
    yield put(Actions.salvar.success(data));
  } catch (e) {
    yield put(Actions.salvar.failure(e));
  }
}

function* excluir({payload: {idSessao}}) {
  try {
    yield call(axios.delete, `/sessoes/${idSessao}`);
    yield put(Actions.excluir.success(idSessao));
  } catch (e) {
    yield put(Actions.excluir.failure(e));
  }
}

function* limparErro() {
  yield put(Actions.limparErro());
}

export default function* () {
  yield all([
    takeLatest(Actions.LISTAR_CINEMA[REQUEST], listarPorCinema),
    takeLatest(Actions.LISTAR_CINEMAS[REQUEST], listarCinemas),
    takeLatest(Actions.LISTAR[REQUEST], listar),
    takeLatest(Actions.SALVAR[REQUEST], salvar),
    takeLatest(Actions.EXCLUIR[REQUEST], excluir),
    takeLatest(Actions.LISTAR_CINEMAS[FAILURE], limparErro),
    takeLatest(Actions.LISTAR[FAILURE], limparErro),
    takeLatest(Actions.SALVAR[FAILURE], limparErro),
    takeLatest(Actions.EXCLUIR[FAILURE], limparErro),
  ]);
}
