import React, {Fragment, useState, useEffect} from "react";
import {connect} from "react-redux";
import {get_specific_order} from "../../actions/orders";
import {Link, useParams} from "react-router-dom";
import facebookImg from "../accounts/Continue with Fb Btn.PNG"
import CheckoutItem from "../../components/CheckoutItem";
import moment from "moment";
import {CopyToClipboard} from "react-copy-to-clipboard";
import SpecificOrderAndOrderItem from "../../components/orders/SpecificOrderAndOrderItem"
import SpecificOrderMoreInfo from "../../components/orders/SpecificOrderMoreInfo"

const SpecificOrderDetail = ({
                                 isAuthenticated,
                                 specific_order,
                                 specific_order_items,
                                 get_specific_order
                             }) => {

    // get order id
    const {id} = useParams();

    // API call fetch orders from actions/orders.js
    useEffect(() => {

        get_specific_order(id);
        window.scrollTo(0, 0);
    }, [id])


    // Order delivery address
    const deliveryOrderInfo = () => {

        return (
            <Fragment>

                {specific_order && true && true &&
                    // specific_order.address != null &&
                    <div className={"offset-md-2 col-md-8 " +
                        "col-12 mt-2 mb-2"}>

                        <ul className="list-inline ps-1">

                            <li className="list-inline-item">
                                <i className="fas fa-map-marker-alt
                                     text-secondary"/> {specific_order.address != null ?
                                specific_order.address.name : specific_order.name}

                            </li>
                            <li className="list-inline-item">
                                {/*{specific_order.address.mobile}*/}
                                {specific_order.address != null ?
                                    specific_order.address.mobile : specific_order.mobile}
                            </li>
                            <li className="list-inline-item">
                                {specific_order.address != null ?
                                    <>
                                        {specific_order.address.city}, {specific_order.address.address}
                                    </>
                                    :
                                    <>
                                        {specific_order.city}, {specific_order.delivery_address}
                                    </>
                                }
                                {/*{specific_order.address.city} {specific_order.address.address}*/}
                            </li>

                        </ul>

                        {/* If order status is not completed */}

                        {specific_order && true && true &&
                            specific_order.address != null &&
                            specific_order.status !== "delivered" &&

                            // <Link to={`/update_address/${specific_order.address.id}`}
                            //       className="mb-2 mt-0 pt-0 text-decoration-none">
                            //     Change address
                            // </Link>
                            <Link to={`/update_address/${specific_order.address.id}`}
                                  className="link-primary small mt-1
                                       text-decoration-none ps-1">
                                <i className="far fa-edit"></i> Change
                            </Link>
                        }

                    </div>
                }
            </Fragment>
        )
    }


    // Order items & price breakdown
    const renderOrderItemsAndPrice = () => (<div className="offset-md-2 col-md-8 col-12 pt-3">
        <div className="card shadow">

            <h5 className="card-header">
                {specific_order && true && true &&
                    specific_order.status} (show status)
                <span className="float-end">
                    <Link className="btn btn-dark btn-sm"
                          to="/my_orders">
                        <i className="fa fa-chevron-left small"/> orders
                        {/*back to orders */}
                    </Link>
                </span>
            </h5>

            {/* Order items & price breakdown*/}

            <SpecificOrderAndOrderItem
                specific_order={specific_order}
                specific_order_items={specific_order_items}
            />

        </div>
    </div>)


    // Order Info like unique I'd, status, created date etc
    const moreOrderInfo = (
        <SpecificOrderMoreInfo
            specific_order={specific_order}
        />
    )

    // if user is not authenticated
    const noAuth = (
        <div className="mt-5 mb-3 d-flex flex-column align-items-center">
            <h1 className="mt-5">Please login first.</h1>
            <p className="lead p-1">
                To get access this page info.
            </p>

            <Link to='/login' className='btn btn-primary btn-lg m-2'>
                Login
            </Link>
        </div>
    )

    // links like cancel order, contact shop/sell etx

    const usefulLinks = (<div className="offset-md-2 col-md-8 col-12">
        <div className="card shadow">
            <div className="card-body">


                <a href={`tel:18519204393`}
                    // onClick={() => reset_email()}
                   className="btn btn-sm btn-outline-primary rounded-pill">
                    Call seller
                </a>

                <button className="btn btn-sm btn-outline-secondary rounded-pill m-2">
                    Need help <i className="fas fa-headset"></i>
                </button>

                <button data-bs-toggle="modal" data-bs-target="#deleteModal"
                        id="#deleteModal"
                        className="btn btn-sm rounded-pill btn-outline-danger">
                    Cancel order
                </button>
            </div>
        </div>

        <br/>

    </div>)

    const renderAllData = () => {
        if (isAuthenticated) {
            return (
                <Fragment>
                    {deliveryOrderInfo()}

                    {renderOrderItemsAndPrice()}

                    {moreOrderInfo}

                    {usefulLinks}
                </Fragment>
            )
        } else {
            return noAuth
        }
    }

    return (
        <Fragment>

            <div className={"bg-light"}>

                {isAuthenticated &&

                    <div className="text-center p-3">
                        <h2> Order detail </h2>
                        {/* add 30-32 minutes after created order */}
                        <p className={"text-success"}>
                            Delivery about at
                            <b> {moment(specific_order && true && true &&
                                specific_order.created_date).add(30, 'minutes').format("HH:mm A")}
                            </b>
                        </p>
                    </div>
                }

                <div className={"container"}>
                    <div className={"row"}>

                        {renderAllData()}

                    </div>
                </div>

            </div>

        </Fragment>
    )

}

// For more info just for reference
// github.com/MTayyab10/shop_time/blob/main/frontend/src/containers/OrderItemDetail.js

const mapStateToProps = state => ({

    isAuthenticated: state.auth.isAuthenticated,

    specific_order: state.orders.specific_order,
    specific_order_items: state.orders.specific_order_items
})

export default connect(mapStateToProps, {
    get_specific_order
})(SpecificOrderDetail)
