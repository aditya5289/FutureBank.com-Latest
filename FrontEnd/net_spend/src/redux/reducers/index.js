import { combineReducers } from 'redux';
import userReducer from './userReducer';
import anotherReducer from './anotherReducer';

const rootReducer = combineReducers({
    user: userModifier,
    another: anotherReducer
});

export default rootReducer;
