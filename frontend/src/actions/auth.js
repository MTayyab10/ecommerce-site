import axios from 'axios';
import {setAlert} from './alert';
import {Navigate} from "react-router-dom";

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
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    RESEND_ACTIVATION_SUCCESS,
    RESEND_ACTIVATION_FAIL,

    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,

    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,

    REFRESH_SUCCESS,
    REFRESH_FAIL,

    LOGOUT,

    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    EMAIL_RESET_SUCCESS,
    EMAIL_RESET_FAIL,
    EMAIL_RESET_CONFIRM_SUCCESS,
    EMAIL_RESET_CONFIRM_FAIL
} from "./types";

import React from "react";

// Note: Add Redux DevTool to check the states
// Also using ModHeader chrome with JWT access token


// To check weather user is login or not

export const checkAuthenticated = () => async dispatch => {

    if (localStorage.getItem('access')) {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({token: localStorage.getItem('access')});

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS,
                });
                console.log("Auth Success ", res.status, res.statusText)

            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
                // console.log(res.data.code)

            }
        } catch (err) {

            dispatch({
                type: AUTHENTICATED_FAIL
            });
            console.log("Auth Fail ", err)
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
        // console.log("Error is here too")
    }
};


// function for getting user data

export const load_user = () => async dispatch => {

    if (localStorage.getItem('access')) {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
            console.log("User load success:", res.data)

        } catch (err) {

            dispatch({
                type: USER_LOADED_FAIL
            });

            console.log("User load fail: ", err.response.data)
        }

    } else {

        dispatch({
            type: USER_LOADED_FAIL,
        });
        console.log("User load fail")

    }
};


// User registration/signup

export const signup = (username, // first_name, last_name,
    email, password, re_password, navigate) => async dispatch =>  {

    // for showing loading
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        // first_name, last_name,
        username, email, password, re_password
    });

    // Check if both passwords are not correct show error

    if (password !== re_password) {

        dispatch({
            type: REMOVE_AUTH_LOADING
        });

        return dispatch(setAlert("Two password fields didn't match, try again.",
            "error"))
    }

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert("Your account has been created.",
            "success"))

        // For removing loading

        dispatch({
            type: REMOVE_AUTH_LOADING
        });

        // toast.success("User Signup Success");
        console.log("Signup Success: ", res)

        // If signup success then redirect to activate msg

        if (res.status === 201) {
            // return <Navigate to='/activate/sent'/>;
            return navigate('/activate/sent', {replace: true})
        }

    } catch (err) {

        dispatch({
            type: SIGNUP_FAIL,
        })

        // Try to show the user same error as HTTP give

        if (err.response.data) {

            // The request was made & server responded with status code
            // that falls out of the range of 2xx

            const usernameError = err.response.data.username
            const emailError = err.response.data.email
            const passwordError = err.response.data.password
            const otherError = err.response.data

            if (usernameError) {
                dispatch(setAlert("Please enter a short username. ", "error"))
                console.log("Username err: ", usernameError[0])
            }

            else if (emailError) {

                dispatch(setAlert(emailError[0], "error"))
                console.log("Email err: ", emailError[0])

            } else if (passwordError) {

                dispatch(setAlert(passwordError[0], "error"))
                console.log("Password err: ", err.response.data.password[0])

            } else if (otherError) {

                console.log("error after email/pass: ", err.response.data[0])

                dispatch(setAlert(err.response.data[0], "error"))

            } else {

                dispatch(setAlert("Something went wrong at err.resp, please try again.", "error"))

            }

            // just for understanding these four lines

            const statusCode = err.response.status
            const statusText = err.response.statusText
            // const msg = err.response.data.email[0]
            // const msg = err.response.data.password[0]

            console.log(`Error: statusCode - ${statusCode} statusText - ${statusText}`)
            console.log("Signup fail response: ", err.response)

            // dispatch(setAlert("Something went wrong, in err.response please try again.", "error"))

        } else if (err.request) {

            // The request was made but no response was received
            console.log("Request error: ", err.request)
            dispatch(setAlert("Something went wrong, please try again.", "error"))

        } else {

            // Something happened in setting up the request that triggered an Error
            console.log("Signup Error: ", err.response)
            dispatch(setAlert("Something went wrong, please try again.", "error"))
        }

        // dispatch(setAlert("Username/Email is already taken." +
        //     " Try another.", "error"))

        console.log("Signup Error: ", err.config);

        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    }

};


