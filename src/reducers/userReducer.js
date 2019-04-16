import {
    GO_TO_PAGE,
    FETCH_WIZARD,
    UPDATE_TRAVELTYPE,
    UPDATE_CLIENTINFO,
    UPDATE_PURPOSEOFVISIT, UPDATE_FLIGHTDETAILS, UPDATE_HOTELDETAILS
} from '../actions/types';

const initialState = {
    email: '',
    loggedin: false,
    displayname: ''
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
        case UPDATE_PURPOSEOFVISIT:
            console.log("reducer UPDATE_PURPOSEOFVISIT");
            console.log(state);
            return {
                ...state,
                purposeofvisit: action.payload.purposeofvisit
            }
        case UPDATE_FLIGHTDETAILS:
            console.log("reducer UPDATE_FLIGHTDETAILS");
            console.log(state);
            return {
                ...state,
                flightdetails: action.payload.flightdetails
            }
        case UPDATE_HOTELDETAILS:
            console.log("reducer UPDATE_HOTELDETAILS");
            console.log(state);
            return {
                ...state,
                hoteldetails: action.payload.hoteldetails
            }
        default:
            return state;
    }
}
