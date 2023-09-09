import {Link} from "react-router-dom";
import React from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";

const ShopProductsItem = ({shopName, products}) => {

    const shopProducts = (
        <div className="row pb-3">

            {products && true && true &&
                products.filter((product) =>
                    product.shop_owned.name == shopName)
                    .map(product => (
                        <div key={product.id} className="col-md-2 col-6 gx-1 gy-1">

                            {/* If product's qty is available then show product
                         else show sold-out*/}

                            {product.quantity >= 1 ?

                                <Link className="text-decoration-none text-reset"
                                      to={{
                                          pathname: `/${product.category.name}/${product.name}/${product.id}`,
                                          state: {product}
                                      }}
                                >
                                    <div className="card card1">

                                        {/* lazy loading to load while
                                     scrolling */}

                                        <LazyLoadImage
                                            src={product.img}
                                            // width={"100px"} height={"105px"}
                                            // placeholderSrc={`https://via.placeholder.com/950?text=${product.name}`}
                                            className={"card-img-top float-left"}
                                            // effect={"black-and-white"}
                                            // effect={"blur"}
                                            alt={product.name}
                                        />

                                        {/* By default, img this was working in the
                                 DjangoTemplate */}

                                        {/*<img*/}
                                        {/*    src={product.img}*/}
                                        {/*    // src={facebookImg}*/}
                                        {/*    // data-src={product.img}*/}
                                        {/*    // src={`https://via.placeholder.com/150?text=${ product.name }`}*/}
                                        {/*    className="lazy card-img-top "*/}
                                        {/*    alt={`${product.name}`}*/}
                                        {/*/>*/}

                                        {/*If new product, show a 'new' tag */}

                                        {product.new &&
                                            <span className="fw-light notify-badge
                                             bg-danger badge">
                                    new </span>
                                        }

                                        {/* Discount tag */}

                                        {product.discount_percent >= 5 &&
                                            <span className="notify-badge2 badge
                                    bg-dark fw-light">
                                  {product.discount_percent}% off </span>
                                        }

                                        {/* Product detail like name, desc, price etx */}

                                        <div className="product-detail">

                                            {/* Product, by adding transform & lowercase can get */}

                                            <h6 className="d-inline"
                                                style={{textTransform: "Capitalize"}}>
                                                {product.name.toLowerCase()}
                                            </h6>

                                            <div className="small text-truncate">
                                                {product.description}, build fast
                                            </div>

                                            {/* If product have discount then show */}

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
                                                        {product.unit} </small>
                                                    </h6>

                                                </div>
                                                :
                                                <h6 className="small d-inline text-danger">
                                                    Rs. {product.price} <small
                                                    className="text-dark">
                                                    {product.unit} </small>
                                                </h6>
                                            }
                                        </div>
                                    </div>
                                </Link>

                                :  // If product quantity is Zero 0

                                <Link to={'#'} className="disabled text-decoration-none text-reset">

                                    <div className="card ">

                                        {/* pic of product & sold-out */}

                                        <div className="item" title="Not Available this item">

                                            <img
                                                // data-src="{{ product.img.url }}"
                                                //  src=" https://via.placeholder.com/950?text={{ product.name }}"
                                                src={product.img}
                                                className="lazy card-img-top"
                                                alt={product.name}/>

                                            <h5 className="d-inline">
                                                <span className="fw-bold sold-out-notify badge bg-danger">
                                                    Sold <i className="fas fa-eye-slash"></i>
                                                </span>
                                            </h5>

                                        </div>

                                        {/* some product detail */}

                                        <div className="product-detail">

                                            {/* Product, by adding transform & lower case can get */}

                                            <h6 className="d-inline text-secondary"
                                                style={{textTransform: "Capitalize"}}>
                                                <s> {product.name.toLowerCase()} </s>
                                            </h6>

                                            <div className="small text-truncate">
                                                {product.description}, build fast
                                            </div>

                                            {/* If product have discount then show */}

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
                            }


                        </div>
                    ))}
        </div>
    )

    return (
        shopProducts
    )
}

export default ShopProductsItem;