import {
    GET_DELIVERY_ADDRESS_SUCCESS,
    GET_DELIVERY_ADDRESS_FAIL,
    CREATE_DELIVERY_ADDRESS_SUCCESS,
    CREATE_DELIVERY_ADDRESS_FAIL,
    UPDATE_DELIVERY_ADDRESS_SUCCESS,
    UPDATE_DELIVERY_ADDRESS_FAIL,
    DELETE_DELIVERY_ADDRESS_SUCCESS,
    DELETE_DELIVERY_ADDRESS_FAIL,

} from '../actions/types';

const initialState = {

    // Get delivery address
    delivery_addresses: null,
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {

        case GET_DELIVERY_ADDRESS_SUCCESS:
        case CREATE_DELIVERY_ADDRESS_SUCCESS:
            return {
                ...state,
                delivery_addresses: payload.delivery_addresses
            }

        case CREATE_DELIVERY_ADDRESS_FAIL:

        case GET_DELIVERY_ADDRESS_FAIL:
            return {
                ...state,
                delivery_addresses: []
            }

        case UPDATE_DELIVERY_ADDRESS_SUCCESS:
            return {
                ...state,
                delivery_addresses: payload.delivery_addresses
            };

        case UPDATE_DELIVERY_ADDRESS_FAIL:
            return {
                ...state
            };

        case DELETE_DELIVERY_ADDRESS_SUCCESS:
            return {
                ...state,
                delivery_addresses: payload.delivery_addresses
            };

        case DELETE_DELIVERY_ADDRESS_FAIL:
            return {
                ...state
            };


        default:
            return state;
    }
};