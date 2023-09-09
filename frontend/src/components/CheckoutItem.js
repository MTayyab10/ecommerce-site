import React, {useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import facebookImg from "../containers/accounts/Continue with Fb Btn.PNG";

const CheckoutItem = ({isAuthenticated, item, quantity }) => {

    const [formData, setFormData] = useState({
        item_count: 1
    });

    const {item_count} = formData;

    useEffect(() => {
        if (quantity)
            setFormData({
                ...formData,
                item_count: quantity
            });
    }, [quantity]);


    // Cart Items like card, img, price, qty, info
    // Order summary

    const orderSummary = () => (
        <div className="card-body pb-0 mb-0">

            {/* 1 - Items */}

            <div className="row small">

                <div className="col-md-2 col-3">
                    <Link to="/cart">
                        {/*{#         class="text-decoration-none text-reset">#}*/}

                        <img
                            style={{width: "60px", height: "40px"}}
                            // style="width: 60px; height: 40px;"
                            src={item.product.img}
                            className="img-fluid " alt="pic"/>
                    </Link>
                </div>

                <div className="col-md-10 col-9">

                    <table className="table table-borderless table-sm p-0 m-0">

                        <tbody className={"small"}>
                        <tr>

                            <td className="col-md-4 col-5 small text-capitalize">
                                <Link to="/cart"
                                      class="text-decoration-none text-reset">
                                    {item.product.name}
                                </Link>
                            </td>

                            {/* if  discount price for a product */}

                            {item.product.discount ?

                                <td className="col-md-4 col-4 small">
                                    Rs. {item.product.discount_price} / {item.product.unit}
                                </td>
                                :
                                <td className="col-md-4 col-4 small">
                                    Rs. {item.product.price} / {item.product.unit}
                                </td>
                            }

                            <td className="col-md-4 col-2 small">
                                x {item.quantity}
                            </td>

                        </tr>

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )

    return (
        <Fragment>

            {/* Card , Img, price, qty info */}
            {orderSummary()}

        </Fragment>
    )

}
export default CheckoutItem;