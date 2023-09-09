import axios from 'axios';
import {
    ADD_ITEM,
    GET_TOTAL,
    GET_ITEM_TOTAL,
    GET_ITEMS,
    UPDATE_ITEM,
    REMOVE_ITEM,
    EMPTY_CART,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAIL,
    GET_TOTAL_SUCCESS,
    GET_TOTAL_FAIL,
    GET_ITEM_TOTAL_SUCCESS,
    GET_ITEM_TOTAL_FAIL,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAIL,
    UPDATE_ITEM_SUCCESS,
    UPDATE_ITEM_FAIL,
    REMOVE_ITEM_SUCCESS,
    REMOVE_ITEM_FAIL,
    EMPTY_CART_SUCCESS,
    EMPTY_CART_FAIL,
    SYNCH_CART_SUCCESS,
    SYNCH_CART_FAIL,
} from './types';
import {setAlert} from "./alert";


// Add item to the cart

export const add_item = product => async dispatch => {

    if (localStorage.getItem('access')) {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        const product_id = product.id;
        const body = JSON.stringify({product_id});

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/cart/add-item`, body, config);

            if (res.status === 201) {

                dispatch({
                    type: ADD_ITEM_SUCCESS,
                    payload: res.data
                });

                console.log("Item has been added.")
                dispatch(setAlert("Item has been added to Cart.", "info"))

            } else {

                dispatch({
                    type: ADD_ITEM_FAIL
                });
                console.log("add item fail at else")
                dispatch(setAlert(res.data.error, "error"))

            }

        } catch (err) {

            dispatch({
                type: ADD_ITEM_FAIL
            });

            console.log("add item fail at catch", err.response.data)
            dispatch(setAlert(err.response.data.error, "error"))
            // dispatch(setAlert("add item fail at catch", "error"))
        }

    }

    // add to cart without login

    // } else {
    //
    //     let cart = [];
    //
    //     if (localStorage.getItem('cart')) {
    //         cart = JSON.parse(localStorage.getItem('cart'));
    //     }
    //
    //     let shouldAddItem = true;
    //
    //     cart.map(item => {
    //         if (product.id.toString() === item.product.id.toString()) {
    //             shouldAddItem = false;
    //         }
    //     });
    //
    //     const order_item = {
    //         product: product,
    //         count: 1
    //     };
    //
    //     if (shouldAddItem) {
    //         cart.push(order_item);
    //     }
    //
    //     dispatch({
    //         type: ADD_ITEM,
    //         payload: cart
    //     });
    //
    //     dispatch(setAlert("Item has been added to Cart.", "info"))
    //
    // }
};


// Get Cart Items in Cart.js

export const get_items = () => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart/cart-items`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_ITEMS_SUCCESS,
                    payload: res.data
                });

            } else {
                dispatch({
                    type: GET_ITEMS_FAIL
                });
                console.log("get items fail")
            }

        } catch (err) {

            dispatch({
                type: GET_ITEMS_FAIL
            });
            console.log("get items fail")

        }
    } else {
        dispatch({
            type: GET_ITEMS
        });
    }
};


// Get Cart Total

export const get_total = () => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart/get-total`, config);

            if (res.status === 200) {

                dispatch({
                    type: GET_TOTAL_SUCCESS,
                    payload: res.data
                });

            } else {
                dispatch({
                    type: GET_TOTAL_FAIL
                });
                console.log("get items fail")

            }
        } catch (err) {
            dispatch({
                type: GET_TOTAL_FAIL
            });
            console.log("get items fail")

        }
    }
    // Without Login functionality
    // } else {
    //     let total = 0.0;
    //     let compare_total = 0.0;
    //     let cart = [];
    //
    //     if (localStorage.getItem('cart')) {
    //         cart = JSON.parse(localStorage.getItem('cart'));
    //
    //         cart.map(item => {
    //             total += parseFloat(item.product.price) * parseFloat(item.count);
    //             compare_total += parseFloat(item.product.compare_price) * parseFloat(item.count);
    //         });
    //     }
    //
    //     dispatch({
    //         type: GET_TOTAL,
    //         payload: [parseFloat(total.toFixed(2)), parseFloat(compare_total.toFixed(2))]
    //     });
    // }
};


// Get Total Cart Items like 3 or 4

export const get_item_total = () => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart/get-item-total`, config);

            if (res.status === 200) {

                dispatch({
                    type: GET_ITEM_TOTAL_SUCCESS,
                    payload: res.data
                });

            } else {
                dispatch({
                    type: GET_ITEM_TOTAL_FAIL
                });
            }

        } catch (err) {
            dispatch({
                type: GET_ITEM_TOTAL_FAIL
            });
        }
    }

    // Without login functionality

    // } else {
    //     let total = 0;
    //
    //     if (localStorage.getItem('cart')) {
    //         total = JSON.parse(localStorage.getItem('cart')).length;
    //     }
    //
    //     dispatch({
    //         type: GET_ITEM_TOTAL,
    //         payload: total
    //     });
    // }
};


