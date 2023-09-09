import axios from 'axios';
import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
    SET_CATEGORIES_LOADING,
    REMOVE_CATEGORIES_LOADING
} from './types';

export const get_categories = () => async dispatch => {

    dispatch({
        type: SET_CATEGORIES_LOADING
    })

    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/shop/categories`, config);

        if (res.status === 200) {

            dispatch({
                type: GET_CATEGORIES_SUCCESS,
                payload: res.data
            });

            dispatch({
                type: REMOVE_CATEGORIES_LOADING
            })

            console.log("Categories: ", res.data)

        } else {

            dispatch({
                type: GET_CATEGORIES_FAIL
            });

            dispatch({
                type: REMOVE_CATEGORIES_LOADING
            })
        }

    } catch (err) {

        dispatch({
            type: GET_CATEGORIES_FAIL
        });

        console.log("category err: ", err.response.status)

        dispatch({
            type: REMOVE_CATEGORIES_LOADING
        })
    }
};