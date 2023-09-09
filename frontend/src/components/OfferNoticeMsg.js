import React, {Fragment} from "react";

// Display any Notice or Offer msg here

const OfferNoticeMsg = () => {

    return (
        <Fragment>

            {/*<div className="alert alert-danger alert-dismissible*/}
            {/* fade show text-center p-2 m-0" >*/}

            <div className="alert alert-dark alert-dismissible
               fade show p-2 m-0 text-center small" >

                Deliver items in 10-12 minutes
                {/*New offer 20% off, Buy now!*/}

                <button type="button" className="btn-close small pt-4 pb-1"
                        data-bs-dismiss="alert" aria-label="Close"/>

            </div>
        </Fragment>
    )
}

export default OfferNoticeMsg;