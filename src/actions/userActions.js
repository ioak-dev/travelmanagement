import axios from 'axios';
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
        axios.get('http://localhost:8080/person/email/' + email)
        .then((user) => {
            console.log(user.data);
            dispatch({
                type: RELOAD_LOGGED_USER,
                payload: {
                    email: user.data.email,
                    displayname: user.data.name,
                    id: user.data.id,
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