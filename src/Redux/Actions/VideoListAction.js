import {
    FOLDER_SELECTED,
    VIDEO_SELECTED,
} from '../types'

export const selectFolder = (folderName, hasExpanded) => {
    return {
        type: FOLDER_SELECTED,
        payload: folderName,
        payload2: hasExpanded,
    };
}

export const selectVideo = (vidURL) => {
    return {
        type: VIDEO_SELECTED,
        payload: vidURL,
    };
}
