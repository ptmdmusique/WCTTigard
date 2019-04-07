import {combineReducers} from 'redux';
import NavReducer from './NavReducer';
import VideoListReducer from './VideoListReducer';

export default combineReducers({
    selectedItem: VideoListReducer,
    navReducer: NavReducer,
})