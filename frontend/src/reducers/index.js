import { combineReducers } from 'redux';
import alert from "./alert"
import auth from './auth';
import categories from "./categories"
import shops from "./shops"
import products from "./products"
import cart from "./cart"
import delivery_address from "./delivery_address"
import orders from "./orders"

export default combineReducers({
    alert,
    auth,
    categories,
    shops,
    products,
    cart,
    delivery_address,
    orders,
});
