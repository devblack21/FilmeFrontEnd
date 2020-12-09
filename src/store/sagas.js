import {all, fork,spawn,call} from 'redux-saga/effects';
import filmes from './filmes/sagas';
import cinemas from './cinemas/sagas';
import sessoes from './sessoes/sagas';

export default function* rootSaga() {
  return yield all([

    yield fork(filmes),
    yield fork(sessoes),
    yield fork(cinemas),
   
  ]);
  //yield fork(filmes);
  //yield fork(sessoes);
  
}
