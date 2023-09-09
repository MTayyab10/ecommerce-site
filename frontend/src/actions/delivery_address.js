import axios from "axios";
import {
    GET_DELIVERY_ADDRESS_SUCCESS,
    GET_DELIVERY_ADDRESS_FAIL,
    CREATE_DELIVERY_ADDRESS_SUCCESS,
    CREATE_DELIVERY_ADDRESS_FAIL,
    UPDATE_DELIVERY_ADDRESS_SUCCESS,
    UPDATE_DELIVERY_ADDRESS_FAIL,
    DELETE_DELIVERY_ADDRESS_SUCCESS,
    DELETE_DELIVERY_ADDRESS_FAIL,
} from "./types";

import {setAlert} from "./alert";

// Get All delivery_address

export const get_delivery_address = () => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/delivery/delivery-address`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_DELIVERY_ADDRESS_SUCCESS,
                    payload: res.data
                });

            } else {
                dispatch({
                    type: GET_DELIVERY_ADDRESS_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: GET_DELIVERY_ADDRESS_FAIL
            });
        }
    }

}


// Create new address

export const create_delivery_address = (name, address, city, mobile, addr_status) => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const body = JSON.stringify({name, address, city, mobile, addr_status})

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/delivery/delivery-address`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: CREATE_DELIVERY_ADDRESS_SUCCESS,
                    payload: res.data
                });
                // after creating address load all address
                // so can show right there after adding address
                dispatch(get_delivery_address())
                window.scroll(0, 0)

                dispatch(setAlert("Delivery address has been created.", "info"))

            } else {
                dispatch({
                    type: CREATE_DELIVERY_ADDRESS_FAIL
                });

                dispatch(setAlert(res.data.error, "error"))
                window.scroll(0, 0)

                // dispatch(setAlert("Delivery address created failed.", "error"))

            }

        } catch (err) {
            dispatch({
                type: CREATE_DELIVERY_ADDRESS_FAIL
            });
            dispatch(get_delivery_address())
            dispatch(setAlert(err.response.data.error, "error"))
            console.log("create addr err: ", err.response)
            window.scroll(0, 0)


            // dispatch(setAlert("Delivery address created failed.", "error"))

        }
    }
}


// Update/Change delivery_address

export const update_delivery_address = (name, address, city, mobile, addr_status, address_id) => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        const body = JSON.stringify({name, address, city, mobile, addr_status})

        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/delivery/delivery-address/${address_id}`, body, config);

            if (res.status === 200) {

                dispatch({
                    type: UPDATE_DELIVERY_ADDRESS_SUCCESS,
                    payload: res.data
                })

                dispatch(setAlert("Delivery address updated success.", "info"))

            } else {

                dispatch({
                    type: UPDATE_DELIVERY_ADDRESS_FAIL
                });
                console.log("Error in updating delivery addr: ", res.data.error)
                dispatch(setAlert(res.data.error, "error"))
                dispatch(setAlert('res.data.error', "error"))

            }
        } catch (err) {

            dispatch({
                type: UPDATE_DELIVERY_ADDRESS_FAIL
            });
            console.log("Error in updating delivery addr: ", err.response)
            dispatch(setAlert(err.response.data.error, "error"))
            // dispatch(setAlert("Something went wrong, Try again.", "error"))

        }
    }
}


// Delete DeliverAddress
export const delete_delivery_address = (address_id) => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/delivery/delivery-address/${address_id}`, config);

            if (res.status === 200) {

                dispatch({
                    type: DELETE_DELIVERY_ADDRESS_SUCCESS,
                    payload: res.data
                })

                dispatch(setAlert("Delivery address deleted success.", "info"))
                // after deleting successfully update address list
                dispatch(get_delivery_address())

            } else {

                dispatch({
                    type: DELETE_DELIVERY_ADDRESS_FAIL
                });
                console.log("Error in deleting delivery addr: ", res.data.error)
                dispatch(setAlert(res.data.error, "error"))

            }
        } catch (err) {

            dispatch({
                type: DELETE_DELIVERY_ADDRESS_FAIL
            });
            console.log("Error in deleting delivery addr: ", err.response)
            dispatch(setAlert(err.response.data.error, "error"))


        }
    }


}