// Update quantity of item in Cart

export const update_item = (item, quantity) => async dispatch => {

    if (localStorage.getItem('access')) {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        const product_id = item.product.id;
        const body = JSON.stringify({product_id, quantity});

        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/cart/update-item`, body, config);

            if (res.status === 200 && !res.data.error) {

                dispatch({
                    type: UPDATE_ITEM_SUCCESS,
                    payload: res.data
                });

                dispatch(setAlert("Product has been updated.", "info"))

            } else {

                dispatch({
                    type: UPDATE_ITEM_FAIL
                });

                dispatch(setAlert(res.data.error, "error"))

            }
        } catch (err) {

            dispatch({
                type: UPDATE_ITEM_FAIL
            });
            dispatch(setAlert("Error in updating item.", "error"))
        }
    }
    // Without login functionality
    // } else {
    //     let cart = [];
    //
    //     if (localStorage.getItem('cart')) {
    //         cart = JSON.parse(localStorage.getItem('cart'));
    //
    //         cart.map((cart_item, index) => {
    //             if (cart_item.product.id.toString() === item.product.id.toString()) {
    //                 cart[index].count = parseInt(count);
    //             }
    //         });
    //     }
    //
    //     dispatch({
    //         type: UPDATE_ITEM,
    //         payload: cart
    //     });
    // }
};


// Remove item in Cart

export const remove_item = item => async dispatch => {

    if (localStorage.getItem('access')) {
        const product_id = item.product.id;
        const body = JSON.stringify({product_id});

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            },
            data: body
        };

        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/cart/remove-item`, config);

            if (res.status === 200) {

                dispatch({
                    type: REMOVE_ITEM_SUCCESS,
                    payload: res.data
                });

            } else {

                dispatch({
                    type: REMOVE_ITEM_FAIL
                });
            }

        } catch (err) {

            dispatch({
                type: REMOVE_ITEM_FAIL
            });
        }

    }

    // without login functionality
    // } else {
    //     let cart = [];
    //     let new_cart = [];
    //
    //     if (localStorage.getItem('cart')) {
    //         cart = JSON.parse(localStorage.getItem('cart'));
    //
    //         cart.map(cart_item => {
    //             if (cart_item.product.id.toString() !== item.product.id.toString()) {
    //                 new_cart.push(cart_item);
    //             }
    //         });
    //     }
    //
    //     dispatch({
    //         type: REMOVE_ITEM,
    //         payload: new_cart
    //     });
    // }
};


// Empty/Delete a cart

export const empty_cart = () => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/cart/empty-cart`, config);

            if (res.status === 200) {
                dispatch({
                    type: EMPTY_CART_SUCCESS
                });
            } else {
                dispatch({
                    type: EMPTY_CART_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: EMPTY_CART_FAIL
            });
        }
    } else {
        dispatch({
            type: EMPTY_CART
        });
    }
};


export const synch_cart = () => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    let cart_items = [];

    if (localStorage.getItem('cart')) {
        let cart = JSON.parse(localStorage.getItem('cart'));

        cart.map(cart_item => {
            const item = {};
            item.product_id = cart_item.product.id;
            item.count = cart_item.count;
            cart_items.push(item);
        });
    }

    const body = JSON.stringify({cart_items});

    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/cart/synch`, body, config);

        if (res.status === 201) {
            dispatch({
                type: SYNCH_CART_SUCCESS
            });

        } else {
            dispatch({
                type: SYNCH_CART_FAIL
            });
        }

    } catch (err) {
        dispatch({
            type: SYNCH_CART_FAIL
        });
    }
};
