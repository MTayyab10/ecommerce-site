import React, {Fragment, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import "../products/ProductsStyle.css"
import {get_products} from "../../actions/products"
import {get_shops} from "../../actions/shops"
import {connect} from "react-redux";
import facebookImg from "../accounts/Continue with Fb Btn.PNG";
import OtherShopsItem from "../../components/shops/OtherShopsItem"
import ShopProductsItem from "../../components/shops/ShopProductsItem";


const ShopProducts = ({
                          products, get_products,
                          shops, get_shops
                      }) => {

    const {name: shopName} = useParams();

    // fetch product from actions/products.js
    // fetch shops from actions/shops.js

    useEffect(() => {
        get_products();
        get_shops();
        window.scroll(0, 0);
    }, [])

    // Simple breadcrumb

    const breadCrumb = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb small">

                <li className="breadcrumb-item small">
                    <Link className="text-decoration-none small"
                          to="/">
                        Home
                    </Link>
                </li>

                 <li className="breadcrumb-item small">
                    <Link className="text-decoration-none small"
                          to="/shops">
                        Shops
                    </Link>
                </li>

                <li className="breadcrumb-item active small"
                    aria-current="page">
                    {shopName}
                </li>
            </ol>
        </nav>
    )

    {/* Products of Specific/One Shop */
    }

    const shopProducts = (
        <div className="row pb-3">

            {products && true && true &&
                products.filter((product) =>
                    product.shop_owned.name == shopName)
                    .map(product => (
                        <div key={product.id} className="col-md-2 col-6 gx-1 gy-1">

                            <Link className="text-decoration-none text-reset"
                                  to={{
                                      pathname: `/${product.category.name}/${product.name}/${product.id}`,
                                      state: {product}
                                  }}
                            >
                                <div className="card card1">

                                    <img
                                        // src={facebookImg}
                                        src={product.img}
                                        // data-src={product.img}
                                        // src={`https://via.placeholder.com/150?text=${ product.name }`}
                                        className="lazy card-img-top "
                                        alt={`${product.name}`}/>

                                    {product.new &&
                                        <span className="fw-light notify-badge
                                             bg-danger badge">
                                           new
                                    </span>
                                    }

                                    {/* Discount tag */}

                                    {product.discount_percent >= 5 &&
                                        <span className="notify-badge2 badge
                                    bg-dark fw-light">
                                        {product.discount_percent}% off
                                    </span>
                                    }

                                    <div className="product-detail">

                                        <h6 className="d-inline">
                                            {product.name}
                                        </h6>

                                        <div className="small text-truncate">
                                            {product.description}, build fast
                                        </div>

                                        {product.discount ?

                                            <div className="">

                                                <h6 className="small text-secondary me-2 d-inline">
                                                    <s className="small">
                                                        Rs. {product.price}
                                                    </s>
                                                </h6>
                                                <h6 className="small d-inline text-danger">
                                                    Rs. {product.discount_price} <small
                                                    className="text-dark">
                                                    {product.unit}
                                                </small>
                                                </h6>
                                            </div>
                                            :
                                            <h6 className="small d-inline text-danger">
                                                Rs. {product.price} <small
                                                className="text-dark">
                                                {product.unit}
                                            </small>
                                            </h6>
                                        }
                                    </div>

                                </div>
                            </Link>

                        </div>
                    ))}
        </div>

    )

    // Products of specific/one shop
    const renderShopProducts = () => {
        return (
            <ShopProductsItem
                shopName={shopName}
                products={products}
            />
        )
    }


    // show shops for same category
    const renderOtherShops = () => (
        <div className="bg-light">
            <div className="container pb-2">

                <div className="p-2">
                    <h2>Other shops</h2>
                </div>

                <OtherShopsItem
                    shopName={shopName}
                    shops={shops}
                />

            </div>
        </div>
    )

    return (

        <Fragment>
            <div className="container">

                <div className="text-center p-3">
                    <h3>{shopName}</h3>
                </div>

                {/* Breadcrumb section */}
                {breadCrumb}

                {/* Specific shop products */}

                {renderShopProducts()}

            </div>

            {/* Other Shops with same Category */}

            {renderOtherShops()}

        </Fragment>
    )
}


const mapStateToProps = state => ({
    // loading: state.products.loading,
    products: state.products.products,
    // get shops and loading from shop state
    loading: state.shops.loading,
    shops: state.shops.shops
});


export default connect(mapStateToProps, {
    get_shops,
    get_products
})(ShopProducts);