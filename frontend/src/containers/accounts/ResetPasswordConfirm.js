import React, {Fragment, useState} from 'react';
import {Navigate, useMatch, useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {reset_password_confirm} from '../../actions/auth';
import {setAlert} from "../../actions/alert";
import {toast, ToastContainer} from "react-toastify";
import {useParams} from 'react-router-dom';


const ResetPasswordConfirm = ({reset_password_confirm, loading}) => {

    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
    });

    const {new_password, re_new_password} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    let match = useMatch('auth/users/password/reset/confirm/:uid/:token');

    const navigate = useNavigate()

    const uid = useParams()
    const token = useParams()

    const onSubmit = e => {
        e.preventDefault();

        // In older versions
        // const uid = match.params.uid
        // const token = match.params.token;

        reset_password_confirm(uid, token, new_password, re_new_password, navigate);


        // if (new_password !== re_new_password) {
        //     toast.error("Passwords didn't matched, Try again.",
        //         {position: "top-center"})
        //
        // } else {
        //     setAlert("Successfully, your password has been reset.",
        //         "success")
        //     reset_password_confirm(uid, token, new_password, re_new_password, navigate);
        // }

    };

    if (requestSent) {
        console.log("Password changed successfully")
        return <Navigate to='/login'/>
    }


    return (

        <div className="container mt-3">

            <div className="m-2 p-2">

                <h2 className={"text-center"}>
                    New password
                </h2>

            </div>

            <form onSubmit={e => onSubmit(e)}>

                <div className="offset-md-4 col-md-4 offset-1 col-10">

                    <label htmlFor="validatePassword" className="form-label">
                        Password
                    </label>

                    <input type="password"
                           className="form-control"
                           id="validatePassword"
                           name='new_password'
                           value={new_password}
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

                <br/>

                <div className="offset-md-4 col-md-4 offset-1 col-10">

                    <label htmlFor="validateConfirmPassword" className="form-label">
                        Confirm password
                    </label>

                    <input type="password"
                           className="form-control"
                           id="validateConfirmPassword"
                           name="re_new_password"
                           value={re_new_password}
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

                {loading ? (

                    <Fragment>

                        <div className="offset-md-4 offset-1 mt-3">
                            <button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status"
                                      aria-hidden="true"/> Reset password
                            </button>
                        </div>

                        {/*<div className="text-center mt-3">*/}
                        {/*    <div className="spinner-border" role="status">*/}
                        {/*        <span className="visually-hidden">Loading...</span>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                    </Fragment>
                ) : (

                    <button className="offset-md-4 offset-1 btn btn-primary mt-3"
                            type='submit'>
                        Reset password
                    </button>
                )
                }
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    loading: state.auth.loading
})

export default connect(mapStateToProps, {reset_password_confirm})(ResetPasswordConfirm);
