import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    SET_CATEGORIES_LOADING,
    REMOVE_CATEGORIES_LOADING,

} from '../actions/types';

const initialState = {
    categories: null,
    loading: false
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case SET_CATEGORIES_LOADING:
            return {
                ...state,
                loading: true
            }

        case REMOVE_CATEGORIES_LOADING:
            return {
                ...state,
                loading: false
            }

        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload.categories
            }

        case GET_CATEGORIES_FAIL:
            return {
                ...state,
                categories: null
            }
        default:
            return state
    }
};