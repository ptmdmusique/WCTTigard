import {
    FOLDER_SELECTED,
} from '../types'

export const selectFolder = (folderName) => {
    return {
        type: FOLDER_SELECTED,
        payload: folderName
    };
}