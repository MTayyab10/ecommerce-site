import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";
import {get_categories} from "../../actions/categories";
import {Link} from "react-router-dom";


const Categories = ({loading, categories, get_categories}) => {

    const [bgColor, setBgColor] = useState(null);

    // Fetch all categories

    useEffect(() => {
        get_categories();
    }, []);

    // Render all Categories function

    const renderCategories = () => (
        categories && true && true ?
            categories.map((category, index) => (

                <Link key={category.id} to={{
                    pathname: `/products/${category.name}`,
                    state: {index}
                }} className="text-decoration-none p-1 single_content"
                      id="content">

                    <button style={{textTransform: "Capitalize"}} onClick={() =>
                        setBgColor(bgColor => bgColor === category.id ?
                            null : index)}
                            className={bgColor !== index ? "btn bg-info text-primary " +
                                "bg-opacity-25 rounded-pill btn-sm mt-2"
                                : "btn btn-primary rounded-pill btn-sm mt-2"
                            }>
                        {category.name.toLowerCase()}
                    </button>

                </Link>
            ))
            : <p className={"text-danger"}>
                Something went wrong, please try to refresh page.
            </p>
    )

    // Category loading spinner

    const categorySpinner = () => (

        <div className="ms-1 p-1">
            <span className="text-primary spinner-border
            spinner-border-lg" role="status" aria-hidden="true"/>
        </div>
    )

    return (
        <Fragment>
            <div className="pb-2">

                <h3 className="text-secondary">
                    Categories
                </h3>

                <div className="d-inline ">
                    <Link to="/" className="text-decoration-none p-1 ">

                        {!loading &&
                            categories && true && true &&
                            categories &&

                            <button
                                onClick={() => setBgColor(null)}
                                className={bgColor == null ?
                                    "btn btn-primary rounded-pill " +
                                    "btn-sm mt-2 tags"
                                    :
                                    "btn bg-info bg-opacity-25 " +
                                    "text-primary rounded-pill " +
                                    "btn-sm mt-2 tags"}
                            >
                                All
                            </button>
                        }
                    </Link>

                </div>

                {/* If categories still fetching then show spinner */}

                {loading ?

                    categorySpinner()
                    :
                    renderCategories()
                }
            </div>

        </Fragment>
    );
}

// How to get data from action to frontend
// https://github.com/MTayyab10/shop_time/blob/main/frontend/src/components/LandingPage.js

const mapStateToProps = state => ({
    loading: state.categories.loading,
    categories: state.categories.categories,
});

export default connect(mapStateToProps, {
    get_categories
})(Categories);
