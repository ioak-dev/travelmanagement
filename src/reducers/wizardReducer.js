import { FETCH_TRAVELTYPE, UPDATE_TRAVELTYPE } from '../actions/types';

const initialState = {
    traveltype: {
        type: null
    }
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_TRAVELTYPE:
            console.log("reducer FETCH_TRAVELTYPE");
            return {
                ...state
            }
        case UPDATE_TRAVELTYPE:
            console.log("reducer UPDATE_TRAVELTYPE");
            return {
                ...state,
                traveltype: action.payload.traveltype
            }
        default:
            return state;
    }
}