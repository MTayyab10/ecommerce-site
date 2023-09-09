import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    get_delivery_address,
    update_delivery_address
} from "../../actions/delivery_address";
import {Link, useParams} from "react-router-dom";

const UpdateDeliveryAddress = ({
                                   delivery_addresses,
                                   get_delivery_address,
                                   update_delivery_address
                               }) => {

    // I'd for to get the same data for delivery address

    const {id} = useParams();

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        mobile: '',
        addr_status: false
    });

    // for checkbox addr_status

    const [isChecked, setIsChecked] = useState(false);

    const checkOnChange = () => {
        setIsChecked(!isChecked)
    }

    // Display values for update delivery address

    useEffect(() => {

        delivery_addresses && true && true &&
        delivery_addresses.map((addr) => addr.id == id && (
                setFormData({
                    ...formData,
                    name: addr.name,
                    address: addr.address,
                    city: addr.city,
                    mobile: addr.mobile,
                    // addr_status: addr.addr_status
                }),
                    setIsChecked(
                        addr.addr_status
                    )
            )
        )
    }, [delivery_addresses])


    const {name, address, city, mobile, addr_status} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = (e, address_id) => {
        e.preventDefault();
        update_delivery_address(name, address, city, mobile, isChecked, address_id)
    };

    return (
        <div className={"container"}>
            <div className="row">
                <div className="">

                    <div className="text-center p-3 ">
                        <h3>Change address</h3>
                    </div>

                    <form className={"row g-3 pt-2"}
                          onSubmit={e => onSubmit(e, id)}>

                        {/* 1 - Name */}
                        <div className="col-md-4 offset-md-1 offset-1 col-10">
                            <label htmlFor="full_name" className="form-label">
                                Name
                            </label>
                            <input type="text" className="form-control"
                                   name="name"
                                   placeholder="Tayyab"
                                   onChange={e => onChange(e)}
                                   value={name}
                                   required/>
                        </div>

                        {/* 2 - Address */}
                        <div className="col-md-4 offset-md-1 offset-1 col-10">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input type="text" className="form-control"
                                   name="address"
                                   placeholder="Arian Town d block"
                                   onChange={e => onChange(e)}
                                   value={address}
                                   required/>
                        </div>

                        {/* 3 - City */}

                        {/*<div className="col-md-4 offset-md-1 offset-1 col-10">*/}
                        {/*    <label htmlFor="city" className="form-label">City</label>*/}
                        {/*    <input type="text" className="form-control"*/}
                        {/*           name="city"*/}
                        {/*           placeholder="Tatlay Aali"*/}
                        {/*           onChange={e => onChange(e)}*/}
                        {/*           value={city}*/}
                        {/*           required/>*/}
                        {/*</div>*/}

                        <div className="col-md-4 offset-md-1 offset-1 col-10">

                            <label htmlFor="city" className="form-label">City</label>

                            <select className="form-select"
                                    aria-label="Example select with button addon"
                                    name={'city'}
                                    onChange={e => onChange(e)}
                                    value={city}
                                    >
                                {/*<option selected>Choose...</option>*/}
                                <option value="Tatlay Aali" selected>{city}</option>
                                {/*<option value="2">Two</option>*/}
                                {/*<option value="3">Three</option>*/}
                            </select>
                        </div>

                        {/* 4 - Mobile */}
                        <div className="col-md-4 offset-md-1 offset-1 col-10">
                            <label htmlFor="mobile" className="form-label">Mobile</label>
                            <input type="tel" className="form-control"
                                   name="mobile"
                                   placeholder="18519204393"
                                   onChange={e => onChange(e)}
                                   value={mobile}
                                   pattern="[0-9]{11}"
                                   required/>
                        </div>

                        {/* 6 - addr_status, Use this address Radio btn */}

                        <div className="offset-md-1 offset-1 col-10">

                            <div className="form-check">
                                <input className="form-check-input"
                                       type="checkbox"
                                       id="defaultCheck1"
                                       value={'True'}
                                    // onChange={e => onChange(!isChecked)}
                                    // checked={addr_status}
                                       onChange={checkOnChange}
                                       checked={isChecked}
                                />
                                <label className="form-check-label"
                                       htmlFor="defaultCheck1">
                                    Use this address
                                </label>
                            </div>

                        </div>

                        {/* Save address & back to check out btn */}

                        <div className="offset-md-1 offset-1 col-10 pt-3 pb-3">

                            <button
                                // onClick={((e) => update_delivery_address(66))}
                                type="submit"
                                className="btn btn-primary">
                                Save
                            </button>

                            <Link to={'/delivery_address'}
                                  className="btn btn-outline-dark ms-3 ">
                                All address
                            </Link>

                            <Link to={'/checkout'}
                                  className="btn btn-outline-secondary ms-3 ">
                                Checkout
                            </Link>

                        </div>


                    </form>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,

    delivery_addresses: state.delivery_address.delivery_addresses,

    loading: state.orders.loading
});

export default connect(mapStateToProps, {

    get_delivery_address,
    update_delivery_address,

})(UpdateDeliveryAddress);