import React, {useEffect} from 'react';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {facebookAuthenticate} from '../../actions/auth';
import queryString from 'query-string';

const Facebook = ({facebookAuthenticate, isAuthenticated}) => {
    let location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {

        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            facebookAuthenticate(state, code, navigate);
        }
    }, [location]);

    // if user is authenticated then redirect to home

    if (isAuthenticated){
        return <Navigate to={'/'} />
    }


    return (

        <>
            <div className='mt-5 d-flex justify-content-center align-items-center'>
                <div className="text-center">
                    <div style={{"height": "3rem", "width": "3rem"}}
                         className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>

            </div>

            <br/>

            <div className={"mt-2 text-center"}>
                <h2>Please wait ...</h2>
            </div>

        </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {facebookAuthenticate})(Facebook);
