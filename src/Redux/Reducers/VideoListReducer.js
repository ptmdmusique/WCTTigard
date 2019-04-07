import {
    FOLDER_SELECTED,
    VIDEO_SELECTED,
} from '../types'

const INITIAL_STATE = {
    folderName: '',
    hasExpanded: false,
    vidURL: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case FOLDER_SELECTED:
            return {...state, folderName: action.payload, hasExpanded: action.payload2};
        case VIDEO_SELECTED:
            return {...state, vidURL: action.payload};
        default:
            return state;
    }
}