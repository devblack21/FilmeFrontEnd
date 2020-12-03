import {all, fork} from 'redux-saga/effects';
import filmes from './filmes/sagas';
import sessoes from './sessoes/sagas';

export default function* () {
  yield all([
    fork(filmes),
  ]);
}
