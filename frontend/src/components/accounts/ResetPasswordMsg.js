import React, {Fragment} from "react";
import {Link} from "react-router-dom";


export default function ResetPasswordMsg() {

    return (

        <Fragment >

            <div className={"offset-md-2 col-md-8"}>

                {/*<div className="alert alert-info alert-dismissible*/}
                {/*fade show p-2 text-center" role="alert">*/}

                {/*    Email Sent Successfully*/}

                {/*    <button type="button" className="btn-close small pt-4 pb-2" data-bs-dismiss="alert"*/}
                {/*            aria-label="Close"/>*/}
                {/*</div>*/}

                <div className={"container text-center"}>

                    <h2 className={"p-2 m-2"}>Password Reset</h2>

                    <div className="alert alert-warning" role="alert">
                        {/*<h4 className="alert-heading">Well done!</h4>*/}
                        <p>
                            {/*We've emailed you for*/}
                            {/*/!*instructions*!/*/}
                            {/*<i>Password Reset</i>,*/}
                            If an account exists with the email
                            you entered. You should receive a email, shortly.
                        </p>
                        <hr/>
                        <p className="mb-0">
                            If you don't receive any email please
                            check your spam/junk
                            box or <Link to={'#'} className={"text-decoration-none"}>
                            contact us</Link>.
                            {/* make sure you've entered the correct email addressed you */}
                            {/*/!*registered*!/ with and */}

                        </p>
                    </div>

                    <Link to='/reset-password'
                          className="btn btn-primary m-3">
                        Email again
                    </Link>
                    {/*</button>*/}

                    <Link to='/' className="btn btn-outline-secondary">
                        Go to home
                    </Link>

                </div>
            </div>

        </Fragment>
    )

}