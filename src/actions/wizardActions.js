import axios from 'axios';
import {
    GO_TO_PAGE,
    FETCH_WIZARD,
    UPDATE_WIZARD
} from './types';

import { SECTION_02, SECTION_REVIEW } from '../components/wizard/section-types'

export const reloadWizard = (id, loggedInUserId) => dispatch => {
    console.log('fetching HTTP');
    console.log(id, loggedInUserId);
    axios.get('http://localhost:8080/wizard/' + id)
    .then((response) => {
        const wizard = response.data;
        let currentpage = SECTION_REVIEW;

        if (loggedInUserId === wizard.createdBy && wizard.status.name === 'DRAFT') {
            currentpage = SECTION_02;
        }

        dispatch({
            type: UPDATE_WIZARD,
            payload: {
                wizardid: wizard.id,
                currentpage: currentpage,
                status: wizard.status,
                createdBy: wizard.createdBy,
                traveltype: wizard.traveltype,
                clientinfo: wizard.clientinfo,
                purposeofvisit: wizard.purposeofvisit,
                flightdetails: wizard.flightdetails,
                visa: wizard.visa,
                hoteldetails: wizard.hoteldetails,
                localtransportdetails: wizard.localtransportdetails,
                review: wizard.review
            }
        })
    });
}

export const fetchWizard = () => dispatch => {
    dispatch({
        type: FETCH_WIZARD
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

export const goToPage = (page) => dispatch => {
    dispatch({
        type: GO_TO_PAGE,
        currentpage: page
    })
}

export const updateWizard = (type, id, data) => dispatch => {
    dispatch({
        type: type,
        id: id,
        payload: data
    })
}

export const saveWizard = (userId, data) => dispatch => {
    console.log(data);
    axios.put('http://localhost:8080/wizard/' + userId, data, null)
        .then((response) => {
            const wizard = response.data;
            dispatch({
                type: UPDATE_WIZARD,
                payload: {
                    wizardid: wizard.id,
                    status: wizard.status,
                    createdBy: wizard.createdBy,
                    traveltype: wizard.traveltype,
                    clientinfo: wizard.clientinfo,
                    purposeofvisit: wizard.purposeofvisit,
                    flightdetails: wizard.flightdetails,
                    visa: wizard.visa,
                    hoteldetails: wizard.hoteldetails,
                    localtransportdetails: wizard.localtransportdetails,
                    review: wizard.review
                }
            })
        })
}

export const submitWizard = (userId, data) => dispatch => {
    console.log(data);
    axios.put('http://localhost:8080/wizard/' + userId, data, null)
        .then((response) => {

            axios.post('http://localhost:8080/wizard/' + response.data.id + '/submit/' + userId)
            .then((response) => {
            
                const wizard = response.data;
                dispatch({
                    type: UPDATE_WIZARD,
                    payload: {
                        wizardid: wizard.id,
                        status: wizard.status,
                        createdBy: wizard.createdBy,
                        traveltype: wizard.traveltype,
                        clientinfo: wizard.clientinfo,
                        purposeofvisit: wizard.purposeofvisit,
                        flightdetails: wizard.flightdetails,
                        visa: wizard.visa,
                        hoteldetails: wizard.hoteldetails,
                        localtransportdetails: wizard.localtransportdetails,
                        review: wizard.review
                    }
                })
            })
        })
}

export const completeWizard = (userId, data) => dispatch => {
    console.log(data);
    axios.put('http://localhost:8080/wizard/' + userId, data, null)
        .then((response) => {

            axios.post('http://localhost:8080/wizard/' + response.data.id + '/complete/' + userId)
            .then((response) => {
            
                const wizard = response.data;
                dispatch({
                    type: UPDATE_WIZARD,
                    payload: {
                        wizardid: wizard.id,
                        status: wizard.status,
                        createdBy: wizard.createdBy,
                        traveltype: wizard.traveltype,
                        clientinfo: wizard.clientinfo,
                        purposeofvisit: wizard.purposeofvisit,
                        flightdetails: wizard.flightdetails,
                        visa: wizard.visa,
                        hoteldetails: wizard.hoteldetails,
                        localtransportdetails: wizard.localtransportdetails,
                        review: wizard.review
                    }
                })
            })
        })
}


export const approveWizard = (userId, data) => dispatch => {
    console.log(data);
    axios.put('http://localhost:8080/wizard/' + userId, data, null)
        .then((response) => {

            axios.post('http://localhost:8080/wizard/' + response.data.id + '/approve/' + userId)
            .then((response) => {
            
                const wizard = response.data;
                dispatch({
                    type: UPDATE_WIZARD,
                    payload: {
                        wizardid: wizard.id,
                        status: wizard.status,
                        createdBy: wizard.createdBy,
                        traveltype: wizard.traveltype,
                        clientinfo: wizard.clientinfo,
                        purposeofvisit: wizard.purposeofvisit,
                        flightdetails: wizard.flightdetails,
                        visa: wizard.visa,
                        hoteldetails: wizard.hoteldetails,
                        localtransportdetails: wizard.localtransportdetails,
                        review: wizard.review
                    }
                })
            })
        })
}

export const rejectWizard = (userId, data) => dispatch => {
    console.log(data);
    axios.put('http://localhost:8080/wizard/' + userId, data, null)
        .then((response) => {

            axios.post('http://localhost:8080/wizard/' + response.data.id + '/reject/' + userId)
            .then((response) => {
            
                const wizard = response.data;
                dispatch({
                    type: UPDATE_WIZARD,
                    payload: {
                        wizardid: wizard.id,
                        status: wizard.status,
                        createdBy: wizard.createdBy,
                        traveltype: wizard.traveltype,
                        clientinfo: wizard.clientinfo,
                        purposeofvisit: wizard.purposeofvisit,
                        flightdetails: wizard.flightdetails,
                        visa: wizard.visa,
                        hoteldetails: wizard.hoteldetails,
                        localtransportdetails: wizard.localtransportdetails,
                        review: wizard.review
                    }
                })
            })
        })
}
