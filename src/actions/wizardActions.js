import { FETCH_WIZARD, UPDATE_TRAVELTYPE, UPDATE_CLIENTINFO } from './types';

export const fetchWizard = (id) => dispatch => {
    dispatch({
        type: FETCH_WIZARD,
        id: id
    })
}

export const updateTravelType = (id, data) => dispatch => {
    dispatch({
        type: UPDATE_TRAVELTYPE,
        id: id,
        payload: data
    })
}

export const updateClientinfo = (id, data) => dispatch => {
    dispatch({
        type: UPDATE_CLIENTINFO,
        id: id,
        payload: data
    })
}