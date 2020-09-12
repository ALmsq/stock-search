import {
    LOADING_UI
} from '../actions/types'

const initialState = {
    loading: false,
    errors: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
    }
}