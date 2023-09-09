import React, {Fragment, useState} from 'react';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import {connect, useSelector} from 'react-redux';
import {login} from '../../actions/auth';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import googleImg from "./btn_google_signin_light.png"
import facebookImg from "./Continue with Fb Btn.PNG"


const Login = ({login, isAuthenticated, loading}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    // after login redirect to same page
    const navigate = useNavigate();
    const {state} = useLocation();


    const onSubmit = e => {
        e.preventDefault();
        // toast.success("You are login, Successfully.")
        login(email.toLowerCase(), password);

    };

    // Login with Google

    const continueWithGoogle = async () => {

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

            window.location.replace(res.data.authorization_url);

        } catch (err) {

        }
    };

    const continueWithFacebook = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    // If user is authenticated, redirect to home page

    if (isAuthenticated) {
        return <Navigate to={'/'}/>
    }

    // Bootstrap To handle the Form Validation

    // Example starter JavaScript for disabling form submissions
    // if there are invalid fields
    (function () {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
    })()

    // Style for horizontal line

    const h2 = {
        // "width": "100%",
        "textAlign": "center",
        "borderBottom": "1px solid",
        "lineHeight": "0.1em",
        "margin": "10px 0 20px"
    }

    const h2Span = {
        "background": "#fff",
        "padding": "0 20px"
    }

    return (

        <Fragment>

            <div className={"bg-light"}>

                <div className="container pt-2">

                    <h2 className={"text-center p-2 m-2"}>Sign In</h2>

                    <form onSubmit={e => onSubmit(e)}
                          className="row g-3 needs-validation" noValidate>

                        {/* 1. Email */}

                        <div className="col-md-4 offset-1 col-10">

                            <label htmlFor="validateEmail"
                                   className="form-label">
                                Email
                            </label>

                            <input type="email"
                                   className="form-control"
                                   id="validateEmail"
                                // placeholder='Email'
                                   name='email'
                                   value={email}
                                   onChange={e => onChange(e)}
                                   required/>
                            {/*<div className="valid-feedback">*/}
                            {/*    Looks good!*/}
                            {/*</div>*/}
                            <div className="invalid-feedback">
                                Please provide a email.
                            </div>
                        </div>

                        {/* 2. Password */}

                        <div className="col-md-4 offset-1 col-10">

                            <label htmlFor="validatePassword" className="form-label">
                                Password
                            </label>

                            <input type="password"
                                   className="form-control"
                                   id="validatePassword"
                                   name='password'
                                   value={password}
                                   onChange={e => onChange(e)}
                                   required
                                   autoComplete={"true"}/>
                            {/*<div className="valid-feedback">*/}
                            {/*    Looks good!*/}
                            {/*</div>*/}
                            <div className="invalid-feedback">
                                Please provide a password.
                            </div>
                        </div>

                        {/*  Forgot Password link  */}

                        <div className="text-center small">

                            <Link to={'/reset-password'}
                                  className="text-decoration-none
                               fw-normal">
                                Forgot Password?
                            </Link>
                        </div>

                        {/*  Submit  */}

                        {/* If clicked btn then disabled signin btn
                       & show spinner */}

                        {loading ? (

                            // spinner

                            <Fragment>
                                <div className="col-md-8 offset-1 col-10">

                                    <button className="btn btn-primary btn-lg" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status"
                                          aria-hidden="true"/> Sign In
                                    </button>
                                </div>

                            </Fragment>

                        ) : (
                            <div className="col-md-8 offset-1 col-10">

                                <button className="btn btn-lg btn-primary" type="submit">
                                    Sign In
                                </button>
                            </div>
                        )
                        }

                    </form>

                    {/*<hr className={"offset-1 col-md-10  col-10"} />*/}

                    <div className={"offset-1 col-md-10 col-10 pt-2"}>

                        <h2 className={"text-secondary"} style={h2}>
                            <span className={"text-dark"} style={h2Span}>
                           or</span>
                        </h2>

                    </div>

                    {/* Login with facebook & google */}
                    {/*// <div className={"text-center"}>*/}
                    {/*//*/}
                    {/*//     <button type="button" onClick={continueWithGoogle}*/}
                    {/*            className="btn btn-link">*/}
                    {/*        <img src={googleImg} width={"220px"} alt={"Continue with Google"}/>*/}
                    {/*    </button>*/}

                    {/*//     <button type="button" onClick={continueWithFacebook}*/}
                    {/*//             className="btn btn-link">*/}
                    {/*        <img src={facebookImg} width={"260px"} alt={"Continue with Google"}/>*/}
                    {/*    </button>*/}

                    {/*    /!*<button className="btn btn-primary btn-sm" onClick={continueWithFacebook}>*!/*/}
                    {/*    /!*    Continue With Facebook*!/*/}
                    {/*    /!*</button>*!/*/}
                    {/*</div>*/}

                    {/* SingUp Option */}

                    <h6 className={"text-center fw-normal p-3"}>

                        <span className="p-2 m-3">
                            Don't have an
                            account? <Link to="/signup"
                                           className="text-decoration-none">
                            Register </Link>
                        </span>

                    </h6>

                    <h6 className={"text-center fw-normal pb-3"}>

                        <span className="text-center">
                            Need help <Link to="/help"
                                            className="text-decoration-none">
                            Contact us </Link>
                        </span>
                    </h6>

                </div>
            </div>
        </Fragment>


    );
};

const mapStateToProps = state => ({

    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
});

export default connect(mapStateToProps, {login})(Login);
