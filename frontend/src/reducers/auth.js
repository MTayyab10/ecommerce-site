// first import types which created in actions dir

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,

    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,

    EMAIL_RESET_SUCCESS,
    EMAIL_RESET_FAIL,
    EMAIL_RESET_CONFIRM_SUCCESS,
    EMAIL_RESET_CONFIRM_FAIL,

    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    RESEND_ACTIVATION_SUCCESS,
    RESEND_ACTIVATION_FAIL,

    REFRESH_SUCCESS,
    REFRESH_FAIL,

    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,

    LOGOUT,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
} from '../actions/types';

const initialState = {

    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),
    isAuthenticated: null,
    user: null,
    loading: false

};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {

        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: true
            }

        case REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: false
            }

        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAIL:

            localStorage.removeItem('access');
            localStorage.removeItem('refresh');

            return {
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null
            }

        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }

        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }

        case LOGIN_SUCCESS:
        case GOOGLE_AUTH_SUCCESS:
        case FACEBOOK_AUTH_SUCCESS:

            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);

            return {
                ...state,
                isAuthenticated: true,
                access: localStorage.getItem('access'),
                refresh: localStorage.getItem('refresh')
            }

        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:

        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:

        case EMAIL_RESET_SUCCESS:
        case EMAIL_RESET_FAIL:
        case EMAIL_RESET_CONFIRM_SUCCESS:
        case EMAIL_RESET_CONFIRM_FAIL:

        case RESEND_ACTIVATION_SUCCESS:
        case RESEND_ACTIVATION_FAIL:

        case DELETE_USER_FAIL:

            return {
                ...state
            }

        case REFRESH_SUCCESS:
            localStorage.setItem('access', payload.access);

            return {
                ...state,
                access: localStorage.getItem('access')
            }

        case SIGNUP_FAIL:
        case SIGNUP_SUCCESS:
        case GOOGLE_AUTH_FAIL:
        case FACEBOOK_AUTH_FAIL:
        case LOGIN_FAIL:
        case REFRESH_FAIL:
        case LOGOUT:

        case DELETE_USER_SUCCESS:

            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }

        default:
            return state
    }
};
