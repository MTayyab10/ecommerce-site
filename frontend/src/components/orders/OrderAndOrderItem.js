import {Link} from "react-router-dom";
import moment from "moment";
import React, {Fragment} from "react";
import facebookImg from "../../containers/accounts/Continue with Fb Btn.PNG";
import CancelOrder from "./CancelOrder"

const OrderAndOrderItem = ({ // destructuring props
                               order,
                               order_items,
                               cancel_order, cancel_order1
                           }) => {


    // render Order & OrderItems


    return (
        <div className="row">

            {order && true && true &&
                order.map((order) => (

                    <Fragment key={order.id}>

                        <div className="offset-md-1 col-md-9 col-12 mb-2">

                            <div className="card shadow">

                                <h6 className="card-header small">

                                    {/*/!*{% if order.complete %}*!/*/}

                                    {/*<i className="fas fa-check-circle text-success me-1"></i>*/}

                                    {/*/!*{% endif %}*!/*/}

                                    {moment(order.created_date).format("MMMM Do, YYYY, h:mm a")}

                                    <span className="float-end">
                                        <Link className="text-decoration-none"
                                              to={`/order/${order.id}`}>
                                            more info <i className="fa fa-chevron-right small"/>
                                            {/*return to cart*/}
                                        </Link>
                                    </span>

                                </h6>

                                {/* OrderItems, price & import. links*/}

                                <div className="card-body">

                                    {/* 1 - Order Items  */}

                                    <Link
                                        // to={`/order/${order.id}`}
                                        to={{
                                            pathname: `/order/${order.id}`,
                                            state: {order}
                                        }}
                                        className="text-decoration-none text-reset">

                                        <div className="row small">

                                            {order_items && true && true &&
                                                order_items.map((item) => (
                                                    (item.order.id == order.id) && (

                                                        <Fragment key={item.id}>

                                                            <div className="col-md-2 col-3 mb-1">

                                                                <img style={{width: "90px", height: "40px"}}
                                                                    src={item.product.img}
                                                                    className="img-fluid "
                                                                    alt={item.name} />

                                                            </div>

                                                            <div className="col-md-10 col-9">
                                                                <table className="table table-borderless table-sm">

                                                                    <tbody>
                                                                    <tr>

                                                                        <td className="col-md-3 col-3 small">
                                                                            {/*{#   <a#}*/}
                                                                            {/*{#   href="{% url 'products3:specific_product' item.product.category item.product.name item.product.id %}"#}*/}
                                                                            {/*{#   class="text-decoration-none text-reset">#}*/}
                                                                            {item.name}
                                                                        </td>

                                                                        <td className="col-md-3 col-3 small">
                                                                            Rs. {item.price}
                                                                        </td>

                                                                        <td className="col-md-3 col-3 small">
                                                                            x {item.quantity}
                                                                        </td>

                                                                        {/*{#     <td class="col-md-3 col-3">#}*/}
                                                                        {/*{#        {{order.created_date}}#}*/}
                                                                        {/*{#     </td>#}*/}

                                                                    </tr>

                                                                    </tbody>
                                                                </table>

                                                            </div>

                                                        </Fragment>

                                                    )
                                                ))}

                                            <hr/>

                                        </div>
                                    </Link>

                                    {/* 1 - Sub-total  */}
                                    <div className="row">

                                        <div className="col small">
                                            <h6 className="small text-muted">
                                                Sub-total
                                            </h6>
                                        </div>

                                        <div className="col small">
                                            <h6 className="small text-muted">
                                                Rs. {order.sub_total}
                                            </h6>
                                        </div>
                                    </div>

                                    {/*3 - All total charges  */}
                                    <div className="row">

                                        <div className="col">
                                            <h6 className="small">
                                                Total (Pkr)
                                            </h6>
                                        </div>

                                        <div className="col">
                                            <h6 className="small">
                                                Rs. {order.total_amount}
                                            </h6>
                                        </div>

                                    </div>

                                    {/* some important links for user */}
                                    <div className={"row small"}>
                                        <div className={"col"}>

                                            <a href={`tel:18519204393`}
                                                // onClick={() => reset_email()}
                                               className="btn btn-sm btn-outline-primary
                                               rounded-pill">
                                                <i className="fa-solid fa-phone"></i> Call seller
                                            </a>

                                            <Link to={'/help'} className="btn btn-sm
                                            btn-outline-secondary rounded-pill m-2">
                                                <i className="fas fa-headset"></i> Need help
                                            </Link>

                                            {/* If order status is not cancelled then
                                             show the CancelOrder btn */}

                                            {order.status !== "cancelled" &&
                                                order.status !== "processed" &&

                                                <CancelOrder
                                                    order_id={order.id}
                                                    cancel_order1={cancel_order1}
                                                />
                                            }

                                            {/*<button onClick={() => cancel_order(order.id)} data-bs-toggle="modal"*/}
                                            {/*        data-bs-target="#deleteModal"*/}
                                            {/*        id="#deleteModal"*/}
                                            {/*        className="btn btn-sm rounded-pill btn-outline-danger">*/}
                                            {/*    Cancel order*/}
                                            {/*</button>*/}

                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </Fragment>

                ))}

        </div>
    )
}

export default OrderAndOrderItem;