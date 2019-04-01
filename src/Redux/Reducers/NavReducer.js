import {
    ITEM_SELECTED
} from '../types'

const INITIAL_STATE = {
    item: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ITEM_SELECTED:
            return {...state, item: action.payload};
        default: 
            return state;
    }
}