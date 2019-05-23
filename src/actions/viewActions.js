import axios from 'axios';
import {
    FETCH_VIEW,
    UPDATE_VIEW
} from './types';

export const reloadView = (type, loggedInUserId) => dispatch => {
    console.log('fetching HTTP');
    console.log(type, loggedInUserId);
    axios.get('http://localhost:8080/wizard/' + type + '/' + loggedInUserId)
    .then((response) => {
        
        console.log(response);

        dispatch({
            type: UPDATE_VIEW,
            payload: {
                view: response.data
            }
        })
    });
}

export const removeItem = (type, loggedInUserId, requestId) => dispatch => {
    console.log('fetching HTTP');
    console.log(requestId);
    axios.delete('http://localhost:8080/wizard/' + requestId)
    .then(() => {
        axios.get('http://localhost:8080/wizard/' + type + '/' + loggedInUserId)
        .then((response) => {
            
            console.log(response);
    
            dispatch({
                type: UPDATE_VIEW,
                payload: {
                    view: response.data
                }
            })
        });
    });
}

export const fetchView = () => dispatch => {
    dispatch({
        type: FETCH_VIEW
    })
}
