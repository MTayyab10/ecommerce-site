import React from 'react';
import {Routes, Route} from "react-router-dom";
// import { BrowserRouter as Router } from 'react-router-dom';
import Home from "./containers/Home";
import Login from "./containers/accounts/Login";
import Signup from './containers/accounts/Signup';
import Activate from './containers/accounts/Activate';
import ResetPassword from './containers/accounts/ResetPassword';
import ResetPasswordConfirm from './containers/accounts/ResetPasswordConfirm';
import Facebook from './containers/accounts/Facebook';
import Google from './containers/accounts/Google';

import {Provider} from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';
import ResetPasswordMsg from "./components/accounts/ResetPasswordMsg";
import ActivateMsg from "./components/accounts/ActivateMsg";
import ResendActivation from "./containers/accounts/ResendActivation";
import UserPersonalInfo from "./containers/UserPersonalInfo"
import UserData from "./containers/UserData";
import NotFound from './containers/NotFound';
import ResetEmailMsg from "./components/accounts/ResetEmailMsg";
import ResetEmail from "./containers/accounts/ResetEmail";
import ResetEmailConfirm from "./containers/accounts/ResetEmailConfirm";
import SpecificProduct from "./containers/products/SpecificProduct"
import DisplayShops from "./containers/shops/DisplayShops"
import ShopProducts from "./containers/shops/ShopProducts";
import CategorizedProducts from "./containers/products/CategorizedProducts"
import Cart from "./containers/Cart"
import Checkout from "./containers/Checkout"
import DeliveryAddress from "./containers/DeliveryAddress"
import UpdateDeliveryAddress from "./components/delivery_address/UpdateDeliveryAddress"
import DisplayOrders from "./containers/orders/DisplayOrders"
import SpecificOrderDetail from "./containers/orders/SpecificOrderDetail"
import HelpCenter from "./components/HelpCenter"

const App = () => (

    <Provider store={store}>
        {/*<Router>*/}
        <Layout>
            <Routes>
                <Route exact path='/' element={<Home/>}/>

                <Route exact path='/login' element={<Login/>}/>
                <Route exact path='/signup' element={<Signup/>}/>

                <Route exact path='/google' element={<Google/>}/>
                <Route exact path='/facebook' element={<Facebook/>}/>

                {/* account & personal info */}
                <Route exact path='/account' element={<UserData />}/>
                <Route exact path={'/my_info'} element={<UserPersonalInfo />} />

                {/* help center */}
                <Route exact path={"/help"} element={<HelpCenter />} />


                <Route exact path='/activate/:uid/:token' element={<Activate/>}/>
                <Route exact path='/activate/sent' element={<ActivateMsg/>}/>
                <Route exact path={'/resend/activation'} element={<ResendActivation/>}/>

                <Route exact path='/reset-password' element={<ResetPassword/>}/>
                <Route exact path='/reset-password/sent' element={<ResetPasswordMsg/>}/>
                <Route exact path='/password/reset/confirm/:uid/:token'
                       element={<ResetPasswordConfirm/>}/>

                <Route exact path='/reset-email' element={<ResetEmail/>}/>
                <Route exact path='/reset-email/sent' element={<ResetEmailMsg/>}/>
                <Route exact path='/email/reset/confirm/:uid/:token'
                       element={<ResetEmailConfirm/>}/>


                {/* specific/one product detail */}
                <Route exact path={'/:category/:name/:id'}
                       element={<SpecificProduct/>}/>

                {/* Shops */}
                <Route exact path={"/shops"} element={<DisplayShops />} />

                {/* shop products */}
                <Route exact path={'/shops/:name'} element={<ShopProducts/>} />

                {/* categorized products */}
                <Route exact path={"/products/:category/"} element={<CategorizedProducts/>}/>

                {/* Cart */}
                <Route exact path={'/cart'} element={<Cart />} />

                {/* Checkout */}
                <Route exact path={'/checkout'} element={<Checkout />} />

                {/* Delivery address's */}
                <Route exact path={'/delivery_address'} element={<DeliveryAddress />} />
                <Route exact path={'/update_address/:id'} element={<UpdateDeliveryAddress />} />

                {/* Get orders */}
                <Route exact path={'/my_orders'} element={<DisplayOrders />} />

                <Route exact path={'/order/:id'} element={<SpecificOrderDetail />} />


                {/* If none path matched then redirect to NotFound */}
                <Route path="*" element={<NotFound/>}/>

            </Routes>
        </Layout>
        {/*</Router>*/}
    </Provider>
);

export default App;
