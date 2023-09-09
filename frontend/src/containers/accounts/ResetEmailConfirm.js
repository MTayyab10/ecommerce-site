import React, {Fragment, useState} from 'react';
import {Navigate, useMatch, useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {reset_email_confirm} from '../../actions/auth';
import {setAlert} from "../../actions/alert";
import {toast, ToastContainer} from "react-toastify";


const ResetEmailConfirm = ({reset_email_confirm, loading}) => {

    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        new_email: '',
        re_new_email: '',
    });

    const {new_email, re_new_email} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    let match = useMatch('/email/reset/confirm/:uid/:token');

    const navigate = useNavigate()

    const onSubmit = e => {
        e.preventDefault();

        // const uid = this.props.match.params.uid;
        const uid = match.params.uid
        const token = match.params.token;

        reset_email_confirm(uid, token, new_email, re_new_email, navigate);

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
        console.log("Email changed successfully")
        return <Navigate to='/login'/>
    }


    return (

        <div className="container mt-3">

            <h2 className={"text-center p-3 m-3"}>
                New Email
            </h2>


            <form onSubmit={e => onSubmit(e)}>

                <div className="offset-md-4 col-md-4 offset-1 col-10">

                    <label htmlFor="validatePassword" className="form-label">
                        Email
                    </label>

                    <input type="email"
                           className="form-control"
                           id="validatePassword"
                           name='new_email'
                           value={new_email}
                           onChange={e => onChange(e)}
                           required
                           />
                    {/*<div className="valid-feedback">*/}
                    {/*    Looks good!*/}
                    {/*</div>*/}
                    <div className="invalid-feedback">
                        Please provide a email.
                    </div>
                </div>

                <br/>

                <div className="offset-md-4 col-md-4 offset-1 col-10">

                    <label htmlFor="validateConfirmPassword" className="form-label">
                        Confirm Email
                    </label>

                    <input type="email"
                           className="form-control"
                           id="validateConfirmPassword"
                           name="re_new_email"
                           value={re_new_email}
                           onChange={e => onChange(e)}
                           required
                           />
                    {/*<div className="valid-feedback">*/}
                    {/*    Looks good!*/}
                    {/*</div>*/}
                    <div className="invalid-feedback">
                        Please provide a email.
                    </div>
                </div>

                {loading ? (

                    <Fragment>

                        <div className="offset-md-4 offset-1 mt-4">
                            <button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status"
                                      aria-hidden="true"/> Reset Email
                            </button>
                        </div>

                        {/*<div className="text-center mt-3">*/}
                        {/*    <div className="spinner-border" role="status">*/}
                        {/*        <span className="visually-hidden">Loading...</span>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                    </Fragment>
                ) : (

                    <button className="offset-md-4 offset-1 btn btn-primary mt-4"
                            type='submit'>
                        Reset Email
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

export default connect(mapStateToProps, {reset_email_confirm})(ResetEmailConfirm);
