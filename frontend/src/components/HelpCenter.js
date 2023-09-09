
const HelpCenter = () => {

    const calls = (

        <div className="site-wrap" id="home-section">

            <div className="container">

                {/*<h3 className="pt-5">MaiFast</h3>*/}

                <h2 className=" pt-2">Support</h2>
                <h4 className="font-weight-bold text-primary">How can we help?</h4>
                <p>We are here just to help you.</p>
            </div>

            <div className="site-section">
                <div className="container">
                    <div className="row">

                        <div className="offset-md-2 col-md-4">

                            <div className="card mb-2"
                                 style={{"width": "15rem"}}>
                                <img src="https://res.cloudinary.com/dghodpjpo/image/upload/v1675957773/Customer_vvtkmm.svg"
                                     className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title font-weight-bolder">I'm a Customer</h5>
                                        <p className="card-text ">Have a difficulty please contact us.</p>
                                        <a href="tel:03276413565" className="btn btn-primary">Call now</a>
                                        <a href="mailto: admin@maifast.com" className={"btn btn-outline-primary ms-1"} >
                                            Send email
                                        </a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        calls
    )

}

export default HelpCenter;
