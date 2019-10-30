import ActionTypes from '../Action/ActionTypes';

export default function UserReducer(preState={list:[], total:0}, action){
    switch(action.type){
        case ActionTypes.LOAD_USER_LIST:
            return action.payload;
        default:
            return preState;
    }
}

//redux-thunk的用法:
// export function LoadUserActionAsync(params){
//     return dispatch => {
//         return service.loadUserList()
//         .then(res => {
//             dispatch(LoadUserAction(res.data));
//         })
//     }
// }