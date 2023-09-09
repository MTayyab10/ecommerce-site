const ContactUs = () => {

    const contact = (<div className="site-section bg-light" id="contact-section">
        <div className="container">

            <div className="text-center pt-2 pb-2">
                <h2>Contact us</h2>
                <p className="">for all request and questions.</p>
            </div>

            <div className="row">

                <div className="col-lg-8 mb-5">

                    <form className="row g-3 needs-validation">

                        {/* 1. Name */}

                        <div className="col-md-6 col-12">

                            <label htmlFor="validateName"
                                   className="form-label">
                                Name
                            </label>

                            <input type="text"
                                   className="form-control"
                                   id="validateName"
                                // placeholder='Email'
                                   name="name"
                                // value={name}
                                // onChange={e => onChange(e)}
                                   required
                            />
                            {/*<div className="valid-feedback">*/}
                            {/*    Looks good!*/}
                            {/*</div>*/}
                            <div className="invalid-feedback">
                                Please provide a name.
                            </div>
                        </div>

                        {/* 2. Email */}

                        <div className="col-md-6 col-12">

                            <label htmlFor="validateEmail"
                                   className="form-label">
                                Email
                            </label>

                            <input type="email"
                                   className="form-control"
                                   id="validateEmail"
                                // placeholder='Email'
                                   name='email'
                                // value={email}
                                // onChange={e => onChange(e)}
                                   required/>
                            {/*<div className="valid-feedback">*/}
                            {/*    Looks good!*/}
                            {/*</div>*/}
                            <div className="invalid-feedback">
                                Please provide a email.
                            </div>
                        </div>

                        {/* 3. Mobile */}

                        <div className="col-md-6 col-12">

                            <label htmlFor="validateMobile"
                                   className="form-label">
                                Mobile
                            </label>

                            <input type="email"
                                   className="form-control"
                                   id="validateEmail"
                                // placeholder='Email'
                                   name='email'
                                // value={email}
                                // onChange={e => onChange(e)}
                                   required/>
                            {/*<div className="valid-feedback">*/}
                            {/*    Looks good!*/}
                            {/*</div>*/}
                            <div className="invalid-feedback">
                                Please provide a email.
                            </div>
                        </div>

                        {/* Your message */}

                        <div className="col-md-12">

                            <label htmlFor="validateMobile"
                                   className="form-label">
                                Message
                            </label>

                            <textarea name="message" id="" className="form-control" required
                                      placeholder="Your message here..."
                                      cols="4" rows="5"></textarea>
                        </div>

                        <div className="col-md-6 me-auto pt-1">
                            <input type="submit"
                                   className="btn btn-primary"
                                   value="Send Message"/>
                        </div>
                    </form>

                </div>

                <div className="col-lg-4 ml-auto">
                    <div className="bg-white p-3 p-md-5">
                        <h3 className="text-black mb-4">Contact Info</h3>
                        <ul className="list-unstyled footer-link">
                            <li className="d-block mb-3">
                                <span className="d-block text-black">Address:</span>
                                <span>Model Town d block, Lahore, Pakistan</span></li>
                            <li className="d-block mb-3"><span
                                className="d-block text-black">Phone:</span><span>0303234344367</span></li>
                            <li className="d-block mb-3"><span
                                className="d-block text-black">Email:</span><span>info@doormeat.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>)

    return (
        contact
    )
}
export default ContactUs;