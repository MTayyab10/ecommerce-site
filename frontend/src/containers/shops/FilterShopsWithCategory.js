import React, {useState} from "react";
import {Link} from "react-router-dom";

const FilterShopsWithCategory = ({filterShops,
                                        setShops,
                                        shopsWithCategories,
                                        shops,
                                        categories_loading,
                                        categories
                                    }) => {

    // Try to set bg colors for btn
    const [bgColor, setBgColor] = useState(null)


    // Render categories
    const renderCategories = () => (

        // here categories are just for showing error
        // if unable to get categories

        categories && true && true ?
            shopsWithCategories.map((category, index) => (

                <span key={category} className={"p-1"}>

                    <button style={{textTransform: "Capitalize"}}
                            className={`btn btn-sm mt-2 rounded-pill
                        ${bgColor !== index ? 
                                "bg-info text-primary bg-opacity-25"
                                : "btn-primary"
                            }`}
                              onClick={() => {
                                setBgColor(bgColor => bgColor === category.id ?
                                    null : index);
                                filterShops(category)
                            }}
                    >
                        {category}
                    </button>
                </span>

            ))
            :
             <p className={"text-danger pt-2"}>
                <i className="fa-solid fa-circle-exclamation"></i> Error: load categories, refresh page.
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
        <div className={"pb-2"}>

            <h4 className="text-secondary">
                Categories
            </h4>

            <div className="d-inline p-1">

                {categories && true && true &&
                    !categories_loading &&

                    <button
                        onClick={() => {
                            setBgColor(null);
                            setShops(shops)
                        }}
                        className={`btn rounded-pill btn-sm mt-2 me-1 
                        ${bgColor == null ?
                            "btn-primary"
                            :
                            "bg-info text-primary bg-opacity-25 "}
                            `}
                    >
                        All
                    </button>
                }

                {categories_loading ?
                    categorySpinner()
                    :
                    renderCategories()
                }

            </div>
        </div>
    )
}

export default FilterShopsWithCategory;