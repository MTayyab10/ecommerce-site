import React, {Fragment, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import DisplayProductsItems from "../../components/products/DisplayProductsItems";

const ProductsPagination = ({product, productsPerPage}) => {

    // Here we use shops offsets; we could also use page offsets
    // following the API or data you're working with.

    const [productOffset, setProductOffset] = useState(0);

    // Simulate fetching items from another resources.
    // from an API endpoint with useEffect and useState)

    const endOffset = productOffset + productsPerPage;
    console.log(`Loading items from ${productOffset} to ${endOffset}`);


    const currentProducts = product && product.slice(productOffset, endOffset)

    const pageCount = Math.ceil(product && product.length / productsPerPage)
    console.log("Page count is: ", pageCount)

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * productsPerPage) % product.length;
        console.log(
            `User requested page number ${event.selected},
             which is offset ${newOffset}`
        );
        setProductOffset(newOffset);
    };

    {/* Pagination buttons */}

    const paginationBtn = <div className={"row"}>
        <div className={"offset-md-5 col-md-5 offset-3 col-7 pt-4"}>

            <ReactPaginate
                previousLabel={<i className="fa fa-chevron-left"/>}
                nextLabel={<i className="fa fa-chevron-right"/>}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="...."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                activeClassName="active"
            />
        </div>
    </div>

    return (
        <Fragment>
            {/* This ProductsPagination component add to
             in DisplayProducts */}

            <DisplayProductsItems
                product={currentProducts}
            />

            {/* If products then show Pagination btn */}

            {product && paginationBtn}

            {/* Pagination btn  */}

            {/*<div className={"row"}>*/}
            {/*    <div className={"offset-md-5 col-md-5 offset-3 col-7 pt-4"}>*/}

            {/*        <ReactPaginate*/}
            {/*            previousLabel={<i className="fa fa-chevron-left"/>}*/}
            {/*            nextLabel={<i className="fa fa-chevron-right"/>}*/}
            {/*            pageClassName="page-item"*/}
            {/*            pageLinkClassName="page-link"*/}
            {/*            previousClassName="page-item"*/}
            {/*            previousLinkClassName="page-link"*/}
            {/*            nextClassName="page-item"*/}
            {/*            nextLinkClassName="page-link"*/}
            {/*            breakLabel="...."*/}
            {/*            breakClassName="page-item"*/}
            {/*            breakLinkClassName="page-link"*/}
            {/*            pageCount={pageCount}*/}
            {/*            marginPagesDisplayed={2}*/}
            {/*            pageRangeDisplayed={2}*/}
            {/*            onPageChange={handlePageClick}*/}
            {/*            containerClassName="pagination"*/}
            {/*            activeClassName="active"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}
        </Fragment>
    );
}

export default ProductsPagination;