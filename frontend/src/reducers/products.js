import {
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    SET_PRODUCTS_LOADING,
    REMOVE_PRODUCTS_LOADING,
    // some comment

} from '../actions/types';

const initialState = {
    products: null,
    loading: false
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case SET_PRODUCTS_LOADING:
            return {
                ...state,
                loading: true
            }

        case REMOVE_PRODUCTS_LOADING:
            return {
                ...state,
                loading: false
            }

        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: payload.products
            }

        case GET_PRODUCTS_FAIL:
            return {
                ...state,
                products: null
            }
        default:
            return state
    }
};