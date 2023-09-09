import {CopyToClipboard} from "react-copy-to-clipboard";
import moment from "moment/moment";
import React, {Fragment, useState} from "react";

const SpecificOrderMoreInfo = ({specific_order

                                       }) => {


    // a simple feature for copying Order unique I'd

    const [copied, setCopied] = useState({
        value: '',
        copy: false
    })

     // show status in a good way

    const showStatus = (status) => {
        if (status === "not_processed") {
            return "Not Processed";
        }
        else if (status === "processed") {
            return "Processed";
        }
        else if (status === "shipping") {
            return "Shipping";
        }
        else if (status === "delivered") {
            return "Delivered";
        }
        else if (status === "cancelled") {
            return "Cancelled";
        }
    };

    // Info like Order unique I'd, created date etc
    const moreInfo = (
        <div className="offset-md-2 col-md-8 col-12 pt-2">
            <div className="card shadow">
                <div className="card-body">

                    {/* 1 - Order id  */}

                    <div className="row ">

                        <div className="col">
                            <h6 className="small">Order Id</h6>
                        </div>

                        <div className="col">
                            <h6 className="small text-uppercase">

                                {specific_order && true && true &&
                                    specific_order.unique_id}

                                <CopyToClipboard
                                    text={specific_order && true && true &&
                                        specific_order.unique_id}
                                    onCopy={() => setCopied({copy: true})}>

                                    <button type="button"
                                            className="btn btn-link btn-sm ms-1 m-0 p-0"
                                            data-bs-toggle="tooltip" data-bs-placement="top"
                                            title="Copy to Clipboard"
                                        // style={styleForCopy}
                                    >
                                        <i className="fa-regular fa-copy pb-0"></i>
                                    </button>

                                </CopyToClipboard>

                                {copied.copy ?
                                    <span style={{color: 'green'}}
                                          className={"text-capitalize"}>
                                      <i className="fa-solid fa-circle-check ms-1"/> copied</span>
                                    : null
                                }

                            </h6>
                        </div>

                    </div>

                    {/* 2 - Payment */}

                    <div className="row">

                        <div className="col">
                            <h6 className="small">Payment</h6>
                        </div>

                        <div className="col">
                            <h6 className="small">
                                On delivery
                            </h6>
                        </div>

                    </div>

                    {/* 3- order date  */}

                    <div className="row">

                        <div className="col">
                            <h6 className="small">Order date</h6>
                        </div>

                        <div className="col">
                            <h6 className="small">

                                {moment(specific_order && true && true &&
                                    specific_order.created_date).format("DD-MM-YYYY, h:mm a")}

                                {/* below line will display time like 8 hours age */}
                                {/*{moment(specific_order.created_date).fromNow()}*/}
                            </h6>
                        </div>

                    </div>

                    {/* 4 - Order status  */}

                    <div className="row">

                        <div className="col">
                            <h6 className="small">Order status</h6>
                        </div>

                        <div className="col">
                            <h6 className="small text-capitalize">
                                {specific_order && true && true &&
                                    showStatus(specific_order.status)}
                            </h6>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

    return (

        <Fragment>
            {moreInfo}
        </Fragment>

    )
}

export default SpecificOrderMoreInfo;