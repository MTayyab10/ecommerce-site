import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {get_products} from "../../actions/products"
import {connect} from "react-redux";
import DisplayProducts from "./DisplayProducts"
import Categories from "./Categories";

const CategorizedProducts = ({loading, products, get_products}) => {

    const {category} = useParams();

    // set search query to empty string

    const [query, setQuery] = React.useState("");

    // const [items, setItems] = React.useState([]);

    //  set search parameters like name, price etc.
    //  just add it to this array
    const [searchParam] = useState(["name", "price"]);

    // fetch products from actions/products.js

    useEffect(() => {
        get_products();
    }, [])

    // display total found items

    let foundProducts = 0;
    products && true && true &&
    products.map(product =>
        (product.category.name === category &&
            <span>{foundProducts += 1}</span>
        )
    )

    // Items found of same category BreadCrumb

    const breadCrumb = (
        <nav aria-label="breadcrumb col-12">
            <ol className="breadcrumb">

                <li className="breadcrumb-item small" aria-current="page"
                    style={{textTransform: "Capitalize"}}>
                    {category.toLowerCase()}
                </li>

                <li className="breadcrumb-item small">
                    <i>
                        <strong>
                            {foundProducts}
                        </strong> items found
                    </i>
                </li>

                {/* Bug | Error, after clicking it should not */}
                {/* show the selected category tag */}

                <li className="offset-1 small">
                    <Link to="/"
                          className="text-decoration-none">

                        {/*     <button */}
                        {/*      className="text-decoration-none"*/}
                        {/*     onClick={() => window.location.reload(false)}*/}
                        {/*> Or can refresh the page to solve this issue  */}
                        <i className="fas fa-times
                                   small"/> clear
                    </Link>
                </li>
            </ol>

        </nav>
    )

    // Search box for searching products

    const SearchBox = (
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
                    {/*  above name=q is very important */}

                    <button className="btn btn-outline-secondary butn
                       bg-white border-start-0 border rounded-pill ms-n3"
                            type="submit">
                        <i className="fa fa-search"/>
                    </button>

                </div>

            </form>
        </div>)

    // Find products/items with Category

    function searchItems(items) {
        return products && true && true &&
            products.filter((item) => {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(query.toLowerCase()) > -1
                    );
                });
            });
    }

    // Render only Categorized Products

    const CategorizedProducts = () => (
        products && true && true &&
        searchItems(products).filter(product =>
            product.category.name === category
        ).map(product => (
            <div key={product.id} className="col-md-2 col-6 gx-1 gy-1">

                <Link className="text-decoration-none
                                 text-reset"
                    // to={}
                      to={{
                          pathname: `/${product.category.name}/${product.name}/${product.id}`,
                          state: {product}
                      }}
                >
                    <div className="card card1">

                        <img
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
        ))
    )

    // Loading spinner

    const CategoryProductsSpinner = () => (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary mt-2 " role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )

    return (

        <div className="bg-light">

            <div className="text-center p-3">
                <h1>Buy Now</h1>
            </div>

            <div className={"container"}>
                <Categories/>
            </div>

            {/* Search Bar for search products */}

            {SearchBox}

            <div className={"container pb-3"}>
                <div className="row">

                    {/* Breadcrumb for showing items found */}

                    {breadCrumb}

                    {loading ?
                        <CategoryProductsSpinner />
                        :
                        <CategorizedProducts />
                    }


                </div>
            </div>
        </div>

    )
}

const mapStateToProps = state => ({
    loading: state.products.loading,
    products: state.products.products
})

export default connect(mapStateToProps, {
    get_products
})(CategorizedProducts)