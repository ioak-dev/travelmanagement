import {
    GO_TO_PAGE,
    FETCH_WIZARD,
    UPDATE_TRAVELTYPE,
    UPDATE_CLIENTINFO,
    UPDATE_PURPOSEOFVISIT, UPDATE_FLIGHTDETAILS, UPDATE_HOTELDETAILS, UPDATE_LOCALTRANSPORTDETAILS
} from './types';

export const fetchWizard = (id) => dispatch => {
    dispatch({
        type: FETCH_WIZARD,
        id: id
    })
}

export const goToNextPage = (currentpage, count) => dispatch => {
    dispatch({
        type: GO_TO_PAGE,
        currentpage: currentpage + count
    })
}

export const goToPreviousPage = (currentpage, count) => dispatch => {
    dispatch({
        type: GO_TO_PAGE,
        currentpage: currentpage - count
    })
}

export const goToFirstPage = () => dispatch => {
    dispatch({
        type: GO_TO_PAGE,
        currentpage: 1
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

export const updatePurposeofvisit = (id, data) => dispatch => {
    dispatch({
        type: UPDATE_PURPOSEOFVISIT,
        id: id,
        payload: data
    })
}

export const updateFlightdetails = (id, data) => dispatch => {
    dispatch({
        type: UPDATE_FLIGHTDETAILS,
        id: id,
        payload: data
    })
}

export const updateHoteldetails = (id, data) => dispatch => {
    dispatch({
        type: UPDATE_HOTELDETAILS,
        id: id,
        payload: data
    })
}

export const updateLocaltransportdetails = (id, data) => dispatch => {
    dispatch({
        type: UPDATE_LOCALTRANSPORTDETAILS,
        id: id,
        payload: data
    })
}

export const updateWizard = (type, id, data) => dispatch => {
    dispatch({
        type: type,
        id: id,
        payload: data
    })
}
