import axios from 'axios';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import {FAILURE, REQUEST} from '../actions';
import * as Actions from './actions';

//consumindo a api

function* listar() {
  try {
    const res = yield call(axios.get, '/filmes');
    yield put(Actions.listar.success(res.data));
  } catch (e) {
    yield put(Actions.listar.failure(e));
  }
}

function* salvar({payload}) {
  try {
    let {id, ...values} = payload;
    if (id)
      yield call(axios.put, `/filmes/${id}`, values);
    else {
      const res = yield call(axios.post, '/filmes', values);
      id = res.data.id;
    }
    const {data} = yield call(axios.get, `/filmes/${id}`);
    yield put(Actions.salvar.success(data));
  } catch (e) {
    yield put(Actions.salvar.failure(e));
  }
}

function* excluir({payload: {id}}) {
  try {
    yield call(axios.delete, `/filmes/${id}`);
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
    takeLatest(Actions.LISTAR[REQUEST], listar),
    takeLatest(Actions.SALVAR[REQUEST], salvar),
    takeLatest(Actions.EXCLUIR[REQUEST], excluir),
    takeLatest(Actions.LISTAR[FAILURE], limparErro),
    takeLatest(Actions.SALVAR[FAILURE], limparErro),
    takeLatest(Actions.EXCLUIR[FAILURE], limparErro),
  ]);
}
