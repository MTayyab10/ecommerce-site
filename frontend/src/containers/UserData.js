import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import DisplayOrders from "./orders/DisplayOrders"
import DeliveryAddress from "./DeliveryAddress"
import UserPersonalInfo from "./UserPersonalInfo"
import FrequentlyAskedQuestions from "../components/FrequentlyAskedQuestions"
import ContactUs from "../components/ContactUs"
import HelpCenter from "../components/HelpCenter"
import Footer from "../components/Footer"


const UserData = ({isAuthenticated, user}) => {

    // on click render data by default show user info
    const [displayInfo, setDisplayInfo] = useState("user_info");


    // at the top display links for rendering data
    const linksForDisplayInfo = (<div className="row">
        <div className="offset-md-1 col-md-8 col-12 pt-1 pb-1">
            <ul className="list-inline pt-2 pb-2">

                {/* My info */}

                <li className="list-inline-item">
                    <button className={`btn btn-sm mt-2 rounded-pill
                         ${displayInfo === "user_info" ? "btn-primary" :
                        "bg-info text-primary bg-opacity-25 "}`}

                            onClick={() => setDisplayInfo('user_info')}
                    >
                        Personal info
                    </button>

                </li>

                {/* My orders */}

                <li className="list-inline-item">
                    <button className={`btn btn-sm mt-2 rounded-pill
                         ${displayInfo === "user_orders" ?
                        "btn-primary" :
                        "bg-info text-primary bg-opacity-25 "}`}

                            onClick={() => setDisplayInfo("user_orders")}
                    >
                        My orders
                    </button>
                </li>

                {/* Delivery address */}

                <li className="list-inline-item">
                    <button className={`btn btn-sm mt-2 rounded-pill
                         ${displayInfo === "delivery_address" ?
                        "btn-primary" :
                        "bg-info text-primary bg-opacity-25 "}`}
                            onClick={() => setDisplayInfo("delivery_address")}
                    >
                        Delivery address
                    </button>
                </li>

                {/* FAQ's */}

                <li className="list-inline-item">
                    <button className={`btn btn-sm mt-2 rounded-pill
                         ${displayInfo === "faq" ?
                        "btn-primary" :
                        "bg-info text-primary bg-opacity-25 "}`}

                            onClick={() => setDisplayInfo("faq")}
                    >
                        FAQ
                    </button>
                </li>

                {/* Contact */}

                {/*<li className="list-inline-item">*/}
                {/*    <button className={`btn btn-sm mt-2 rounded-pill*/}
                {/*         ${displayInfo === "help" ?*/}
                {/*        "btn-primary" :*/}
                {/*        "bg-info text-primary bg-opacity-25 "}`}*/}

                {/*            onClick={() => setDisplayInfo("contact")}*/}
                {/*    >*/}
                {/*        Contact*/}
                {/*    </button>*/}
                {/*</li>*/}

                {/* Help */}

                <li className="list-inline-item">
                    <button className={`btn btn-sm mt-2 rounded-pill
                         ${displayInfo === "help" ?
                        "btn-primary" :
                        "bg-info text-primary bg-opacity-25 "}`}

                            onClick={() => setDisplayInfo("help")}
                    >
                        Help
                    </button>

                </li>


            </ul>

        </div>

    </div>)


    // user personal info
    const userInfo = () => {
        return (
            <UserPersonalInfo />
        );
    };


    // show user's orders just get DisplayOrders.js here
    const userOrdersInfo = () => {
        return (
            <DisplayOrders/>
        );
    };

    // user's delivery address
    const userDeliveryAddressInfo = () => {
        return (
            <DeliveryAddress/>
        )
    }

    // faq
    const faq = () => {
        return (
            <FrequentlyAskedQuestions />
        )
    }

    // contact page
    const contact = () => {
        return (
            <ContactUs />
        )

    }

    // help center page
    const helpCenter = () => {
        return (
            <HelpCenter />
        )
    }

    const renderUserData = () => {

        if (displayInfo === "user_info") {
            return (
                userInfo()
            );

        } else if (displayInfo === "user_orders") {
            return (
                userOrdersInfo()
            );

        } else if (displayInfo === "delivery_address") {
            return (
                <Fragment>
                    <h2 className={"text-center p-3"}>
                        Delivery address
                    </h2>
                    {userDeliveryAddressInfo()}
                </Fragment>
            )

        } else if (displayInfo === "faq") {
            return (
                faq()
            )

        } else if (displayInfo === "contact") {
            return (
                contact()
            )
        } else if (displayInfo === "help") {
            return (
                helpCenter()
            )
        }
    };

    // If user is not login/auth

    const noAuth = (
        <div className="container mt-3 d-flex flex-column align-items-center">
            <h1 className="mt-5">Please login first.</h1>
            <p className="lead p-1">
                To get access this page info.
            </p>

            <Link to="/login" className="btn btn-primary btn-lg m-2">
                Login
            </Link>
        </div>
    )

    return (
        <div className={"bg-light"}>
            <div className="container pt-4 pb-5">

                {isAuthenticated ?

                    <Fragment>

                        <h3 className={"text-center pb-2 text-capitalize"}>
                            Hi, {user && true && true && user.username}
                        </h3>

                        {linksForDisplayInfo}

                        {renderUserData()}

                    </Fragment>
                    : noAuth
                }

            </div>

            {/* Site footer here */}

            <Footer />

        </div>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(UserData);