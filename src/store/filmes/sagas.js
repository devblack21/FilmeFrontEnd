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
    let {idFilme, ...values} = payload;
    if (idFilme)
      yield call(axios.put, `/filmes/${idFilme}`, values);
    else {
      const res = yield call(axios.post, '/filmes', values);
      idFilme = res.data.idFilme;
    }
    const {data} = yield call(axios.get, `/filmes/${idFilme}`);
    yield put(Actions.salvar.success(data));
  } catch (e) {
    yield put(Actions.salvar.failure(e));
  }
}

function* excluir({payload: {idFilme}}) {
  try {
    yield call(axios.delete, `/filmes/${idFilme}`);
    yield put(Actions.excluir.success(idFilme));
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
