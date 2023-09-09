import React, {Fragment, useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {connect, useDispatch, useSelector} from 'react-redux';
import {signup} from '../../actions/auth';
import axios from 'axios';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {setAlert} from "../../actions/alert";
import googleImg from "./btn_google_signin_light.png";
import facebookImg from "./Continue with Fb Btn.PNG"


const Signup = ({signup, isAuthenticated, loading}) => {

    const [accountCreated, setAccountCreated] = useState(false);

    const [formData, setFormData] = useState({
        // first_name: '',
        // last_name: '',
        username: '',
        email: '',
        password: '',
        re_password: '',
    });

    const { // first_name, last_name,
        username, email, password, re_password
    } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const navigate = useNavigate();

    const onSubmit = e => {

        e.preventDefault();

        // here email.toLower to handle create account with same email
        // at the backend email normalize lower in accounts0/models.py

        signup(
            // first_name, last_name,
            username, email.toLowerCase(), password, re_password, navigate);
        setAccountCreated(true)

        // if (password !== re_password) {
        //     toast.error("Passwords didn't matched, Try again.",
        //         {position: "top-center"})
        //
        // } else {
        //     signup(first_name, last_name, email, password, re_password, navigate);
        //     setAccountCreated(true)
        //     // return <Navigate to='/activate/sent'/>
        // }
    };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=http://localhost:8000/google`)

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

    if (isAuthenticated) {
        return <Navigate to='/'/>
    }

    // if (accountCreated) {
    //     return <Navigate to='/activate/sent' />
    // }

    // Bootstrap To handle the Form Validation

    // Example starter JavaScript for disabling form submissions
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

                    <h2 className={"text-center p-2"}>Register</h2>

                    <form onSubmit={e => onSubmit(e)}
                          className="row g-3 needs-validation" noValidate>

                        {/* Username */}

                        <div className="col-md-4 offset-1 col-10">

                            <label htmlFor="validateUsername"
                                   className="form-label">
                                Username
                            </label>

                            <input type="text"
                                   className="form-control"
                                   id="validateUsername"
                                // placeholder='Email'
                                   name="username"
                                   value={username}
                                   onChange={e => onChange(e)}
                                   required/>
                            {/*<div className="valid-feedback">*/}
                            {/*    Looks good!*/}
                            {/*</div>*/}
                            <div className="invalid-feedback">
                                Please provide a name.
                            </div>
                        </div>


                        {/* 1. First name */}

                        {/*<div className="col-md-4 offset-1 col-10">*/}

                        {/*    <label htmlFor="validateFirstName"*/}
                        {/*           className="form-label">*/}
                        {/*        First Name*/}
                        {/*    </label>*/}

                        {/*    <input type="text"*/}
                        {/*           className="form-control"*/}
                        {/*           id="validateFirstName"*/}
                        {/*        // placeholder='Email'*/}
                        {/*           name="first_name"*/}
                        {/*           value={first_name}*/}
                        {/*           onChange={e => onChange(e)}*/}
                        {/*           required/>*/}
                        {/*    /!*<div className="valid-feedback">*!/*/}
                        {/*    /!*    Looks good!*!/*/}
                        {/*    /!*</div>*!/*/}
                        {/*    <div className="invalid-feedback">*/}
                        {/*        Please provide a name.*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/* 2. Last name */}

                        {/*<div className="col-md-4 offset-1 col-10">*/}

                        {/*    <label htmlFor="validateLastName"*/}
                        {/*           className="form-label">*/}
                        {/*        Last Name*/}
                        {/*    </label>*/}

                        {/*    <input type="text"*/}
                        {/*           className="form-control"*/}
                        {/*           id="validateLastName"*/}
                        {/*        // placeholder='Email'*/}
                        {/*           name="last_name"*/}
                        {/*           value={last_name}*/}
                        {/*           onChange={e => onChange(e)}*/}
                        {/*           required/>*/}
                        {/*    /!*<div className="valid-feedback">*!/*/}
                        {/*    /!*    Looks good!*!/*/}
                        {/*    /!*</div>*!/*/}
                        {/*    <div className="invalid-feedback">*/}
                        {/*        Please provide a name.*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/* 3. Email */}

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

                        {/* 4. Password */}

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
                                   minLength='6'
                                   autoComplete={"true"}/>
                            {/*<div className="valid-feedback">*/}
                            {/*    Looks good!*/}
                            {/*</div>*/}
                            <div className="invalid-feedback">
                                Please provide a password.
                            </div>
                        </div>

                        {/* 5. confirm password */}

                        <div className="col-md-4 offset-1 col-10">

                            <label htmlFor="validateConfirmPassword" className="form-label">
                                Confirm Password
                            </label>

                            <input type="password"
                                   className="form-control"
                                   id="validateConfirmPassword"
                                   name="re_password"
                                   value={re_password}
                                   onChange={e => onChange(e)}
                                   required
                                   minLength='6'
                                   autoComplete={"true"}/>
                            {/*<div className="valid-feedback">*/}
                            {/*    Looks good!*/}
                            {/*</div>*/}
                            <div className="invalid-feedback">
                                Please provide a password.
                            </div>
                        </div>

                        {/*  Submit  */}

                        {/* If clicked btn then remove register btn
                 and show spinner */}

                        {loading ? (

                            <Fragment>
                                <div className="col-md-8 offset-1 col-10">

                                    <button className="btn btn-primary btn-lg mt-3" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status"
                                      aria-hidden="true"/> Signup
                                    </button>

                                </div>

                                {/*simple black spinner*/}

                                {/*<div className="text-center">*/}
                                {/*    <div className="spinner-border" role="status">*/}
                                {/*        <span className="visually-hidden">Loading...</span>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </Fragment>

                        ) : (
                            <div className="col-md-8 offset-1 col-10">

                                <button className="btn btn-lg btn-primary mt-3" type="submit">
                                    Signup
                                </button>
                            </div>
                        )
                        }

                    </form>

                    {/*// Horizontal line*/}

                    <div className={"offset-1 col-md-10 col-10 pt-2"}>

                        <h2 className={"text-secondary"} style={h2}>

                    <span className={"text-dark"} style={h2Span}>
                       or
                    </span>
                        </h2>

                    </div>

                    {/* Signup with social media */}

                    {/*<div className={"text-center"}>*/}

                    {/*    <button type="button" onClick={continueWithGoogle}*/}
                    {/*            className="btn btn-link">*/}
                    {/*        <img src={googleImg} width={"220px"} alt={"Continue with Google"}/>*/}
                    {/*    </button>*/}

                    {/*    <button type="button" onClick={continueWithFacebook}*/}
                    {/*            className="btn btn-link">*/}
                    {/*        <img src={facebookImg} width={"260px"} alt={"Continue with Google"}/>*/}
                    {/*    </button>*/}

                    {/*</div>*/}

                    {/* SingIn Option */}

                    <h6 className={"text-center fw-normal p-3"}>

                <span className="p-2 m-3">
                    Already have an
                    account? <Link to="/login"
                                   className="text-decoration-none">
                    Login </Link>
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
    loading: state.auth.loading
});

export default connect(mapStateToProps, {signup})(Signup);