// For activate/verify account

export const verify = (uid, token, navigate) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({uid, token});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });

        dispatch(setAlert("Your account is activated, Please login.",
                "info")
        )

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        // If account activate success redirect to login page

        if (res.status === 204) {
            // return <Navigate to='/activate/sent'/>;
            return navigate("/login", {replace: true})
        }

        console.log("User is activated",)

    } catch (err) {

        dispatch({
            type: ACTIVATION_FAIL
        })

        dispatch(setAlert("Activation fails, Try again.", "error"))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        console.log(err.response.data)
        console.log("Activation fail error", err)
    }
};


// reset verification account

export const resend_verify = (email, navigate) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email})

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/resend_activation/`, body, config)

        dispatch({
            type: RESEND_ACTIVATION_SUCCESS
        })

        dispatch(setAlert("Resend Activation Success", "success"))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        if (res.status === 204) {
            // return <Navigate to='/activate/sent'/>;
            return navigate('/activate/sent', {replace: true})
        }

        console.log("Resend Activation Success", res.status);

    } catch (err) {

        dispatch({
            type: RESEND_ACTIVATION_FAIL,
        })

        dispatch(setAlert("Resent activation fail, Try again.", "error"))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        console.log(err.response.data)
        console.log("Error for Resend Activation", err)
    }
}


// signin/login user

export const login = (email, password) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(setAlert("You are login to our app.", "success"))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        console.log("Login Success", res.data)

        // after login user data will load
        dispatch(load_user())

    } catch (err) {

        dispatch({
            type: LOGIN_FAIL,
        })

        if (err.response.data) {

            const credentialError = err.response.data.detail

            if (credentialError) {

                dispatch(setAlert(credentialError, "error"))
                console.log("Credential err: ", credentialError)

            } else {
                dispatch(setAlert("Something went wrong, please try again.", "error"))
            }

            console.log("err res data: ", err.response.data)
            console.log("err res: ", err.response)

            // dispatch(setAlert("Invalid email or password. ", "error"))


        } else if (err.request) {

            console.log("err req: ", err.request)
            dispatch(setAlert("Something went wrong, please try again.", "error"))

        } else {

            console.log("login Error: ", err.response)
            dispatch(setAlert("Something went wrong, please try again.", "error"))
        }

        // dispatch(setAlert("Invalid Email/Password, Try again.", "error"))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        // console.log("Invalid Email or Password, Try again.");
        console.log("Login error end: ", err.config);
    }
};


// user can reset password

export const reset_password = (email, navigate) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS,
            payload: res.data,
        });

        dispatch(setAlert("Reset password email sent", "info"))
        console.log("Reset password success: ", res.data)

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        console.log("Reset password Success");

        if (res.status === 204) {
            // return <Navigate to='/activate/sent'/>;
            return navigate("/reset-password/sent", {replace: true})
        }

    } catch (err) {

        dispatch({
            type: PASSWORD_RESET_FAIL,
        });

        dispatch(setAlert("Reset password email fail, Try again.", "error"))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        // console.log(err.response.data.detail)
        console.log("Rest password email error: ", err)
    }
};


// user can set new password

export const reset_password_confirm = (uid, token, new_password,
                                       re_new_password, navigate) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({uid, token, new_password, re_new_password});

    if (new_password !== re_new_password) {

        dispatch({
            type: REMOVE_AUTH_LOADING
        });

        return dispatch(setAlert("Your passwords didn't matched, Try again.",
            "error"))
    }

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS,
        });

        dispatch(setAlert("Your Password has been reset.", "success"))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        console.log("Status code is: ", res.status)

        if (res.status === 204) {
            // return <Navigate to='/activate/sent'/>;
            return navigate("/login", {replace: true})
        }
        console.log("Password has been reset.")

    } catch (err) {

        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });

        dispatch(setAlert("Reset password failed, Try again.", 'error'))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        console.log(err.response.data.detail)
        console.log("Reset Password Fail", err)
    }
};


// user can set new email

export const reset_email = (email, navigate) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    console.log(email)

    const body = JSON.stringify({email});
    console.log("error json body", body)


    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_email/`, body, config);

        dispatch({
            type: EMAIL_RESET_SUCCESS
        });

        dispatch(setAlert("Reset email sent, successfully.", "info"))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        if (res.status === 204) {
            // return <Navigate to='/activate/sent'/>;
            return navigate("/reset-email/sent", {replace: true})
        }

        console.log("Reset email success");

    } catch (err) {

        dispatch({
            type: EMAIL_RESET_FAIL,
        });

        dispatch(setAlert("Reset email fail, Try again.", "error"))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        // console.log(err.response.data.detail)
        console.log("Error for rest email", err)
    }
}


