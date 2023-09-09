import {Link} from "react-router-dom";
import React, {Fragment, useState} from "react";
import facebookImg from "../../containers/accounts/Continue with Fb Btn.PNG"
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';


const DisplayProductsItems = ({product}) => {

    // set search query to empty string
    const [query, setQuery] = useState("");

    //  set search parameters like name, price etc.
    //  just add it to this array
    const [searchParam] = useState(
        ["name", "price", "description"]
    );

    // Search items by typing in search box
    function searchItems(items) {
        return product && true && true && // by adding true not give err
            product.filter((item) => {
                return (
                    searchParam.some((newItem) => {
                        return (
                            item[newItem]
                                .toString()
                                .toLowerCase()
                                .indexOf(query.toLowerCase()) > -1
                        )
                    })
                )
                // return searchParam.some((newItem) => {
                //     return (
                //         item[newItem]
                //             .toString()
                //             .toLowerCase()
                //             .indexOf(query.toLowerCase()) > -1
                //     );
                // });
            });
    }

     // Search box for searching products
    const searchBox = (
        <div className="offset-md-4 col-md-4 offset-1 col-10
             pt-3 pb-4">
            <form className="d-flex">

                <div className="input-group searchBar">

                    <input className="form-control border-end-0 border rounded-pill"
                           type="text" placeholder="find items or products"
                           name="query"
                           value={query}
                           onChange={e => setQuery(e.target.value)}
                           required/>
                    {/* above name=q is very important */}

                    <button className="btn btn-outline-secondary butn
                       bg-white border-start-0 border rounded-pill ms-n3"
                            type="btn">
                        <i className="fa fa-search"/>
                    </button>

                </div>

            </form>
        </div>)


    // searchItems here is used for searching products
    // from the search box in home page of website

    const renderProducts = () => (
        product && true && true ?
            // product.map((product) =>
            searchItems(product).map((product) =>
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

                                {/*  pic of product and sold-out -->*/}

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

                </div>)
            :
            <p className={"text-center text-danger pt-2 pb-2"}>
                <i className="fa-solid fa-circle-exclamation"></i> Error: load products, refresh page.
            </p>
    )


    return (
        <Fragment>

            {/* Search items box  */}
            <div className={"row"}>
                 {searchBox}
            </div>


            {renderProducts()}

            {product && true && true &&
                !product.length >= 1 &&
                <h6>Sorry, No items found for this category.</h6>
            }

        </Fragment>

    )

}


export default DisplayProductsItems;