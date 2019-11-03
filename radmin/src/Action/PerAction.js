import ActionTypes from './ActionTypes';
import service from '../Service';

export function LoadPer(payload) {
    return {
        type: ActionTypes.LOAD_PER_LIST,
        payload
    }
}
export function LoadPerAsync(params) {
    return dispatch => {
        return service.loadPerListt(params)
            .then(res => {
                let payload = { list: res.data, total: parseInt(res.headers['x-total-count']) };
                dispatch(LoadPer(payload));
            })
    }
}

export function AddPer(payload) {
    return {
        type: ActionTypes.ADD_PER,
        payload
    }
}
export function AddPerAsync(per) {
    return dispatch => {
        return service.addPer(per)
            .then(res => {
                dispatch(AddPer(res.data))
            })
    }
}

export function EditPer(payload) {
    return {
        type: ActionTypes.EDIT_PER,
        payload
    }
}
export function EditPerAsync(per) {
    return dispatch => {
        return service.editPer(per)
            .then(res => {
                dispatch(EditPer(per));
            });
    }
}

export function DeletePer(ids) {
    return {
        type: ActionTypes.DELETE_PER_IDS,
        payload: ids
    }
}
export function DeletePerAsync(ids) {
    return dispatch => {
        return service.deletePer(ids)
            .then(res => {
                dispatch(DeletePer(ids));
            });
    }
}
