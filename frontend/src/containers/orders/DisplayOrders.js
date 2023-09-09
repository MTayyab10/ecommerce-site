import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";
import {get_orders, cancel_order, cancel_order1} from "../../actions/orders";
import {Link} from "react-router-dom";
import OrderAndOrderItem from "../../components/orders/OrderAndOrderItem"
import FilterOrdersBtn from "./FilterOrdersBtn"


const DisplayOrders = ({isAuthenticated,
                           order_items,
                           get_orders,
                           orders,
                           get_orders_loading,
                           cancel_order, cancel_order1 }) => {


    // Filter orders
    // This states doesn't work correctly below one is ok
    // const [order, setOrder] = useState(orders);

    const [order=orders, setOrder] = useState();

    // fetch orders from actions/orders.js
    useEffect(() => {
        get_orders();
        window.scrollTo(0, 0);

    }, [])

    // Filter orders by status
    // spread operator will display all the values from Order
    // while Set will only allow the single value
    // Display Order status in FilterOrderButtons.js

    const orderWithStatus = [...new Set(orders && true && true &&
        orders.map((order) => order.status))];

    // filter orders with status
    const filterOrders = (status) => {
        const newOrder = orders.filter((order) => {
            // console.log(order.status, " and ", status)
            return order.status === status;
        });
        setOrder(newOrder);
    };


    // Render all Order & OrderItem
    const ordersAndOrderItem = () => {
        return (
            <OrderAndOrderItem
                order={order}
                order_items={order_items}
                // for canceling orders
                cancel_order={cancel_order}
                cancel_order1={cancel_order1}
            />
        )
    }

    // Filter orders by status btn
    const filterOrderByStatus = () => {
        return (
            <FilterOrdersBtn
                orders={orders}
                orderWithStatus={orderWithStatus}
                filterOrders={filterOrders}
                setOrder={setOrder}

            />
        )
    }

    // if user is not authenticated
    const noAuth = (
        <div className='container mt-5 d-flex flex-column align-items-center'>
            <h1 className='mt-5'>Please login first.</h1>
            <p className='lead p-1'>
                To get access this page info.
            </p>

            <Link to='/login' className='btn btn-primary btn-lg m-2'>
                Login
            </Link>
        </div>
    )

    {/* Loading spinner  */}

    const orders_loading = (
        <div className="d-flex justify-content-center pt-3 pb-3">
            <div className="spinner-border text-primary mt-2 " role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )


    return (
        <div className={"bg-light"}>

            <div className={"container"}>

                {isAuthenticated && <h2 className="text-center p-3">
                    My orders {orders && true && true
                    && orders.length}
                </h2>}

                {isAuthenticated &&
                    orders && true && true &&
                    orders.length == 0 &&
                    <h3 className={"text-center p-4 m-4"}>You don't have orders.</h3>}

                {isAuthenticated &&
                    orders && true && true &&
                    orders.length !== 0 && filterOrderByStatus()}


                {isAuthenticated ?
                    get_orders_loading ?
                        orders_loading : ordersAndOrderItem() : noAuth}

            </div>
        </div>
    )
}


const mapStateToProps = state => ({

    isAuthenticated: state.auth.isAuthenticated,

    // first get orders loading
    get_orders_loading: state.orders.get_orders_loading,

    // get all orders
    orders: state.orders.orders,
    order_items: state.orders.order_items,
})

export default connect(mapStateToProps, {
    get_orders,
    cancel_order,
    cancel_order1
})(DisplayOrders)