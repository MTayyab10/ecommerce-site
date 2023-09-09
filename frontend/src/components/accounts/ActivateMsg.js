import React from "react";
import {Link} from "react-router-dom";


export default function ActivateMsg() {

    return (

        <div className={""}>

            <div className={"offset-md-2 col-md-8"}>

                <div className={"container"}>

                    <div className={"text-center p-2"}>
                        <h2 className={"p-2 m-2"}>
                            Verify Account
                        </h2>
                    </div>

                    <div className="alert alert-success" role="alert">

                        {/*<h4 className="alert-heading">Thank you for Signup</h4>*/}

                        <div className={"text-center"}>

                            <p style={{"fontSize": "18px"}}>
                                Please check your email box to
                                <i> Activate Account</i>.
                            </p>
                            <hr/>

                            <p className="mb-0">
                                If you don't receive email please
                                check your spam/junk
                                box or <Link to={'#'} className={"text-decoration-none"}>
                                contact us</Link>.
                                {/* make sure you've entered the correct email addressed you */}
                                {/*/!*registered*!/ with and */}

                            </p>

                        </div>

                    </div>

                    {/*<button type="button" className="btn btn-primary">*/}
                    {/*Primary*/}
                    <Link to='/resend/activation'
                          className="btn btn-primary m-2">
                        Email again
                        {/*Send email again*/}
                    </Link>
                    {/*</button>*/}

                    <Link to='/login' className="btn btn-outline-primary m-2">
                        Login
                    </Link>

                    <Link to='/' className="btn btn-outline-secondary m-2">
                        Go to home
                    </Link>

                </div>
            </div>

        </div>

    )

}