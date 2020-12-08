import {all, fork,spawn,call} from 'redux-saga/effects';
import filmes from './filmes/sagas';
import cinemas from './cinemas/sagas';
import sessoes from './cinemas/sagas';

export default function* rootSaga() {
  return yield all([
    yield fork(filmes),
    yield call(cinemas),
    yield call(sessoes),
  ]);
  //yield fork(filmes);
  //yield fork(sessoes);
  
}
