import React, {Fragment} from "react";
import {connect} from "react-redux";
import Categories from "./products/Categories"
import DisplayProducts from "./products/DisplayProducts"
import FrequentlyAskedQuestions from "../components/FrequentlyAskedQuestions";
import Footer from "../components/Footer"
import DisplayShops from "./shops/DisplayShops"

// home page
const Home = () => {

    return (

        <Fragment>

            <div className="bg-light">
                <div className="container">

                    <div className="text-center p-3">
                        <h1>Buy Now</h1>
                        {/*<i className={"small"}>Cash on Delivery (CoD)</i>*/}
                    </div>

                    {/* show categories */}
                    {/*<Categories/>*/}

                    {/* display all products (included categories) */}
                    <div className="pb-2">
                        <DisplayProducts/>
                    </div>

                </div>
            </div>

            {/* display shops */}

            <DisplayShops />

            <div className={"container"}>

                {/* frequently asked questions */}
                <div className={"pt-2 pb-3"}>
                    <FrequentlyAskedQuestions/>
                </div>
            </div>

            {/* footer */}

            <Footer />


        </Fragment>
    )
        ;
}

export default Home;