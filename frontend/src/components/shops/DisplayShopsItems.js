import {Link} from "react-router-dom";
import React, {Fragment} from "react";

const DisplayShopsItems = ({shop}) => {

    // Img style for Shop detail

    const imgStyle = {
        "width": "200px",
        "height": "190px"
    }

    // Shops detail
    const allShops = () => (

        shop && true && true &&
        shop.map((shop) =>
            <div key={shop.id} className="col-md-5 col-10">
                <div className="row pb-2 pt-2">

                    <div className="col-md-5 col-6">
                        <img src={shop.img}
                             className="img-fluid rounded-start"
                             style={imgStyle}
                             alt={shop.name}
                        />
                    </div>

                    <div className="col-md-6 col-6">
                        <div className="info">

                            <h5 className="address text-truncate">

                                <i className="fas fa-map-marker-alt
                                 text-info"/> {shop.address}
                                {/*<span className="map">*/}
                                {/*    View on Google Maps*/}
                                {/*</span>*/}
                            </h5>

                            <h3 className={"shop-name text-truncate"}>
                                <i className="fas fa-store-alt "
                                   style={{"fontSize": "16px"}}
                                /> {shop.name}
                            </h3>

                            <h4 className={"business-timing"}>
                                <i className="fw-bold far fa-clock"/> {shop.business_time}
                            </h4>

                            <p className="deliver-timing">
                                <i className="fas fa-truck"/> {shop.delivery_time}
                                {/*<b> Deliver: </b>*/}

                            </p>

                            <Link
                                // to={`/shops/${product.shop_owned.name}`}
                                to={{
                                    pathname: `/shops/${shop.name}`,
                                    // state: {product}
                                }}
                                className="btn btn-primary btn-sm">
                                See products
                            </Link>

                        </div>
                    </div>

                </div>

            </div>
        )
    )

    return (
        <Fragment>

            {allShops()}

            {/* If not found shops for the selected category */}

            {shop && true && true &&
                !shop.length >= 1 &&
                <h6 className={"col-md-5 col-10 m-1"}>
                    Sorry, No shops found for this category.
                </h6>
            }

        </Fragment>
    )
}
export default DisplayShopsItems;
