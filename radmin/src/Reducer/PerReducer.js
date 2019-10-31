import ActionTypes from '../Action/ActionTypes';

export default function UserReducer(preState={list:[], total:0}, action){
    switch(action.type){
        case ActionTypes.ADD_PER:
            let newState = {...preState};
            newState.list.unshift(action.payload);
            newState.total += 1;
            return newState;
        case ActionTypes.LOAD_PER_LIST:
            return action.payload;
        default:
            return preState;
    }
}