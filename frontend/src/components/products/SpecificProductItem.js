import {Link} from "react-router-dom";
import React, {Fragment} from "react";


const SpecificProductItem = ({products, product}) => {

    // Display products with same category
    // Don't show the above display product again

    const renderSameProducts = () => (
        products.filter((sameProduct) =>
            product.category.name === sameProduct.category.name
            && product.name !== sameProduct.name)
            .map((sameProduct) => (
                <div key={sameProduct.id} className={"col-md-2 col-6 gx-1 gy-1"}>

                    <Link className="text-decoration-none text-reset"
                          to={`/${sameProduct.category.name}/${sameProduct.name}/${sameProduct.id}`}
                    >
                        <div className="card card1">

                            <img
                                src={sameProduct.img}
                                // data-src={product.img}
                                // src={`https://via.placeholder.com/150?text=${ product.name }`}
                                className="lazy card-img-top "
                                alt={`${sameProduct.name}`}/>

                            {sameProduct.new &&
                                // window.scroll(0, 0)
                                <span className="fw-light notify-badge
                                      bg-danger badge">
                                    new
                                </span>

                            }

                            {/* Show a discount tag for */}
                            {/* Only Discounted items  */}

                            {sameProduct.discount_percent >= 5 &&
                                <span className="notify-badge2 badge
                                                               bg-dark fw-light">
                                    {sameProduct.discount_percent}% off
                                </span>
                            }

                            <div className="product-detail">

                                <h6 className="d-inline ">
                                    {sameProduct.name}
                                </h6>

                                {/* a very naive method to scroll  */}
                                {sameProduct.name && window.scroll(0, 0)}

                                <div className="small text-truncate">
                                    {sameProduct.description}, build fast
                                </div>

                                {sameProduct.discount ?

                                    <div className="">

                                        <h6 className="small text-secondary me-2 d-inline">
                                            <s className="small">
                                                Rs. {sameProduct.price}
                                            </s>
                                        </h6>

                                        <h6 className="small d-inline text-danger">
                                            Rs. {sameProduct.discount_price} <small
                                            className="text-dark">
                                            {sameProduct.unit} </small>
                                        </h6>

                                    </div>
                                    :
                                    <h6 className="small d-inline text-danger">
                                        Rs. {sameProduct.price} <small
                                        className="text-dark">
                                        {sameProduct.unit}</small>
                                    </h6>
                                }

                            </div>

                        </div>
                    </Link>

                </div>

            ))
    )


    return (
        <Fragment>

            <div className={"container"}>

                <h2 className="pt-3 pb-3">
                    You might also
                    like <i className="fas fa-heart text-danger"/> this
                </h2>

                <div className="row pb-4">
                    {renderSameProducts()}
                </div>

            </div>

        </Fragment>

    )
}

export default SpecificProductItem;
