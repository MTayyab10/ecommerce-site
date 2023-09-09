import axios from 'axios';
import {
    SET_SHOPS_LOADING,
    GET_SHOPS_SUCCESS,
    GET_SHOPS_FAIL,
    REMOVE_SHOPS_LOADING
} from './types';

export const get_shops = () => async dispatch => {

    dispatch({
        type: SET_SHOPS_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Token 289fa3a3bed1037dc0159843b3c87726bd052788`,

        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/shop/shops`, config);

        if (res.status === 200) {

            dispatch({
                type: GET_SHOPS_SUCCESS,
                payload: res.data
            });

            dispatch({
                type: REMOVE_SHOPS_LOADING
            })

            console.log("Shops: ", res.data)
            console.log("Shops Length: ", res.data.length)


        } else {

            dispatch({
                type: GET_SHOPS_FAIL
            });

            dispatch({
                type: REMOVE_SHOPS_LOADING
            })
        }

    } catch (err) {

        dispatch({
            type: GET_SHOPS_FAIL
        });
        console.log("shops err: ", err)
    }
};