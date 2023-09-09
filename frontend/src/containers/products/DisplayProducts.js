import React, {Fragment, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {connect} from "react-redux";
import './ProductsStyle.css'
import {get_products} from "../../actions/products"
import {get_categories} from "../../actions/categories"
import {
    add_item,
    get_item_total,
} from "../../actions/cart"
import DisplayProductsItems from "../../components/products/DisplayProductsItems"
import FilterProductsWithCategory from "./FilterProductsWithCategory"
import ProductsPagination from "./ProductsPagination"

const DisplayProducts = (
    {
        loading,
        products,
        get_products,
        categories_loading,
        categories,
        get_categories,
        add_item,
        get_item_total

    }) => {

    // fetch product from actions/products.js
    useEffect(() => {
        get_products();
        get_categories();
        add_item();
        get_item_total();
        window.scrollTo(0, 0);

    }, [])


    // Filter products
    // This states doesn't work correctly below one is ok
    // const [product, setProduct] = useState(products);
    const [product = products, setProduct] = useState();

    // Filter products by category
    // spread operator will display all the values from Categories
    // while Set will only allow the single value
    // Display Categories in FilterProductsWithCategory.js

    const productsWithCategories = [...new Set(categories && true && true &&
        categories.map((category) => category.name))];


    // filter products with Category
    const filterProducts = (category) => {
        const newProduct = products.filter((product) => {
            console.log(product.category.name, "==", category)
            return product.category.name === category;
        });
        setProduct(newProduct);
    };

    // Display categories from FilterProductsWithCategory components
    const filterProductByCategory = () => {
        return (
            <FilterProductsWithCategory
                products={products}
                productsWithCategories={productsWithCategories}
                filterProducts={filterProducts}
                setProduct={setProduct}
                // below are just for showing loading spinner & error
                // if unable to get categories
                categories_loading={categories_loading}
                categories={categories}
            />
        )
    }


    // Render all products also include Pagination + SearchBox
    const renderProducts = () => {
        return (
            // In ProductsPagination have added DisplayProductsItems
            <ProductsPagination
                product={product}
                productsPerPage={18} // how many per page
                // Note searchItems & SearchBox added into
                // DisplayProductsItems.js component
            />
            // <DisplayProductsItems
            //     product={product}
            //     searchItems={searchItems}
            // />
        )
    }

    // Products loading spinner
    const productSpinner = () => (
        <div className="d-flex justify-content-center pb-4">
            <div className="spinner-border text-primary mt-2 " role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )

    return (

        <Fragment>
            {/* Display categories */}

            {filterProductByCategory()}

            {/* Products with Pagination & SearchBox */}

            <div className={"pb-3"}>
                <div className="row">

                    {loading ?
                        productSpinner()
                        :
                        renderProducts()
                    }

                </div>
            </div>

        </Fragment>
    )
}

const mapStateToProps = state => ({
    categories: state.categories.categories,
    categories_loading: state.categories.loading,

    loading: state.products.loading,
    products: state.products.products,
    total_items: state.cart.total_items
});

export default connect(mapStateToProps, {
    get_products,
    get_categories,
    add_item,
    get_item_total
})(DisplayProducts);