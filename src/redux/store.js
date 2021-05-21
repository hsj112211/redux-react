import { combineReducers, createStore, applyMiddleware } from "redux"
import menuReducer from './reducer/menu';
import userReducer from './reducer/user';
import ReduxThunk from 'redux-thunk';


const reducers = combineReducers({
    menu: menuReducer,
    user:userReducer
})

const store = createStore(reducers,applyMiddleware(ReduxThunk) );

export default store;