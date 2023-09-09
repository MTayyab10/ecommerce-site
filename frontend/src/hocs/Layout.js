import React, { useEffect, Fragment } from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user, refresh } from '../actions/auth';
import OfferNoticeMsg from "../components/OfferNoticeMsg";
import {get_items, get_total, get_item_total} from "../actions/cart"
import {get_orders} from "../actions/orders"

const Layout = ({ checkAuthenticated,
                    load_user, refresh,
                    get_item_total,
                    get_items,
                    get_total,
                    get_orders,
                    children }) => {

    useEffect(() => {

        checkAuthenticated();
        load_user();
        refresh();

        get_items();
        get_total();
        get_item_total();

        get_orders();

    }, []);

    return (
        <Fragment>

            {/* For offer, notice */}
            <OfferNoticeMsg />

            <Navbar />
            {children}
        </Fragment>
    );
};

export default connect(null, {
    checkAuthenticated,
    load_user,
    refresh,

    get_item_total,
    get_items,
    get_total,

    get_orders
})(Layout);
