import axios from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';
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
    let {id, ...values} = payload;
    if (id)
      yield call(axios.put, `/sessoes/${id}`, values);
    else {
      alert('salvando');
      const res = yield call(axios.post, '/sessoes', values);
      id = res.data.id;
    }
    const {data} = yield call(axios.get, `/sessoes/${id}`);
    yield put(Actions.salvar.success(data));
  } catch (e) {
    yield put(Actions.salvar.failure(e));
  }
}

function* excluir({payload: {id}}) {
  try {
    yield call(axios.delete, `/sessoes/${id}`);
    yield put(Actions.excluir.success(id));
  } catch (e) {
    yield put(Actions.excluir.failure(e));
  }
}

function* limparErro() {
  yield put(Actions.limparErro());
}

export default function* () {
  yield all([
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
