import React, {useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import facebookImg from "../containers/accounts/Continue with Fb Btn.PNG"


const CartItem = ({
                      isAuthenticated,
                      item,
                      quantity,
                      update_item,
                      remove_item,
                      setAlert,
                      render,
                      setRender,
                      showViewProduct = true,
                      showRemoveProduct = true,
                      showUpdateProduct = true,
                      showQuantity = true
                  }) => {

    const [formData, setFormData] = useState({
        item_count: 1
    });

    const {item_count} = formData;

    useEffect(() => {
        if (quantity)
            setFormData({
                ...formData,
                item_count: quantity
            });
    }, [quantity]);

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = e => {
        e.preventDefault();

        const fetchData = async () => {
            try {
                if (item.product.quantity >= item_count) {
                    await update_item(item, item_count);
                    // setAlert("Your product item updated.", "info")
                } else {
                    console.log("Not enough items in stock")
                    setAlert(`Not enough in stock, only 
                    ${item.product.quantity} available.`, "error")

                    // setAlert('Item is out of stock ', 'danger');
                }
                setRender(!render);
            } catch (err) {

            }
        };

        fetchData();
    };

    const quantityOrdered = () => {

        if (showQuantity && quantity) {
            return (
                <td className='text-muted fw-bold'>
                    {/*Quantity Requested:*/}
                    {quantity}
                </td>
            );
        }
    };

    const showAdjustQuantityButton = () => {

        if (showUpdateProduct) {
            return (
                <form onSubmit={e => onSubmit(e)}
                      className={"small p-0 m-0"}>

                    <td className="small">
                        {/*<label htmlFor="item_count">*/}
                        {/*    Adjust*/}
                        {/*</label>*/}
                        <select className="form-control p-2 small"
                            name="item_count"
                            onChange={e => onChange(e)}
                            value={item_count}
                        >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>

                        </select>
                    </td>
                    <button className="btn btn-sm small p-0 m-0"
                        type="submit"
                    >
                        change
                    </button>
                </form>
            );
        }
    };

    const showViewProductButton = () => {
        if (showViewProduct && isAuthenticated) {
            return (
                // :category/:name/:id
                <Link
                    to={`/${item && true && true &&
                    item.product.category.name}/${item && true && true &&
                    item.product.name}/${item && true && true &&
                    item.product.id}`}
                >
                    <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
                        View Product
                    </button>
                </Link>
            );
        }
    };

    const removeItemHandler = async () => {
        await remove_item(item);
        setAlert("Your product item removed.", "info")

        setRender(!render);
    };

    const showRemoveProductButton = () => {

        if (showRemoveProduct) {
            return (
                <button
                    className="btn btn-sm btn-outline-danger small"
                    onClick={removeItemHandler}
                >
                    {/*Remove Product*/}
                    <i className="far fa-trash-alt small"></i>
                </button>
            );
        }
    };

    const cartItemImg = <div className='col-3'>
        <div style={{height: '180px', overflow: 'hidden'}}>
            <img
                className='card-img-top'
                alt='Product Visual'
                src={
                    item && true && true &&
                    item.product && true && true ?
                        item.product.img : ''
                }
            />
        </div>
    </div>

    const detailOfItem = <div className='col-6'>
        <h6 className='card-title'>
            {
                item && true && true &&
                item.product && true && true &&
                item.product.name
            }
        </h6>
        <p className='card-text mt-3'>
            {
                item && true && true &&
                item.product && true && true &&
                item.product.description.substring(0, 100)
            }...
        </p>
        {quantityOrdered()}
        {showAdjustQuantityButton()}
        {showViewProductButton()}
        {showRemoveProductButton()}
    </div>

    const totalPrice = <div className='col-3'>
        <p className='card-text text-muted'>
            Price:
        </p>
        <p>
                        <span
                            className='mr-2 text-muted'
                            style={{textDecoration: 'line-through', fontSize: '16px'}}
                        >
                            ${
                            item && true && true && item.product && true && true &&
                            item.product.compare_price
                        }
                        </span>
            <span
                style={{fontSize: '18px', color: '#b12704'}}
            >
                Pkr. {
                item && true && true &&
                item.product && true && true &&
                item.product.price
            }
                        </span>
        </p>
        <p className='card-text text-muted mt-5'>
            {
                item && true && true &&
                item.product && true && true &&
                item.product.quantity > 0 ? (
                    <span className='text-success'>
                                    In Stock
                                </span>
                ) : (
                    <span className='text-danger'>
                                    Out of Stock
                                </span>
                )
            }
        </p>
        <p className='card-text text-muted'>
            Added {
            moment(
                item && true && true &&
                item.product && true && true ? (
                    item.created_date
                ) : (
                    ''
                )
            ).fromNow()
        }
        </p>
    </div>

    // Cart Items like card, img, price, qty, info

    const cartItems = () => (
        <div className="row small">

            {/* Img & name */}

            <div className="col-md-2 col-3 ">

                <Link className="text-decoration-none text-reset"
                      to={`/${item.product.category.name}/${item.product.name}/${item.product.id}`}>
                    <img
                        style={{
                            width: "100px",
                            height: "50px",
                            objectFit: "cover"
                        }}
                        src={item.product.img}
                        // data-src="{{ item.product.img.url }}"
                        // style="width: 80px; height: 70px;"
                        // src="https://via.placeholder.com/150?text={{ item.product.name }}"
                        className="lazy img-fluid " alt=""/>

                    {/* Product name */}

                    <h6 className="mt-1 small"
                        style={{textTransform: "Capitalize"}}>
                        {item.product.name.toLowerCase()}
                    </h6>

                </Link>

            </div>

            {/* Price, Quantity, Total */}

            <div className="table-responsive col-md-10 col-9">
                <table className="table table-borderless table-sm">

                    <thead>

                    <tr className="small">
                        <th className="">Price</th>
                        <th className="">Quantity</th>
                        <th className="">Total</th>
                        <th className="">Remove</th>

                    </tr>

                    </thead>

                    <tbody>

                    <tr className="small">
                        {/* if you have discounted price */}
                        {
                            item && true && true &&

                        item.product.discount ?

                            <td className="col-md-4 col-4 small">
                                Rs. {item.product.discount_price}
                                {/*{{item.product.discount_price}}*/}
                            </td>
                            :
                            <td className="col-md-4 col-4 small">
                                Rs. {item && true && true &&
                                item.product && true && true &&
                                item.product.price}
                            </td>
                        }

                        <td className="col-md-4 col-5 small">

                            <span className="small"
                                  style={{fontFamily: "sans-serif Roboto"}}>

                                         {/*{quantityOrdered()}*/}

                                {showAdjustQuantityButton()}

                                            {/*<button className={"btn btn-sm"}>*/}
                                            {/*    <i className="fas fa-minus"></i>*/}
                                            {/*</button>*/}

                            </span>

                            {/*<button data-product="{{ item.product.id }}"*/}
                            {/*        data-action="remove"*/}
                            {/*        className="update-cart btn btn-sm text-secondary">*/}
                            {/*    <i className="fas fa-minus"></i>*/}
                            {/*</button>*/}
                        </td>

                        {/*{quantityOrdered()}*/}
                        {/*{showAdjustQuantityButton()}*/}
                        {/*{showViewProductButton()}*/}
                        {/*{showRemoveProductButton()}*/}

                        <td className="col-md-4 col-4 small">
                            Rs. {item && true && true &&
                            item.product && true && true &&
                            item.product.discount > 0 ?
                            (item.product.price - item.product.discount) * quantity
                            :
                            item.product.price * quantity}
                        </td>

                        <td className="col-md-4 col-4 small">
                            {showRemoveProductButton()}
                        </td>

                    </tr>

                    </tbody>
                </table>

                <hr/>

            </div>
        </div>
    )

    return (
        <Fragment>

            {/*  Card , Img, price, qty info */}

            <div className="row">

                {cartItems()}

            </div>

        </Fragment>

//     <div className='card mb-5' style={{padding: '20px 30px'}}>
        // <div className='row'>
        //
        // {/*{cartItemImg}*/}
        // {/*{detailOfItem}*/}
        // {/*{totalPrice}*/}
        //
        // </div>
        // </div>
    );
};

export default CartItem;