import { applyMiddleware, createStore } from 'redux';
import rootReducer from './Reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    rootReducer,
    {},   //{} 里面包裹initial_state 这里就是空的state
    composeWithDevTools(applyMiddleware(thunk))   //redux-devtools-extension 浏览器中的开发者工具
);

export default store;