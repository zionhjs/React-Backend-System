import ActionTypes from '../Action/ActionTypes';

export default function UserReducer(preState={list:[], total:0}, action){
    switch(action.type){
        case ActionTypes.LOAD_USER_LIST:
            return action.payload;
        case ActionTypes.ADD_USER:
            preState.list.shift(action.payload)
            preState.total+=1;
            return {...preState};
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