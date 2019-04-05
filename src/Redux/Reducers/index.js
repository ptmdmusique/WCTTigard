import {combineReducers} from 'redux';
import NavReducer from './NavReducer';
import VidReducer from './VidReducer';

export default combineReducers({
    selectedFolder: VidReducer,
    navReducer: NavReducer,
})