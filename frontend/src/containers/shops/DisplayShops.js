import React, {useEffect, useState} from "react";
import {get_categories} from "../../actions/categories"
import {get_shops} from "../../actions/shops"
import {connect} from "react-redux";
import DisplayShopsItems from "../../components/shops/DisplayShopsItems"
import FilterShopsWithCategory from "./FilterShopsWithCategory"
import ShopsPagination from "./ShopsPagination"
import ReactPaginate from "react-paginate";

const DisplayShops = ({
                          categories,
                          categories_loading,
                          get_categories,
                          get_shops,
                          shops,
                          loading
                      }) => {

    // fetch shops API

    useEffect(() => {
        get_shops()
        get_categories()
        window.scroll(0, 0)
    }, [])

    // Filter Shops with category
    // This states doesn't work correctly
    // const [shop, setShop] = useState(shops);
    // below one is ok

    const [shop = shops, setShop] = useState();


    // Filter Shops by category
    // spread operator will display all the values from Categories
    // while Set will only allow the single value
    // Display Categories in FilterShopsWithCategory.js

    const shopsWithCategories = [...new Set(categories && true && true &&
        categories.map((category) => category.name))];


    // filter shops with category
    const filterShops = (category) => {
        const newShop = shops.filter((shop) => {
            console.log(shop.category.name, "==", category)
            return shop.category.name === category;
        });
        setShop(newShop);
    };

    // Filter Shops by Categories
    const filterShopsByCategory = () => {
        return (
            <FilterShopsWithCategory
                shops={shops}
                shopsWithCategories={shopsWithCategories}
                filterShops={filterShops}
                setShops={setShop}
                // below are just for showing loading spinner & error
                // if unable to get categories
                categories_loading={categories_loading}
                categories={categories}
            />
        )
    }


    // render all shops
    const renderShops = () => {
        return (
            // In ShopPagination have added DisplayShopsItems
            <ShopsPagination
                shop={shop}
                shopsPerPage={6}
            />
            // <DisplayShopsItems
            //     shop={shop}
            // />

        )
    }

    // Shops loading spinner
    const shopsSpinner = () => (
        <div className="d-flex justify-content-center pb-4">
            <div className="spinner-border text-primary mt-2 " role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )

    return (
        // <div className="bg-light">
        <div className="container pb-2">

            <div className="text-center p-3">
                <h2>Shops</h2>
            </div>

            {/* Categories for shops */}
            {filterShopsByCategory()}

            {/* Render shops including Pagination */}

            <div className={"pb-3 pt-3"}>
                <div className="row">

                    {loading ?
                        shopsSpinner()
                        :
                        renderShops()
                    }

                </div>
            </div>

        </div>
        // </div>
    )

}

const mapStateToProps = state => ({
    categories: state.categories.categories,
    categories_loading: state.categories.loading,

    loading: state.shops.loading,
    shops: state.shops.shops
})

export default connect(mapStateToProps, {
    get_categories,
    get_shops
})(DisplayShops);
