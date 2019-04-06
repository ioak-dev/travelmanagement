import { combineReducers } from 'redux';
import wizardReducer from './wizardReducer';

export default combineReducers({
    wizard: wizardReducer
})