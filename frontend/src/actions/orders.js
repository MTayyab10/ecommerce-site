import axios from 'axios';
import {
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAIL,
    GET_ORDER_DETAIL_SUCCESS,
    GET_ORDER_DETAIL_FAIL,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    GET_TOTAL_PRICE_SUCCESS,
    GET_TOTAL_PRICE_FAIL,
    SET_CREATE_ORDER_LOADING,
    REMOVE_CREATE_ORDER_LOADING,
    SET_ORDERS_LOADING,
    REMOVE_ORDERS_LOADING,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAIL
} from './types';
import {setAlert} from "./alert";


// Get total price of Order like sub_total, delivery and total
export const get_total_price = () => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/order/create-order`, config);

        if (res.status === 200 && !res.data.error) {

            dispatch({
                type: GET_TOTAL_PRICE_SUCCESS,
                payload: res.data
            });

            console.log("Total price data: ", res.data)

        } else {
            dispatch({
                type: GET_TOTAL_PRICE_FAIL
            });
            dispatch(setAlert(res.data.error, "error"))
            console.log("Total price got fail")
        }

    } catch (err) {

        dispatch({
            type: GET_TOTAL_PRICE_FAIL
        });
    }
};


// Create Order & OrderItem
export const create_order = (navigate) => async dispatch => {

    dispatch ({
        type: SET_CREATE_ORDER_LOADING
    });

    if (localStorage.getItem("access")) {

         const config = {
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem("access")}`,

            },
        };
         console.log('JWT Token', `${localStorage.getItem("access")}`,)

        // const body = JSON.stringify({full_name, address, city, mobile});

        try {
             // as I do not have any data so just add empty {}
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/order/create-order`,{}, config);

            if (res.status === 200 && res.data.success) {

                dispatch({
                    type: CREATE_ORDER_SUCCESS,
                    payload: res.data
                });

                dispatch(get_orders())

                // remove loading
                dispatch({
                    type: REMOVE_CREATE_ORDER_LOADING
                });

                dispatch(setAlert('Your Order has been created, Successfully.', 'success'));
                return navigate("/my_orders", {replace: true})

            } else {
                dispatch({
                    type: CREATE_ORDER_FAIL
                });
                dispatch(setAlert(res.data.error, "error"))
                // dispatch(setAlert("Unable to create order, Try again.", "error"));
            }

        } catch (err) {

            dispatch({
                type: CREATE_ORDER_FAIL
            });
            console.log("Create order err at catch: ", err)
            dispatch(setAlert(err.response.data.error, 'error'))
            // dispatch(setAlert("Unable to create order, Try again.", "error"));
        }

        dispatch({
            type: REMOVE_CREATE_ORDER_LOADING
        });

        window.scrollTo(0, 0);

    } else {

        dispatch({
            type: CREATE_ORDER_FAIL
        });
        dispatch(setAlert("Unable to create order, Try again.", "error"));

        // remove loading
        dispatch({
            type: REMOVE_CREATE_ORDER_LOADING
        });

    }
};


// Get all orders
export const get_orders = () => async dispatch => {

    // set loading
    dispatch({
        type: SET_ORDERS_LOADING
    })

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/order/get-orders`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_ORDERS_SUCCESS,
                    payload: res.data
                });
                console.log("Get orders success.")

                dispatch({
                    type: REMOVE_ORDERS_LOADING
                })

            } else {
                dispatch({
                    type: GET_ORDERS_FAIL
                });
            }

        } catch (err) {
            dispatch({
                type: GET_ORDERS_FAIL
            });

            // remove loading
            dispatch({
                type: REMOVE_ORDERS_LOADING,
            });
        }
    }
};


// Get one/specific order detail
export const get_specific_order = order_id => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/order/get-order/${order_id}`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_ORDER_DETAIL_SUCCESS,
                    payload: res.data
                });

            } else {
                dispatch({
                    type: GET_ORDER_DETAIL_FAIL
                });
            }

        } catch (err) {
            dispatch({
                type: GET_ORDER_DETAIL_FAIL
            });
        }
    }
};


// Cancel order by clicking on cancel
export const cancel_order = order_id => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/order/get-order/${order_id}`, {}, config);

            if (res.status === 200) {

                dispatch({
                    type: CANCEL_ORDER_SUCCESS,
                    payload: res.data
                });

                console.log("Cancel order success")
                // after cancelling order should load orders
                dispatch(get_orders())
                dispatch(setAlert("Your order has been cancelled", "info"))

            } else {
                dispatch({
                    type: CANCEL_ORDER_FAIL
                });
                console.log("cancel order ", res)
                dispatch(setAlert("Your order not cancelled", "error"))

            }

        } catch (err) {
            dispatch({
                type: CANCEL_ORDER_FAIL
            });
            console.log("cancel order ", err)
            dispatch(setAlert("Your order not cancelled", "error"))

        }
    }

}


// Cancel order
export const cancel_order1 = (order_id, reason, comment, navigate) => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const body = JSON.stringify({reason, comment})

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/order/get-order/${order_id}`, body, config);

            if (res.status === 200) {

                dispatch({
                    type: CANCEL_ORDER_SUCCESS,
                    payload: res.data
                });

                console.log("Cancel order success")
                // after cancelling order should load orders
                dispatch(get_orders())
                dispatch(setAlert("Your order has been cancelled", "info"))
                return navigate('/my_orders')

            } else {
                dispatch({
                    type: CANCEL_ORDER_FAIL
                });
                console.log("cancel order ", res)
                dispatch(setAlert("Your order not cancelled", "error"))
            }

        } catch (err) {
            dispatch({
                type: CANCEL_ORDER_FAIL
            });
            console.log("cancel order ", err)
            dispatch(setAlert("Your order not cancelled", "error"))

        }
    }

}