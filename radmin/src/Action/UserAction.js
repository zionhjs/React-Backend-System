import ActionTypes from './ActionTypes';
import service from '../Service';

export function LoadUserAction(payload){
    return{
        type:ActionTypes.LOAD_USER_LIST,
        payload 
    }
}

//redux-thunk的用法:
export function LoadUserActionAsync(params){
    return dispatch => {
        return service.loadUserList()
        .then(res => {
            dispatch(LoadUserAction(res.data));
        })
    }
}