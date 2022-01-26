import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { actAddToCartRequest, updataQuantityRequest } from '../../../../redux/actions/cartAction';

const ShowProductDetail = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const product = useSelector((state) => state.products.products);
    const userCart = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();

    var vndCurrency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);

    const onAddToCart = (e) => {
        e.preventDefault();
        if (!user) {
            alert("Bạn cần đăng nhập để mua !");
        } else {
            var result = userCart.filter((usercart) => usercart.product.id === product.id);
            if (result.length === 1) {
                console.log(result)
                let text = "Đã có trong giỏ hàng bạn muốn thêm nữa chứ ?";
                if (window.confirm(text) === true) {
                    result[0].quantity += 1;
                    dispatch(updataQuantityRequest(user.id, result[0].id, result[0]));
                }
            } else {
                console.log(result)
                const data = {
                    product: product,
                    quantity: 1
                }
                dispatch(actAddToCartRequest(user.id, data));
            }
        }
    }

    const onVerify = () => {
        if(!user) {
            alert("Bạn cần đăng nhập để xem trang này !");
        }
    }

    return (
        <>
            <div className="col-md-6">
                <img src={product.img} alt={product.name} width="400px" height="400px" />
            </div>
            <div className="col-md-6">
                <h4 className="text-uppercase text-black-50">{product.type}</h4>
                <h1 className="display-t">{product.name}</h1>
                <h3 className="display-6 fw-bold my-4">{vndCurrency}</h3>
                <p className="lead">{product.detail}</p>
                <button className="btn btn-outline-dark" onClick={onAddToCart}>Thêm vào giỏ hàng</button>
                <NavLink to={user ? "/cart" : ""} className="btn btn-dark ms-2 px-3 py-2" onClick={onVerify}>Đến giỏ hàng</NavLink>
            </div>
        </>
    );
};

export default ShowProductDetail;