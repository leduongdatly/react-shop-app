import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useDispatch } from 'react-redux';
import { db } from "../../../../firebase/firebase-config";
import { decreaseQuantity, deleteUserCartProduct, increaseQuantity } from "../../../../redux/actions/cartAction";
import { useUserAuth } from '../../../../context/UserAuthContext';

const NotEmpty = (props) => {

    const { product } = props;
    const dispatch = useDispatch();
    var changedCurrency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);
    const total = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.quantity * product.price);
    const { deleteUserCartProductFirebase, increaseQuantityFirebase, decreaseQuantityFirebase } = useUserAuth();

    const onIncrease = async (id, qty, pid) => {
        await increaseQuantityFirebase(id, qty);
        dispatch(increaseQuantity(pid));
    }

    const onDecrease = async (id, qty, pid) => {
        await decreaseQuantityFirebase(id, qty);
        dispatch(decreaseQuantity(pid));
    }

    const onDeleteProduct = async (id) => {
        await deleteUserCartProductFirebase(id);
        dispatch(deleteUserCartProduct(id))
    }

    return (
        <div className="col col-12 d-flex align-items-center justify-content-center mt-4">
            <div className="col-md-4">
                <img src={product.img} alt={product.name} height="200px" width="200px" />
            </div>
            <div className="col-md-4">
                <h3>{product.name}</h3>
                <p className="lead fw-bold">{product.quantity} x {changedCurrency} = {total}</p>
                <button className={product.quantity > 1 ? "btn btn-outline-dark me-4" : "btn btn-outline-dark me-4 disabled"} onClick={() => onDecrease(product.id, product.quantity - 1, product.pid)}>
                    <i className="fa fa-minus"></i>
                </button>
                <button className="btn btn-outline-dark me-4" onClick={() => onIncrease(product.id, product.quantity + 1, product.pid)}>
                    <i className="fa fa-plus"></i>
                </button>
                <button className="btn btn-outline-danger me-4" onClick={() => onDeleteProduct(product.id)}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    );
};

export default NotEmpty;