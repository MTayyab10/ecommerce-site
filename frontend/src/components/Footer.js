import React from "react";
import {Link} from "react-router-dom";

const Footer = () => {

    const siteFooter = (<footer className="bg-light ">
        <div className="container pt-4">
            <div className="row">

                <div className="col-lg-4">

                    <h6 className="text-secondary mb-3 small">Follow us</h6>
                    <ul className="list-inline">

                        <li className="list-inline-item">
                            <a href="#" title={"Follow us on Facebook"}
                               className={"btn btn-sm btn-primary rounded-pill"}>
                                <i className="fab fa-facebook"></i>
                            </a>
                        </li>

                        <li className="list-inline-item">
                            <a href="#" title={"Follow us on YouTube"}
                               className={"btn btn-sm btn-primary rounded-pill"}>
                                <i className="fab fa-youtube"></i>
                            </a>
                        </li>

                           <li className="list-inline-item">
                            <a href="#" title={"Follow us on Twitter"}
                               className={"btn btn-sm btn-primary rounded-pill"}>
                                <i className="fab fa-twitter"></i>
                            </a>
                        </li>


                    </ul>
                </div>

                <div className="col-lg-8 ml-auto">
                    <div className="row">

                        <div className="col-lg-6">
                            <h6 className="text-secondary mb-2 small">Company</h6>
                            <ul className="list-unstyled">
                                <li className={"small text-muted mb-1"}>
                                    <Link to={'/'}
                                          className={"text-decoration-none text-reset"}>
                                        About us
                                    </Link>
                                </li>

                                <li className={"small text-muted mb-1"}>
                                    <Link to={'/help'}
                                          className={" text-decoration-none text-reset"}>
                                        Need help
                                    </Link>
                                </li>

                            </ul>
                        </div>

                        <div className="col-lg-6">
                            <h6 className="text-secondary mb-2 small">Resources</h6>

                            <ul className="list-unstyled">
                                <li className={"small text-muted mb-1"}>
                                    <Link to={'/terms_of_use'}
                                          className={" text-decoration-none text-reset"}>
                                        Terms of use
                                    </Link>
                                </li>

                                <li className={"small text-muted"}>
                                    <Link to={'/privacy_policy'}
                                          className={" text-decoration-none text-reset"}>
                                        Privacy policy
                                    </Link>
                                </li>

                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            <div className="row text-center mb-0">
                <div className="col-md-12">
                    <div className="border-top pt-2 pb-1">
                        <p>
                            MaiFast &copy; {(new Date().getFullYear())}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>)

    return (
        siteFooter
    )
}

export default Footer;