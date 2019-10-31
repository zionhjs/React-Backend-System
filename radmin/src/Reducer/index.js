import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import PerList from './PerReducer';

export default combineReducers({
    UserList: UserReducer,
    PerList: PerList
});
