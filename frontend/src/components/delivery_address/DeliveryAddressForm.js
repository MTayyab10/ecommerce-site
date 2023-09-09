import React from "react";

const DeliveryAddressForm = ({
                                 name,
                                 address,
                                 city,
                                 mobile, addr_status,
                                 isChecked, checkOnChange,
                                 onChange, onSubmit
                             }) => (

    <form className={"row g-3 pt-2"} onSubmit={e => onSubmit(e)}>

        {/* 1 - Name */}

        <div className="col-md-6 offset-md-0 offset-1 col-10">
            <label htmlFor="validateName" className="form-label">
                Name
            </label>
            <input type="text" className="form-control"
                   name="name"
                   id="validateName"
                   placeholder="Tayyab"
                   onChange={e => onChange(e)}
                   value={name}
                   required/>
        </div>

        {/* 2 - Address */}

        <div className="col-md-6 offset-md-0 offset-1 col-10">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control"
                   name="address"
                   id={"address"}
                   placeholder="Arian Town d block"
                   onChange={e => onChange(e)}
                   value={address}
                   required/>
        </div>

        {/* 3 - City */}

        <div className="col-md-6 offset-md-0 offset-1 col-10">

            <label htmlFor="city" className="form-label">City</label>

            <select className="form-select"
                    aria-label="Example select with button addon"
                    name="city"
                    onChange={e => onChange(e)}
                    value={city}
                    // defaultValue="Choose..."
                    required
            >
                <option disabled value="">Choose...</option>
                <option value="Tatlay Aali">Tatlay Aali</option>
                {/*<option value="Kamonki">Kamonki</option>*/}
                {/*<option value="3">Three</option>*/}
            </select>
        </div>


        {/*<div className="col-md-6 offset-md-0 offset-1 col-10">*/}
        {/*    <label htmlFor="city" className="form-label">City</label>*/}
        {/*    <input type="text" className="form-control"*/}
        {/*           name="city"*/}
        {/*           placeholder="Tatlay Aali"*/}
        {/*           onChange={e => onChange(e)}*/}
        {/*           value={city}*/}
        {/*           required/>*/}
        {/*</div>*/}

        {/* 4 - Mobile */}

        <div className="col-md-6 offset-md-0 offset-1 col-10">
            <label htmlFor="mobile" className="form-label">Mobile</label>
            <input type="tel" className="form-control"
                   name="mobile"
                   placeholder="18519204393"
                   onChange={e => onChange(e)}
                   value={mobile}
                   pattern="[0-9]{11}"
                   required/>
        </div>

        {/* 6 - addr_status, Use this address Checkbox */}

        <div className="col-md-6 offset-md-0 offset-1 col-10">

            <div className="form-check">
                <input className="form-check-input"
                       type="checkbox"
                       id="defaultCheck1"
                       value={addr_status}
                       onChange={checkOnChange}
                       checked={isChecked}
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                    Use this address
                </label>
            </div>


            {/*<div className="form-check form-check-inline">*/}

            {/*    <input className="form-check-input"*/}
            {/*           type="radio"*/}
            {/*           id="flexRadioDefault1"*/}
            {/*           name="addr_status"*/}
            {/*           onChange={e => onChange(e)}*/}
            {/*           value={addr_status}*/}
            {/*           checked={addr_status}*/}
            {/*    />*/}
            {/*    <label className="form-check-label"*/}
            {/*           htmlFor="flexRadioDefault1">*/}
            {/*        Use this address*/}
            {/*    </label>*/}
            {/*</div>*/}


        </div>

        <div className="col-md-12 offset-md-0 offset-1 col-10 pt-1">

            <button type="submit" className="btn btn-primary">
                Save
            </button>

        </div>

    </form>
);

export default DeliveryAddressForm;