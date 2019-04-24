import {
    FETCH_LOGGED_USER,
    RELOAD_LOGGED_USER
} from './types';

export const fetchLoggedUser = () => dispatch => {
    dispatch({
        type: FETCH_LOGGED_USER
    })
}

export const reloadLoggedUser = (email) => dispatch => {
    if (email) {
        console.log('fetching HTTP');
        fetch('http://localhost:8080/person/email/' + email)
        .then((res) => res.json())
        .then((user) => {
            dispatch({
                type: RELOAD_LOGGED_USER,
                payload: {
                    email: user.email,
                    displayname: user.name,
                    loggedin: true
                }
            })
        });
    } else {
        dispatch({
            type: RELOAD_LOGGED_USER,
            payload: {
                email: null,
                displayname: null,
                loggedin: false
            }
        })
    }
}