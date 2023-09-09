import React, {Fragment, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {googleAuthenticate} from '../../actions/auth';
import queryString from 'query-string';

const Google = ({googleAuthenticate}) => {

    let location = useLocation();

    // after authenticate direct to Home
    let navigate = useNavigate()

    useEffect(() => {

        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            googleAuthenticate(state, code, navigate);
        }
    }, [location]);

    return (

        <Fragment>
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
                <h2>Please wait...</h2>
            </div>

        </Fragment>
    );
};

export default connect(null, {googleAuthenticate})(Google);
