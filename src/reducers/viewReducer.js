import {
    FETCH_VIEW, UPDATE_VIEW
} from '../actions/types';

const initialState = {
    view: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_VIEW:
            console.log("reducer UPDATE_VIEW");
            console.log(action.payload);
            return {
                ...state,
                view: action.payload.view
            }
        case FETCH_VIEW:
            console.log("reducer FETCH_VIEW");
            console.log(state);
            return {
                ...state
            }
        default:
            return state;
    }
}
