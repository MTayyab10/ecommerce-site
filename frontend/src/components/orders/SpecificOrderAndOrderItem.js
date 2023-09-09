import {Link} from "react-router-dom";
import facebookImg from "../../containers/accounts/Continue with Fb Btn.PNG";
import React, {Fragment} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import moment from "moment/moment";

const SpecificOrderAndOrderItem = ({
                                       specific_order,
                                       specific_order_items
                                   }) => {


    // for page title but don't know its good practice
    // document.title = "Order detail"


    // Order items
    const orderItems = () =>
        specific_order_items && true && true &&
        // specific_order_items.length != 0 &&
        specific_order_items.map((item, index) => {
            let quantity = item.quantity;

            return (
                <div key={item.id} className="card-body pb-0 mb-0">

                    {/* 1 - Items */}
                    <div className="row small">

                        <div className="col-md-2 col-3 ">
                            <Link
                                to={`/`}>
                                {/*{#         class="text-decoration-none text-reset">#}*/}

                                <img
                                    style={{width: "60px", height: "40px"}}
                                    // style="width: 60px; height: 40px;"
                                    src={item.product.img}
                                    // src={facebookImg}
                                    className="img-fluid" alt="pic"/>
                            </Link>
                        </div>

                        <div className="col-md-10 col-9">

                            <table className="table table-borderless table-sm p-0 m-0">

                                <tbody className={"small"}>
                                <tr>

                                    <td className="col-md-4 col-5 small text-capitalize">
                                        <Link to="/"
                                              class="text-decoration-none text-reset">
                                            {item.name}
                                        </Link>
                                    </td>

                                    {/* as we are retrieving OrderItem so price will
                                                 not change here mean fix price */}

                                    {/*{item.discount ?*/}

                                    {/*    <td className="col-md-4 col-4 small">*/}
                                    {/*        Rs. {item.discount_price} / {item.unit}*/}
                                    {/*    </td>*/}
                                    {/*    :*/}
                                    {/*    <td className="col-md-4 col-4 small">*/}
                                    {/*        Rs. {item.price} / {item.unit}*/}
                                    {/*    </td>*/}
                                    {/*}*/}

                                    <td className="col-md-4 col-4 small">
                                        Rs. {item.price} / {item.product.unit}
                                    </td>

                                    <td className="col-md-4 col-2 small">
                                        x {item.quantity}
                                    </td>

                                </tr>

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>

            );
        })


    // Order price breakdown
    const orderPriceInfo = (<div className="card-body">

        {/*<div className={"offset-md-4 col-md-8 offset-2 col-12"}>*/}
        {/*    <h5>Price info</h5>*/}
        {/*</div>*/}

        {/*   subtotal  */}

        <div className="row pt-1 small">

            <div className="col">
                <h6 className="small">Sub-total</h6>
            </div>

            <div className="col">
                <h6 className="small">
                    Rs. {specific_order && true && true &&
                    specific_order.sub_total}
                    {/*{{order.cart_total}}*/}
                </h6>
            </div>

        </div>

        {/*  delivery fee  */}

        <div className="row small">

            <div className="col">
                <h6 className="small">Delivery fee</h6>
            </div>

            <div className="col">
                <h6 className="small">
                    Rs. {specific_order && true && true &&
                    specific_order.delivery_fee}
                </h6>
            </div>

        </div>

        {/*  service fee  */}

        {/*<div className="row small">*/}

        {/*    <div className="col">*/}
        {/*        <h6 className="small">Service fee</h6>*/}
        {/*    </div>*/}

        {/*    <div className="col">*/}
        {/*        <h6 className="small">*/}
        {/*            Rs. {specific_order && true && true &&*/}
        {/*            specific_order.service_fee}*/}
        {/*        </h6>*/}
        {/*    </div>*/}

        {/*</div>*/}

        {/* - All total charges*/}

        <div className="row">

            <div className="col">
                <h6 className="fw-bolder text-danger small">
                    Total (Pkr)
                </h6>
            </div>

            <div className="col">
                <h6 className="fw-bolder text-danger small">
                    Rs. {specific_order && true && true &&
                    specific_order.total_amount}
                </h6>
            </div>

        </div>

    </div>)


    return (
        <Fragment>

            {orderItems()}
            {orderPriceInfo}

        </Fragment>

    )
}

export default SpecificOrderAndOrderItem;