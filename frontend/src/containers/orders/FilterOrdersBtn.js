import React, {Fragment, useState} from "react";

const FilterOrdersBtn = ({filterOrders, setOrder, orderWithStatus, orders}) => {

    // Try to set bg colors for btn
    const [bgColor, setBgColor] = useState(null)

    // show status for orders
    const showStatus = (status) => {
        if (status === 'not_processed') {
            return 'Not Processed';
        }
        else if (status === 'processed') {
            return 'Processed';
        }
        else if (status === 'shipped') {
            return 'Shipping';
        }
        else if (status === 'delivered') {
            return 'Delivered';
        }
        else if (status === 'cancelled') {
            return 'Cancelled';
        } else {
            return  "Unknown"
        }
    };


    return (
        <Fragment>
            <div className="offset-md-1 col-md-8 col-12 pt-1 pb-1">

                <ul className="list-inline pt-2 pb-2">
                    <li className="list-inline-item">

                        <button className={`btn btn-sm mt-2 rounded-pill
                         ${bgColor == null ? "btn-primary" :
                            "bg-info text-primary bg-opacity-25 "}`}

                                onClick={() => {
                                    setOrder(orders);
                                    setBgColor(null)
                                }}
                        >
                            All
                        </button>
                    </li>

                    {orderWithStatus && true && true &&
                        orderWithStatus.map((status, id) => {
                            return (

                                <li key={id} className={"list-inline-item"}>

                                    <button
                                        className={bgColor !== id ?
                                            "btn bg-info text-primary " +
                                            "bg-opacity-25 rounded-pill btn-sm mt-2"
                                            : "btn btn-primary rounded-pill btn-sm mt-2"}
                                        // className="btn-dark text-white p-1 px-2 mx-5 btn fw-bold"
                                        onClick={() => {
                                            filterOrders(status);
                                            setBgColor(bgColor => bgColor === status ?
                                                null : id)
                                        }}
                                        key={id}
                                    >
                                        {/*<h6>Bg color is : {bgColor} & id is {id}</h6>*/}
                                        {showStatus(status)}
                                    </button>
                                </li>
                            );
                        })}

                </ul>

            </div>
        </Fragment>
    );
};

export default FilterOrdersBtn;