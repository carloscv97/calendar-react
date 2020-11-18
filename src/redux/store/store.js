import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../ducks/authDucks';
import { calendarReducer } from '../ducks/calendarDucks';
import { uiReducer } from '../ducks/uiDucks';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
   ui: uiReducer,
   calendar: calendarReducer,
   auth: authReducer
});


export const store = createStore(
   reducers,
   composeEnhancers(
      applyMiddleware(thunk)
   )
)