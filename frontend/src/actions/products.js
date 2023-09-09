import axios from 'axios';
import {
    SET_PRODUCTS_LOADING,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    REMOVE_PRODUCTS_LOADING
} from './types';

export const get_products = () => async dispatch => {

    dispatch({
        type: SET_PRODUCTS_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Token 289fa3a3bed1037dc0159843b3c87726bd052788`,

        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/products`, config);

        if (res.status === 200) {

            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: res.data
            });

            dispatch({
                type: REMOVE_PRODUCTS_LOADING
            })

            console.log("Products: ", res.data)
            console.log("Products Length: ", res.data.length)
            window.scroll(0, 0)


        } else {

            dispatch({
                type: GET_PRODUCTS_FAIL
            });

            dispatch({
                type: REMOVE_PRODUCTS_LOADING
            })
        }

    } catch (err) {

        dispatch({
            type: GET_PRODUCTS_FAIL
        });
        dispatch({
            type: REMOVE_PRODUCTS_LOADING
        })
        console.log("products err: ", err)
    }
};