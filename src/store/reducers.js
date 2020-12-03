import {combineReducers} from 'redux';
import filmes from './filmes/reducer';
import sessoes from './sessoes/reducer';

//englobamos os reducers
export default combineReducers({
  filmes, sessoes,
});
