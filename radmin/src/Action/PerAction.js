import ActionTypes from './ActionTypes';
import service from '../Service';

export function LoadPer(payload){
    return {
        type:ActionTypes.LOAD_PER_LIST,
        payload
    }
}

export function LoadPerAsync(params){
    return dispatch => {
        return service.loadPerListt(params)
               .then(res => {
                   let payload = {list:res.data, total:parseInt(res.headers['x-total-count'])};
                   dispatch(LoadPer(payload));
               })      
    }
}

export function AddPer(payload){
    return {
        type:ActionTypes.ADD_PER,
        payload
    }
}

export function AddPerAsync(payload){
    return dispatch => {
        return service.addPer(per)
               .then(res => {
                   dispatch(AddPer(res.data))
               })
    }
}
