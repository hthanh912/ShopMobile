import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import productReducer from './reducers/productReducer';

const reducers = combineReducers({userReducer, productReducer});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;