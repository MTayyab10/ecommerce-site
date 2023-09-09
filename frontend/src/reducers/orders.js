import {
    SET_CREATE_ORDER_LOADING,
    REMOVE_CREATE_ORDER_LOADING,

    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,

    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAIL,
    GET_ORDER_DETAIL_SUCCESS,
    GET_ORDER_DETAIL_FAIL,

    GET_TOTAL_PRICE_SUCCESS,
    GET_TOTAL_PRICE_FAIL,

    SET_ORDERS_LOADING,
    REMOVE_ORDERS_LOADING

} from '../actions/types';

const initialState = {
    // Get total price
    sub_total: 0.0,
    delivery_fee: 0.0,
    service_fee: 0.0,
    total_amount: 0.0,

    // For loading while creating order
    create_order_loading: false,

    // For all orders & OrderItem
    // get orders loading
    get_orders_loading: false,
    orders: null,
    order_items: null,

    // For one specific Order & OrderItem
    specific_order: null,
    specific_order_items: null,

};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case GET_TOTAL_PRICE_SUCCESS:
            return {
                ...state,
                sub_total: payload.sub_total,
                delivery_fee: payload.delivery_fee,
                service_fee: payload.service_fee,
                total_amount: payload.total_amount,
            }

        case GET_TOTAL_PRICE_FAIL:
            return {
                ...state,
                sub_total: 0.00,
                delivery_fee: 0.00,
                service_fee: 0.00,
                total_amount: 0.00,
            }

       // create order loading

        case SET_CREATE_ORDER_LOADING:
            return {
                ...state,
                create_order_loading: true
            }

        case REMOVE_CREATE_ORDER_LOADING:
            return {
                ...state,
                create_order_loading: false
            }

        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                orders: payload.orders
            }

        case CREATE_ORDER_FAIL:
            return  {
                ...state,
                orders: null
            }

        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                orders: payload.orders,
                order_items: payload.order_items,
            }

        case GET_ORDERS_FAIL:
            return {
                ...state,
                orders: []
            }

       // for getting orders loading

        case SET_ORDERS_LOADING:
            return {
                ...state,
                get_orders_loading: true
            }

        case REMOVE_ORDERS_LOADING:
            return {
                ...state,
                get_orders_loading: false
            }

        case GET_ORDER_DETAIL_SUCCESS:
            return {
                ...state,
                specific_order: payload.specific_order,
                specific_order_items: payload.specific_order_items
            }

        case GET_ORDER_DETAIL_FAIL:
            return {
                ...state,
                specific_order: {},
                specific_order_items: {},
            }

        default:
            return state;
    }
};