import {
    GO_TO_PAGE,
    FETCH_WIZARD,
    UPDATE_TRAVELTYPE,
    UPDATE_CLIENTINFO
} from '../actions/types';

const initialState = {
    currentpage: 1,
    traveltype: {
        type: null
    },
    clientinfo: {
        name: null
    }
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GO_TO_PAGE:
            console.log("reducer GO_TO_PAGE");
            console.log(state);
            return {
                ...state,
                currentpage: action.currentpage
            }
        case FETCH_WIZARD:
            console.log("reducer FETCH_WIZARD");
            console.log(state);
            return {
                ...state
            }
        case UPDATE_TRAVELTYPE:
            console.log("reducer UPDATE_TRAVELTYPE");
            console.log(state);
            return {
                ...state,
                traveltype: action.payload.traveltype
            }
        case UPDATE_CLIENTINFO:
            console.log("reducer UPDATE_CLIENTINFO");
            console.log(state);
            return {
                ...state,
                clientinfo: action.payload.clientinfo
            }
        default:
            return state;
    }
}