import { combineReducers } from 'redux';
import UserReducer from './UserReducer';

export default combineReducers({
    UserList: UserReducer
});