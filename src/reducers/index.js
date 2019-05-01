import { combineReducers } from 'redux';
import wizardReducer from './wizardReducer';
import userReducer from './userReducer';
import viewReducer from './viewReducer';

export default combineReducers({
    wizard: wizardReducer,
    user: userReducer,
    view: viewReducer
})