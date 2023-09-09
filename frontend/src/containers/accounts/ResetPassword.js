import React, {Fragment, useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {reset_password} from '../../actions/auth';

const ResetPassword = ({reset_password, loading}) => {

    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        email: ''
    });

    const {email} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const navigate = useNavigate()

    const onSubmit = e => {
        e.preventDefault();
        reset_password(email.toLowerCase(), navigate);
        setRequestSent(true);
    };

    // if (requestSent) {
    //     return <Navigate to='/reset-password/sent'/>
    // }


    return (
        <div className="container">
            <div className="row">

                <div className="offset-md-3 col-md-6 offset-1 col-10">

                    <div className="p-2 m-2 text-center">
                        <h2>Forgot Password</h2>
                        {/*<i className="lead">*/}
                        {/*    Enter your email address and send.*/}
                        {/*</i>*/}
                    </div>

                    <form onSubmit={e => onSubmit(e)} className="p-2">
                        <div className='form-group'>

                            <label className="form-label" htmlFor="email">
                                Registered email:
                            </label>

                            <input
                                className='form-control'
                                type='email'
                                placeholder='example@gmail.com'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                                required
                            />
                        </div>

                        {loading ? (

                            <Fragment>

                                <button className="btn btn-primary btn-lg mt-4" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status"
                                          aria-hidden="true"/> Send
                                </button>

                                {/*    <div className="text-center mt-3">*/}
                                {/*    <div className="spinner-border" role="status">*/}
                                {/*        <span className="visually-hidden">Loading...</span>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </Fragment>

                        ) : (
                            <button type={"submit"} className="btn btn-lg btn-primary mt-4 ">
                                Send
                            </button>
                            // <input type="submit" value="Send"
                            //        className="btn btn-lg btn-primary mt-4 "/>
                        )
                        }

                    </form>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    loading: state.auth.loading
})

export default connect(mapStateToProps, {reset_password})(ResetPassword);
