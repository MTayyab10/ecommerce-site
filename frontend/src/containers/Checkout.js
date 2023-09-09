import React, {Fragment, useState, useEffect} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import moment from "moment";
import {refresh} from "../actions/auth";
import FrequentlyAskedQuestions from "../components/FrequentlyAskedQuestions"

import {
    get_item_total,
    get_items,
    get_total
} from "../actions/cart";

import {
    get_total_price,
    create_order,
} from '../actions/orders';

import CheckoutItem from "../components/CheckoutItem";
import DeliveryAddress from "./DeliveryAddress"


const Checkout = ({
                      isAuthenticated,
                      user,
                      refresh,
                      items,
                      total_items,
                      create_order_loading,
                      create_order,
                      get_total_price,
                      sub_total,
                      delivery_fee,
                      service_fee,
                      total_amount,
                      get_item_total,
                      get_items,
                      get_total
                  }) => {


    const [render, setRender] = useState(false);

    useEffect(() => {

        refresh();
        // get_delivery_address();
        // total price for items
        get_total_price();

        get_item_total();
        get_items();
        get_total();

        window.scrollTo(0, 0);

    }, []);


    // show delivery address & new delivery addr form

    const displayDeliveryAddress = (
        <div className="col-md-6 col-12 pt-2">
            <div className="card shadow">
                {/*<div className={"card-body"}>*/}
                <div className="pt-2 pb-1">

                    <DeliveryAddress/>

                </div>
            </div>
        </div>
    )

    // After creating order redirect to desired page
    const navigate = useNavigate();


    // show order items, price info
    const orderSummary = () => {
        return (<Fragment>
            {items && true && true
                && items.length !== 0 &&
                items.map((item, index) => {
                    let quantity = item.quantity;

                    return (<Fragment key={index}>
                            <CheckoutItem
                                item={item}
                                quantity={quantity}
                            />
                        </Fragment>

                    );
                })}
        </Fragment>);
    };


    // Loading & Place an Order btn
    const placeOrderBtn = (
        create_order_loading ?
            <button className="btn btn-success disabled" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status"
                      aria-hidden="true"/> Place an Order </button>
            :
            // if total amount is less than 500 then do not create
            // order
            sub_total >= 700 ?

                <button
                    onClick={() => create_order(navigate)}
                    type="button" className="btn btn-success">
                    Place an Order
                </button>
                :
                <button
                    type="button" className="btn btn-success disabled">
                    Place an Order
                </button>
    )


    // If auth user, show order items, price info etc

    const renderOrderItemsAndPrice = (<div className="col-md-6 col-12 pt-2">
        <div className="card shadow">

            <h5 className="card-header">
                Order summary
                <span className="float-end">
                    <Link className="btn btn-dark btn-sm"
                          to="/cart">
                        <i className="fa fa-chevron-left small"/> cart
                        {/*return to cart*/}
                    </Link>
                </span>
            </h5>

            {orderSummary()}

            {/* price breakdown & create an order btn*/}

            <div className="card-body">

                {/*  2 - subtotal  */}

                <div className="row">

                    <div className="col small">
                        <h6 className="small">Sub-total</h6>
                    </div>

                    <div className="col small">
                        <h6 className="small">
                            Rs. {sub_total}
                            {/*{{order.cart_total}}*/}
                        </h6>
                    </div>

                </div>

                {/* 3 - delivery fee  */}

                <div className="row">

                    <div className="col small">
                        <h6 className="small">Delivery fee</h6>
                    </div>

                    <div className="col small">
                        <h6 className="small">
                            Rs. {delivery_fee}
                            {/*{{order.delivery_charges}}*/}
                        </h6>
                    </div>

                </div>

                {/* 4 - service fee  */}

                {/*// <div className="row">*/}
                {/*//*/}
                {/*    <div className="col">*/}
                {/*        <h6 className="small">Service fee</h6>*/}
                {/*    </div>*/}

                {/*    <div className="col">*/}
                {/*        <h6 className="small">*/}
                {/*            Rs. {service_fee}*/}
                {/*        </h6>*/}
                {/*    </div>*/}

                {/*</div>*/}

                <hr className="pt-0 mt-0"/>

                {/* 4 - All total charges */}

                <div className="row">

                    <div className="col">
                        <h6 className="fw-bolder small">
                            Total (Pkr)
                        </h6>
                    </div>

                    <div className="col">
                        <h6 className="fw-bolder small">
                            Rs. {total_amount}
                        </h6>
                    </div>

                </div>

                {/* If sub_total > 700 then show Payment (COD) otherwise
                 show a alert msg for */}

                {sub_total >= 700 ?

                    <div className="col mb-1">
                      <span className="small fw-bolder text-danger">
                        <i>Payment: Cash on Delivery(COD)*</i>
                      </span>
                    </div>
                    :
                    <div className={"row"}>
                        <div className={"col"}>
                            <h6 className="small text-danger fw-bold">
                                Order should not less than Rs. 700
                            </h6>
                        </div>
                    </div>
                }

                {/* If order amount is less than 700 then
                         show a msg */}


                {/* create an order btn */}

                {placeOrderBtn}

            </div>

        </div>
    </div>)

    // If user is not login
    const noAuth = (<div className="mt-2 mb-3 d-flex flex-column align-items-center">
        <h1 className="mt-5">Please login first.</h1>
        <p className="lead p-1">
            To get access this page info.
        </p>
        <Link to="/login" className="btn btn-primary btn-lg m-2 ">
            Login
        </Link>
    </div>)


    // If user not have a single item show this msg
    const emptyCart = (<div className={"row pt-4"}>
        <div className={"col-12"}>
            <div className="card shadow">
                <div className="card-header">
                    Empty
                </div>
                <div className="card-body">
                    {/*{#                    <h5 class="card-title">No Items</h5>#}*/}
                    <p className="card-text">
                        You do not have added any item yet.
                        Please, first add items.
                    </p>
                    <Link to="/" className="btn btn-primary">
                        Buy items
                    </Link>
                </div>
            </div>
        </div>
    </div>)


    // If auth user & have items
    // then renderOrderItemsAndPrice component

    const renderAllData = () => {

        if (!isAuthenticated) {
            return (noAuth);

        } else if (total_items < 1) {
            return (emptyCart);

        } else {
            return (renderOrderItemsAndPrice)
        }

    }

    {/* frequently asked questions */
    }

    const faq = () => (

        <div className={"pt-4 pb-3"}>
            <div className={"card shadow"}>
                <FrequentlyAskedQuestions/>
            </div>
        </div>
    )

    return (

        <Fragment>

            <div className={"bg-light"}>

                {isAuthenticated &&

                    <div className="text-center pt-3 ">
                        {/*<h2>Checkout</h2>*/}

                        <i className="text-secondary">
                            <i className="fas fa-truck"></i> Deliver
                            at about {moment().add(15, 'minutes').format("HH:mm A")}
                            <span id="time"></span>

                        </i>

                    </div>}


                <div className={"container"}>
                    <div className={"row pt-3"}>

                        {/* display existing address or add new */}

                        {isAuthenticated &&
                            total_items >= 1 &&
                            displayDeliveryAddress}


                        {/* render all items & price + order btn */}

                        {renderAllData()}

                        {/* frequently asked questions */}

                        {faq()}

                    </div>
                </div>
            </div>


        </Fragment>)
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,

    // items in cart
    items: state.cart.items,
    total_items: state.cart.total_items, // amount: state.cart.amount,

    // Get price info from reducers/orders.js
    sub_total: state.orders.sub_total,
    delivery_fee: state.orders.delivery_fee,
    service_fee: state.orders.service_fee,
    total_amount: state.orders.total_amount,

    create_order_loading: state.orders.create_order_loading
});

export default connect(mapStateToProps, {
    refresh,

    get_total_price,
    create_order,

    // after creating order update cart
    get_items,
    get_item_total,
    get_total,
})(Checkout);
