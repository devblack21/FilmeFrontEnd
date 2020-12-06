import {all, fork,spawn,call} from 'redux-saga/effects';
import filmes from './filmes/sagas';
import cinemas from './cinemas/sagas';
import sessoes from './cinemas/sagas';

export default function* () {

  yield fork(cinemas);
  yield fork(filmes);
  yield fork(sessoes);
  
}
