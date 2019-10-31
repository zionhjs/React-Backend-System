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