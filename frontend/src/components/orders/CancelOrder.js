import {connect} from "react-redux";
import {cancel_order1} from "../../actions/orders"
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const CancelOrder = ({order_id, cancel_order1}) => {

    const [formData, setFormData] = useState({
        reason: "",
        comment: ""
    })

    const {reason, comment} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

    // after changing orderStatus navigate to Orders
    const navigate = useNavigate();

    const onSubmit = e => {
        e.preventDefault();
        cancel_order1(order_id, reason, comment, navigate);
    };

    // Cancel order modal
    const cancelOrderModal = <>

        {/*<button type="button" className="btn btn-sm btn-outline-primary rounded"*/}
        {/*        data-bs-toggle="modal" data-bs-target="#cancelOrderModal"*/}
        {/*        data-bs-whatever="@mdo">*/}
        {/*    Cancel order*/}
        {/*</button>*/}

        <div className="modal fade" id="cancelOrderModal" tabIndex="-1"
             aria-labelledby="cancelOrderModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="cancelOrderModalLabel">Order #{order_id}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={e => onSubmit(e)}>

                            <div className={"mb-2"}>

                                <label htmlFor="reason"
                                       className="col-form-label">Reason:</label>

                                <select className="form-select"
                                        aria-label="Default select example"
                                        name={'reason'}
                                        onChange={e => onChange(e)}
                                        value={reason}
                                        required
                                >
                                    <option disabled value="">Please choose...</option>
                                    <option value="Don't want to have">
                                        Don't want to have.
                                    </option>
                                    <option value="Don't like it.">
                                        Don't like it.
                                    </option>
                                    <option value="Product quality is not good.">Product quality is not good.</option>
                                    <option value="5">I ordered wrong one.</option>
                                    <option value="6">Other</option>

                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="comment" className="col-form-label">
                                    Comment:
                                </label>
                                <textarea
                                    className="form-control"
                                    id="comment"
                                    name={'comment'}
                                    value={comment}
                                    onChange={e => onChange(e)}
                                    required
                                >
                                </textarea>
                            </div>

                            {/* <div className="mb-3">*/}
                            {/*    <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>*/}
                            {/*    <input type="text" className="form-control" id="recipient-name"/>*/}
                            {/*</div>*/}

                            <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary"
                                    data-bs-dismiss="modal"
                            >Cancel order</button>
                            </div>

                        </form>
                    </div>

                    {/*<div className="modal-footer">*/}
                    {/*    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>*/}
                    {/*    <button type="submit" className="btn btn-primary">Cancel order</button>*/}
                    {/*</div>*/}

                </div>
            </div>
        </div>
    </>

    return (
        <>
            {cancelOrderModal}

            <button type="button" className="btn btn-outline-danger
                                        btn-sm rounded-pill "
                    data-bs-toggle="modal" data-bs-target="#cancelOrderModal"
                    data-bs-whatever="@mdo">
                Cancel order
            </button>
        </>
    )

}
export default CancelOrder;
// export default connect({}, {
//     cancel_order1,
// })(CancelOrder)