// reset email confirm

export const reset_email_confirm = (uid, token, new_email,
                                       re_new_email, navigate) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({uid, token, new_email, re_new_email});

    console.log("error json body", body)

    // if (new_email !== re_new_email) {
    //
    //     dispatch({
    //         type: REMOVE_AUTH_LOADING
    //     });
    //
    //     return dispatch(setAlert("Your email didn't matched, Try again.",
    //         "error"))
    // }

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_email_confirm/`, body, config);

        dispatch({
            type: EMAIL_RESET_CONFIRM_SUCCESS,
        });

        dispatch(setAlert("Your email has been reset.", "success"))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        console.log("Status code is: ", res.status)

        if (res.status === 204) {
            // return <Navigate to='/activate/sent'/>;
            return navigate("/login", {replace: true})
        }
        console.log("Email has been reset.")

    } catch (err) {

        dispatch({
            type: EMAIL_RESET_CONFIRM_FAIL
        });

        dispatch(setAlert("Rest email failed, try again.", "error"))

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

        console.log("Error", err.response.data)
        console.log("Reset Email Fail", err)
    }
};


// auth with Google

export const googleAuthenticate = (state, code, navigate) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    });

    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`, config);

            if (res.status === 201) {

                dispatch({
                    type: GOOGLE_AUTH_SUCCESS,
                    payload: res.data
                });
                dispatch(load_user());

                dispatch({
                    type: REMOVE_AUTH_LOADING
                });

                dispatch(setAlert("Logged in successfully", "success"));

                return navigate("/", {replace: true})

            } else {

                dispatch({
                    type: GOOGLE_AUTH_FAIL
                });

                dispatch({
                    type: REMOVE_AUTH_LOADING
                });

                dispatch(setAlert("Error: Unable to login", "error"));
                console.log("Error while login")
            }

        } catch (err) {

            dispatch({
                type: GOOGLE_AUTH_FAIL
            });

            dispatch({
                type: REMOVE_AUTH_LOADING
            })

            dispatch(setAlert("Unable to login, Try again.", "error"))
            console.log("unable to login")
        }
    }
};


// auth with Facebook

