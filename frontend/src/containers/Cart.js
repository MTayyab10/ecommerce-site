import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../actions/alert';


import {
    add_item,
    remove_item,
    update_item,
    get_items,
    get_item_total,
    get_total
} from '../actions/cart';

import CartItem from '../components/CartItem';
import FrequentlyAskedQuestions from "../components/FrequentlyAskedQuestions";

const Cart = ({
                  isAuthenticated,
                  items,
                  amount,
                  compare_amount,
                  total_items,
                  remove_item,
                  update_item,
                  get_items,
                  get_item_total,
                  get_total,
                  setAlert,
              }) => {
    const [render, setRender] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        add_item();
        get_items();
        get_item_total();
        get_total();
    }, [render]);

    // Breadcrumb

    const breadCrumb = (<nav aria-label="breadcrumb small" className="offset-md-1">

        <ol className="breadcrumb small">
            <li className="breadcrumb-item small">
                <Link className="text-decoration-none"
                      to="/">
                    Home
                </Link>
            </li>

            <li className="breadcrumb-item active small"
                aria-current="page">
                Cart
            </li>

        </ol>
    </nav>)

    // Items in cart

    const showItems = () => {
        return (
            <Fragment>
                {
                    items && true && true &&
                    items.length !== 0 &&
                    items.map((item, index) => {
                        let quantity = item.quantity;

                        return (
                            <Fragment key={index}>
                                <CartItem
                                    isAuthenticated={isAuthenticated}
                                    item={item}
                                    quantity={quantity}
                                    update_item={update_item}
                                    remove_item={remove_item}
                                    setAlert={setAlert}
                                    render={render}
                                    setRender={setRender}
                                />
                            </Fragment>
                        );
                    })
                }
            </Fragment>
        );
    };

    // If not have a single item show this one

    const emptyCart = (<div className="card shadow">
        <div className="card-header">
            Empty
        </div>
        <div className="card-body">
            {/*{#                    <h5 class="card-title">No Items</h5>#}*/}
            <p className="card-text">
                You do not have added any item yet.
                Please, first add items.
            </p>

            <Link to="/" className="btn btn-primary ">
                Buy items
            </Link>

            <a className={"ms-2 btn btn-outline-primary"}
               href={'https://www.maifast.com/cart'}>Refresh cart</a>

        </div>
    </div>)

    // Cart items and total + checkout btn

    const itemsCheckout = (
        <div className="card shadow ">
            <div className="card-body">
                <div className="row g-0">

                    <div className="p-2">

                        <h6 className="float-end small">
                            <Link className="text-decoration-none"
                                  to="/">
                                <i className="fa fa-chevron-left small"></i> shop
                                {/*/continue shop*/}
                            </Link>
                        </h6>

                    </div>

                    {/*{# <hr/>#}*/}

                    <div className="row ">

                        {/*  1 - Total items */}

                        <div className="row">

                            <div className="col">
                                <h6 className={"small"}>
                                    Total items
                                </h6>
                            </div>

                            <div className="col"
                                 style={{fontFamily: "sans-serif"}}>
                                <h6 className={"small"}>
                                    {total_items}
                                </h6>
                            </div>

                        </div>

                        {/* 2 Total cart price */}

                        <div className="row">
                            <div className="col">
                                <h6 className={"small"}>
                                    Total (Pkr)
                                </h6>
                            </div>
                            <div className="col"
                                 style={{fontFamily: "sans-serif"}}>
                                <h6 className={"small"}>
                                    Rs. {amount}
                                </h6>
                            </div>

                        </div>

                        {/*  3 Checkout */}

                        {/* If order amount is less than 700 then
                         show a msg */}

                        {amount < 700 &&

                            <div className={"row"}>
                                <div className={"col"}>
                                    <h6 className="small text-danger fw-bold">
                                        Order should not less than Rs. 700.
                                    </h6>
                                </div>
                            </div>
                        }

                        <div className="row">
                            <div className="col p-2 mb-1">

                                <div className="btn-group">

                                    {/* If amount is not >= 700 do not process order
                                    and show an alert */}

                                    {amount >= 700 ?

                                        <Link to="/checkout" className="me-3 me-sm-2">
                                            <button
                                                // style={{backgroundColor: "#FFD739"}}
                                                // className="btn btn-success"
                                                className={"btn btn-primary"}
                                            >
                                                {/*Proceed to*/}
                                                Checkout
                                            </button>
                                        </Link>

                                        :

                                        <Link to="#" className="me-3 me-sm-2">
                                            <button
                                                // style={{backgroundColor: "#FFD739"}}
                                                // className="btn btn-success"
                                                className={"btn disabled btn-primary"}
                                            >
                                                {/*Proceed to*/}
                                                Checkout
                                            </button>
                                        </Link>
                                    }

                                </div>
                            </div>

                            <div className="col p-2 mb-1 mt-1 small">
                                 <span className="small text-danger">
                                     <i>Delivery fee will add at checkout*</i>
                                 </span>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )

    // If not login show msg

    const noAuth = (
        <div className="mt-2 d-flex flex-column align-items-center">
            <h1 className='mt-3'>Please login first.</h1>
            <p className='lead p-1'>
                To get access this page info.
            </p>
            <Link to='/login' className='btn btn-primary btn-lg m-2'>
                Login
            </Link>
        </div>
    )

    // Cart items, price, other msgs & checkout btn

    const totalAndCheckout = () => {

        if (!isAuthenticated) {
            return (
                noAuth
            );

        } else if (total_items < 1) {
            return (
                emptyCart
            );

        } else {
            return (
                itemsCheckout
            )
        }

    }

    return (

        <div className="bg-light">
            <div className="container pt-3">

                <div className="text-center p-2 mb-1">
                    <h2>
                        <i className="fas fa-cart-plus"/> Cart
                    </h2>
                </div>

                {/* Simple breadcrumb */}

                {breadCrumb}

                {/*Cart items, if you have >= 1 then show card
                 otherwise no */}

                {total_items >= 1 &&

                    <div className="offset-md-1 col-md-9 col-12 mb-3">
                        <div className="card shadow">
                            <div className="card-body">

                                {showItems()}

                            </div>
                        </div>
                    </div>
                }

                {/*total items, price and checkout btn*/}

                <div className="row">
                    <div className="offset-md-1 col-md-9 col-12 mb-3">

                        {totalAndCheckout()}

                    </div>
                </div>

                {/* frequently asked questions */}

                <div className={"offset-md-1 col-md-9 col-12 mb-3"}>

                    <div className={"card shadow"}>
                        <FrequentlyAskedQuestions/>
                    </div>

                </div>

            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    items: state.cart.items,
    amount: state.cart.amount,
    compare_amount: state.cart.compare_amount,
    total_items: state.cart.total_items
});

export default connect(mapStateToProps, {
    remove_item,
    update_item,
    get_items,
    get_item_total,
    get_total,
    setAlert
})(Cart);
