import { FETCH_TRAVELTYPE, UPDATE_TRAVELTYPE } from './types';

export const fetchTraveltype = (id) => dispatch => {
    dispatch({
        type: FETCH_TRAVELTYPE,
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