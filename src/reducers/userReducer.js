import {
    FETCH_LOGGED_USER,
    RELOAD_LOGGED_USER
} from '../actions/types';

const initialState = {
    loggedUser: {
        id: '',
        email: '',
        loggedin: false,
        displayname: ''
    }
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_LOGGED_USER:
            console.log("reducer FETCH_LOGGED_USER");
            console.log(state);
            return {
                ...state
            }
        case RELOAD_LOGGED_USER:
            console.log("reducer RELOAD_LOGGED_USER");
            console.log(action.payload);
            return {
                ...state,
                loggedUser: action.payload
            }
        default:
            return state;
    }
}
