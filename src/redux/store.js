import { combineReducers, createStore, applyMiddleware } from "redux"
// import { composeWithDevTools } from "redux-devtools-extension"
import menuReducer from './reducer/menu';
import socketReducer from './reducer/socket';
import ReduxThunk from 'redux-thunk';


const reducers = combineReducers({
    menu: menuReducer,
    socket: socketReducer
})

const store = createStore(reducers,applyMiddleware(ReduxThunk) );
// const store = createStore(reducers,composeWithDevTools());

export default store;