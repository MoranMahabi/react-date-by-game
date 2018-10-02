import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import matchesReducer from '../reducers/matches';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';
import paginationReducer from '../reducers/pagination'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      matches: matchesReducer,
      filters: filtersReducer,
      auth: authReducer,
      pagination: paginationReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
