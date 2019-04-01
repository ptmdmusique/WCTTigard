import {
    ITEM_SELECTED
} from '../types'

export const selectItem = (item) => {
    return {
        type: ITEM_SELECTED,
        payload: item
    }
}