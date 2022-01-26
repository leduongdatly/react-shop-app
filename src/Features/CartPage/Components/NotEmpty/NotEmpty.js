import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteItemRequest, updataQuantityRequest } from '../../../../redux/actions/cartAction';

const NotEmpty = (props) => {

    let { product } = props;
    const dispatch = useDispatch();

    const vndCurrency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.product.price);
    const totalPrice = product.quantity * product.product.price;
    const totalVnCurrency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);

    const handleDecrement = (user_id, cart_id) => {
        if(product.id === cart_id) {
            product.quantity -= 1;
        }
        if (product.quantity > 0) {
            dispatch(updataQuantityRequest(user_id, cart_id, product));
        }
        else {
            dispatch(deleteItemRequest(user_id, cart_id));
        }
    }

    const handleIncrement = (user_id, cart_id) => {
        if(product.id === cart_id) {
            product.quantity += 1;
        }
        dispatch(updataQuantityRequest(user_id, cart_id, product));
    }


    return (
        <div className="col col-12 d-flex align-items-center justify-content-center mt-4">
            <div className="col-md-4">
                <img src={product.product.img} alt={product.product.name} height="200px" width="200px" />
            </div>
            <div className="col-md-4">
                <h3>{product.product.name}</h3>
                <p className="lead fw-bold">{product.quantity} x {vndCurrency} = {totalVnCurrency}</p>
                <button className="btn btn-outline-dark me-4" onClick={() => handleDecrement(product.userId, product.id)}>
                    <i className="fa fa-minus"></i>
                </button>
                <button className="btn btn-outline-dark me-4" onClick={() => handleIncrement(product.userId, product.id)}>
                    <i className="fa fa-plus"></i>
                </button>
            </div>
        </div>
    );
};

export default NotEmpty;