export const facebookAuthenticate = (state, code, navigate) => async dispatch => {

    if (state && code && !localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const details = {
            'state': state,
            'code': code
        };

        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?${formBody}`, config);

            dispatch({
                type: FACEBOOK_AUTH_SUCCESS,
                payload: res.data
            });

            dispatch(load_user());

            dispatch(setAlert("Logged in Successfully", "success"))

            return navigate("/", {replace: true})

        } catch (err) {

            dispatch({
                type: FACEBOOK_AUTH_FAIL
            });

            dispatch(setAlert("Unable to login, Try again.", "error"))

        }
    }
};


// refresh token

export const refresh = () => async dispatch => {

    if (localStorage.getItem('refresh')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            refresh: localStorage.getItem('refresh')
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`, body, config);

            if (res.status === 200) {

                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res.data
                });

            } else {
                dispatch({
                    type: REFRESH_FAIL
                });
            }

        } catch (err) {

            dispatch({
                type: REFRESH_FAIL
            });
        }

    } else {

        dispatch({
            type: REFRESH_FAIL
        });
    }
};


// logout user

export const logout = () => dispatch => {

    dispatch({
        type: LOGOUT
    });

    dispatch(setAlert("You are logout, successfully", "info"))

    // toast.success("You are logout Successfully.",
    //     {position: "top-center"})
};


// Delete user with default Djoser method

// Helpful stackoverflow.com/questions/51069552/axios-delete-request-with-request-body-and-headers

export const delete_user = (current_password, navigate) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    })

    if (localStorage.getItem('access')) {

         const headers = {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            // 'Accept': 'application/json',
        }

        console.log("JWT local : ", localStorage.getItem('access'))

        const data = {
            current_password: current_password
        }

        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/auth/users/me/`, {headers, data });
            // const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/user/delete-account/`, config)

            dispatch({
                type: DELETE_USER_SUCCESS,
                payload: res.data
            });

            dispatch({
                type: REMOVE_AUTH_LOADING
            })

            dispatch(setAlert("Your account deleted, Successfully", "info"))
            console.log("user has deleted:", res.data)

            return navigate('/', {replace: true})

        } catch (err) {

            dispatch({
                type: DELETE_USER_FAIL
            });

            // dispatch(setAlert("User account delete failed, try again", "error"))

            if (err.response.data) {
                const msg = err.response.data.current_password[0]
                console.log("user deleted fail: ", msg)

                dispatch(setAlert(msg, "error"))

            } else {
                dispatch(setAlert("User account delete failed, try again", "error"))
            }

            // dispatch({
            //     type: REMOVE_AUTH_LOADING
            // })

            console.log("user deleted fail: ", err.response.data.current_password[0])
        }

    } else {

        dispatch(setAlert("User account delete failed, try again", "error"))

        dispatch({
            type: DELETE_USER_FAIL
        })
    }

    dispatch({
        type: REMOVE_AUTH_LOADING
    })
}


// delete user, with accounts0/views.py APIView

// export const delete_user = () => async dispatch => {
//
//     dispatch({
//         type: SET_AUTH_LOADING
//     })
//
//     // const body = JSON.stringify({current_password});
//
//     if (localStorage.getItem('access')) {
//
//         const config = {
//
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `JWT ${localStorage.getItem('access')}`,
//                 'Accept': 'application/json',
//             }
//         };
//
//         try {
//             // const res = await axios.delete(`${process.env.REACT_APP_API_URL}/auth/users/me/`, body, config);
//             const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/user/delete-account/`, config)
//
//             dispatch({
//                 type: DELETE_USER_SUCCESS,
//                 // payload: res.data
//             });
//
//             dispatch({
//                 type: REMOVE_AUTH_LOADING
//             })
//
//             dispatch(setAlert("Your account deleted, Successfully", "info"))
//             console.log("user has deleted:", res.data)
//
//             // return navigate('/', {replace: true})
//
//         } catch (err) {
//
//             dispatch({
//                 type: DELETE_USER_FAIL
//             });
//
//             dispatch(setAlert("User account delete failed, try again", "error"))
//
//             console.log("user deleted fail: ", err.response)
//
//         }
//
//     } else {
//
//         dispatch(setAlert("User account delete failed, try again", "error"))
//
//         dispatch({
//             type: DELETE_USER_FAIL
//         })
//     }
//
//     dispatch({
//         type: REMOVE_AUTH_LOADING
//     })
// }
