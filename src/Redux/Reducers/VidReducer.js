import {
    FOLDER_SELECTED,
} from '../types'

const INITIAL_STATE = {
    folderName: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case FOLDER_SELECTED:
            return {...state, folderName: action.payload};
        default:
            return state;
    }
}