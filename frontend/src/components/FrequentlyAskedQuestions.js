import {Fragment} from "react";
import {Link} from "react-router-dom";

const FrequentlyAskedQuestions = () => {

    // FAQs

    const faq = (
        <div className="accordion pt-2 pb-3" id="accordionExample">

            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        What is E-Shop?
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show"
                     aria-labelledby="headingOne"
                     data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                         Website or platform where products or services are sold over the internet.

                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo" aria-expanded="false"
                            aria-controls="collapseTwo">
                        What is method of payment?
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse"
                     aria-labelledby="collapseTwo"
                     data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        Now just we are accepting <strong>Cash on Delivery</strong>.
                        but we are developing some online methods to pay.
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree" aria-expanded="false"
                            aria-controls="collapseThree">
                        When & How can I cancel my order?
                    </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse"
                     aria-labelledby="headingThree"
                     data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        After creating order in 3 minutes you can cancel order.
                        For cancelling order go to
                           Account > My Orders > Cancel Order
                        click on cancel button.

                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                    <button className="accordion-button collapsed" type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFour" aria-expanded="false"
                            aria-controls="collapseFour">
                        Where I can get more info and help?
                    </button>
                </h2>

                <div id="collapseFour" className="accordion-collapse collapse"
                     aria-labelledby="headingFour"
                     data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        We do our best to provide you with all the help you
                        may need in our FAQs. If you still need help
                        please <Link to={''}
                                     className={""}>
                        contact us</Link>.
                    </div>
                </div>

            </div>

        </div>
    )

    return (
        <Fragment>

            <div className="pt-3 pb-3">
                <h3 className="fw-bold text-center">
                    <i className="fas fa-question-circle mr-2"></i> Frequently
                    Asked Questions
                </h3>
            </div>

            {faq}

        </Fragment>

    )
}

export default FrequentlyAskedQuestions;