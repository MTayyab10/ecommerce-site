import {
    GET_SHOPS_SUCCESS,
    SET_SHOPS_LOADING,
    REMOVE_SHOPS_LOADING,
    GET_SHOPS_FAIL,

} from '../actions/types';

const initialState = {
    shops: null,
    loading: false
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case SET_SHOPS_LOADING:
            return {
                ...state,
                loading: true
            }

        case REMOVE_SHOPS_LOADING:
            return {
                ...state,
                loading: false
            }

        case GET_SHOPS_SUCCESS:
            return {
                ...state,
                shops: payload.shops
            }

        case GET_SHOPS_FAIL:
            return {
                ...state,
                shops: null
            }
        default:
            return state
    }
};