import React, {Fragment, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import DisplayShopsItems from "../../components/shops/DisplayShopsItems";

const ShopsPagination = ({shopsPerPage, shop}) => {

    // Here we use shops offsets; we could also use page offsets
    // following the API or data you're working with.

    const [shopOffset, setShopOffset] = useState(0);

    // Simulate fetching items from another resources.
    // from an API endpoint with useEffect and useState)

    const endOffset = shopOffset + shopsPerPage;
    console.log(`Loading items from ${shopOffset} to ${endOffset}`);


    const currentShops = shop && shop.slice(shopOffset, endOffset)

    const pageCount = Math.ceil(shop && shop.length / shopsPerPage)
    console.log("Page count is: ", pageCount)

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * shopsPerPage) % shop.length;
        console.log(
            `User requested page number ${event.selected},
             which is offset ${newOffset}`
        );
        setShopOffset(newOffset);
    };

    return (
        <Fragment>

            {/* This ShopsPagination component add to
             in DisplayProducts */}

            <DisplayShopsItems
                shop={currentShops}
            />

            <div className={"row"}>

                <div className={"offset-md-5 col-md-5 offset-3 col-8 pt-4"}>

                    <ReactPaginate
                        previousLabel={<i className="fa fa-chevron-left"/>}
                        nextLabel={<i className="fa fa-chevron-right"/>}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={pageCount}
                        marginPagesDisplayed={10}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName="pagination text-center"
                        activeClassName="active"
                    />
                </div>
            </div>
        </Fragment>
    );
}

export default ShopsPagination;