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
        return service.loadUserList(params)
        .then(res => {
            dispatch(LoadUserAction({list:res.data, total:parseInt(res.headers['x-total-count'])}));
        })
    }
}

export function AddUserAction(payload){
    return{
        type:ActionTypes.ADD_USER,
        payload
    }
}
export function AddUserActionAsync(payload){
    return dispatch => {
        return service.addUser(payload)
               .then(res =>{
                   dispatch(AddUserAction(res.data));
               })
    }
}
