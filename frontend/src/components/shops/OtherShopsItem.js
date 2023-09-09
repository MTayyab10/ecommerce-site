import {Link} from "react-router-dom";
import React from "react";


const OtherShopsItem = ({shopName, shops}) => {

    // shop products
    const renderShopProducts = () => (
        shops && true && true &&
        shops.length > 0 ? (
            shops && true && true &&
            shops.map((shop) =>
                (shop.name == shopName &&
                    <div key={shop.id} className={"row"}>
                        {shops.filter((shopsSameCtgry) =>
                            shop.category.name === shopsSameCtgry.category.name
                            && shopsSameCtgry.name !== shopName
                        ).map((shop) => (

                            // <div className="row ">
                            <div key={shop.id} className="col-md-6 col-12 ">
                                <div className="row pb-2 pt-2">

                                    <div className="col-md-5 col-6">
                                        <img src={`http://127.0.0.1:8000${shop.img}`}
                                             className="img-fluid rounded-start"
                                             style={imgStyle} alt=""/>
                                    </div>

                                    <div className="col-md-6 col-6">
                                        <div className="info">

                                            <h5 className="address text-truncate">

                                                <i className="fas fa-map-marker-alt
                                                        map-color text-info"/>
                                                {shop.address}
                                                {/*<span className="map">*/}
                                                {/*    View on Google Maps*/}
                                                {/*</span>*/}
                                            </h5>

                                            <h3 className={"shop-name"}>
                                                <i className="fas fa-store-alt "
                                                   style={{"fontSize": "16px"}}
                                                /> {shop.name}
                                            </h3>

                                            <h4 className={"business-timing"}>
                                                <i
                                                    className="
                                                     fw-bold far fa-clock"/> {shop.business_time}
                                            </h4>

                                            <p className="deliver-timing">
                                                <i className="
                                                        fas fa-truck"/> {shop.delivery_time}
                                                {/*<b> Deliver: </b>*/}
                                            </p>

                                            <Link
                                                // to={`/shops/${product.shop_owned.name}`}
                                                to={{
                                                    pathname: `/shops/${shop.name}`,
                                                    state: {shop}
                                                }}
                                                className="btn btn-primary">
                                                See Products
                                            </Link>

                                        </div>
                                    </div>

                                </div>
                                <hr/>
                            </div>
                        ))
                        }
                    </div>
                )
            )
        ) : <h3>There is no more shops for same category
        </h3>

    )

    // img style for Shop's detail

    const imgStyle = {
        "width": "200px",
        "height": "200px"
    }

    const newItem = <h3>kadsfkjdksa</h3>

    return (
        renderShopProducts()
    )
}

export default OtherShopsItem
