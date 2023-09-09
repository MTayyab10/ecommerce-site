import {connect} from "react-redux";
import React, {Fragment, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {
    get_delivery_address,
    create_delivery_address,
    delete_delivery_address
} from "../actions/delivery_address"
import DeliveryAddressForm from "../components/delivery_address/DeliveryAddressForm";

const DeliveryAddress = ({
                             delivery_addresses,
                             get_delivery_address,
                             create_delivery_address,
                             delete_delivery_address
                         }) => {

    // API call

    useEffect(() => {
        get_delivery_address()
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        mobile: '',
        addr_status: false
    });

    // for checked (addr_status) Boolean

    const [isChecked, setIsChecked] = useState(true);

    const checkOnChange = () => {
        setIsChecked(!isChecked);
    }

    const {name, address, city, mobile, addr_status} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = (e) => {
        e.preventDefault();
        create_delivery_address(name, address, city, mobile, isChecked) // instead of addr_status
    };

    // Display all delivery addresses
    const displayDeliveryAddress = () => {

        return (
            // <div className="col-md-6 offset-1 col-10">
            <Fragment>

                 {delivery_addresses && true && true &&
                    delivery_addresses.map((addr) =>
                        <div className="col-12">

                            <div className={`${addr.addr_status && "border-secondary"}`}>

                                {addr.addr_status ?

                                    <>
                                        <h6 className="d-inline">
                                            {addr.name}
                                        </h6>

                                        <h6 className="d-inline ms-4">
                                               <span className="badge rounded-pill bg-secondary">
                                                <i className="fas fa-check-circle check{{ addr.id }}
                                             check act-btn{{ addr.id }} "> </i> Active </span>

                                        </h6>
                                    </> : <h6> {addr.name}</h6>}

                                <div className="card-text small">
                                    {addr.mobile}
                                </div>

                                <div className="card-text small">
                                    {addr.city}, {addr.address}
                                </div>

                                <Link to={`/update_address/${addr.id}`}
                                      className="link-primary small mt-2
                                       text-decoration-none">
                                    <i className="far fa-edit"></i> Change
                                </Link>

                                <Link onClick={(e) => delete_delivery_address(addr.id)}
                                      to={`#`}
                                      className="link-danger small ms-3 mt-2
                                       text-decoration-none">
                                    <i className="fas fa-trash-alt"></i> Delete
                                </Link>

                                <hr/>

                            </div>

                        </div>)}

                {/*{delivery_addresses && true && true &&*/}
                {/*    delivery_addresses.map((addr) =>*/}
                {/*        <div key={addr.id} className=" pt-2">*/}

                {/*            <div className="card">*/}
                {/*                <div className="card-body">*/}

                {/*                    <div className={`${addr.addr_status && "border-secondary"}`}>*/}

                {/*                        {addr.addr_status ?*/}

                {/*                            <>*/}
                {/*                                <h6 className="d-inline">*/}
                {/*                                    {addr.name}*/}
                {/*                                </h6>*/}

                {/*                                <h6 className="d-inline ms-4">*/}
                {/*                            <span className="badge rounded-pill bg-success">*/}
                {/*                                <i className="fas fa-check-circle check{{ addr.id }}*/}
                {/*                             check act-btn{{ addr.id }} "> </i> Active </span>*/}

                {/*                                </h6>*/}
                {/*                            </>*/}
                {/*                            :*/}
                {/*                            <h6> {addr.name}</h6>*/}
                {/*                        }*/}

                {/*                        <h6 className="card-subtitle mt-1 mb-1 small">*/}
                {/*                            {addr.mobile}*/}
                {/*                        </h6>*/}

                {/*                        <div className="card-text small">*/}
                {/*                            {addr.city}, {addr.address}*/}
                {/*                        </div>*/}

                {/*                       /!* <Link to={`/update_address/${addr.id}`}*!/*/}
                {/*                       /!*       className="btn btn-outline-secondary btn-sm mt-2*!/*/}
                {/*                       /!*text-decoration-none">*!/*/}
                {/*                       /!*     Change*!/*/}
                {/*                       /!* </Link>*!/*/}

                {/*                       /!* <button onClick={(e) => delete_delivery_address(addr.id)}*!/*/}
                {/*                       /!*         className="btn btn-danger btn-sm ms-2 mt-2*!/*/}
                {/*                       /!*     text-decoration-none">*!/*/}
                {/*                       /!*     Delete*!/*/}
                {/*                       /!* </button>*!/*/}


                {/*                        <Link to={`/update_address/${addr.id}`}*/}
                {/*                              className="link-primary small mt-2*/}
                {/*                       text-decoration-none">*/}
                {/*                            <i className="far fa-edit"></i> Change*/}
                {/*                        </Link>*/}

                {/*                        <Link onClick={(e) => delete_delivery_address(addr.id)}*/}
                {/*                              to={`#`}*/}
                {/*                              className="link-danger small ms-3 mt-2*/}
                {/*                       text-decoration-none">*/}
                {/*                            <i className="fas fa-trash-alt"></i> Delete*/}
                {/*                        </Link>*/}

                {/*                    </div>*/}

                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    )}*/}
            </Fragment>
        )
    }

    // add new address link with collapse
    const addNewAddressLink = (
        <div className="offset-md-1 col-md-10 col-12">

        <div id="" className="pb-2">

            <a href="#"
               className="text-decoration-none">

                <div className="text-center fw-bolder"
                     name="inlineRadioOptions" id="inlineRadio1"
                     value="option1"
                     data-bs-toggle="collapse" href="#collapseDelivery"
                     aria-expanded="false" aria-controls="collapseExample"
                >
                    <i className="fas fa-plus-circle text-danger"/> Add
                     delivery address
                    {/*<i className="float-end fas fa-angle-right text-secondary">*/}
                    {/*</i>*/}

                </div>
            </a>

        </div>

        {/*  If click on above link then it will show below form */}

        <div id="collapseDelivery" className="collapse pt-2">

            {/* Create/Add deliver address */}

            <DeliveryAddressForm
                name={name}
                address={address}
                city={city}
                mobile={mobile}
                addr_status={addr_status}
                isChecked={isChecked}
                checkOnChange={checkOnChange}
                onChange={onChange}
                onSubmit={onSubmit}
            />

        </div>

    </div>)

    return (
        <div className={"container"}>

            {/*<h2 className={"text-center p-3"}>*/}
            {/*    Delivery address*/}
            {/*</h2>*/}

            <div className={"row"}>

                {displayDeliveryAddress()}

                {addNewAddressLink}

            </div>

        </div>
    )
}

const mapStateToProps = state => ({
    delivery_addresses: state.delivery_address.delivery_addresses
})

export default connect(mapStateToProps, {
    get_delivery_address,
    create_delivery_address,
    delete_delivery_address
})(DeliveryAddress)