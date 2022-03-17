import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useUserAuth } from "../../../../context/UserAuthContext";
import { db } from '../../../../firebase/firebase-config';
import { addToCart } from '../../../../redux/actions/cartAction';
import Loading from "../../../../common/loading/Loading";

const ShowProductDetail = () => {

    const { id } = useParams();
    const cartCollectionRef = collection(db, "cart");
    const products = useSelector((state) => state.products.products);
    const cartData = useSelector((state) => state.cart.userCartData);
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [isExist, setIsExist] = useState(false);
    const [data, setData] = useState({});
    const { user } = useUserAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (products.length > 0) {
            products.map((product) => {
                if (user && product.id === id) {
                    setProduct(product);
                    setData(prev => ({
                        ...prev,
                        uid: user.uid,
                        pid: product.id,
                        desc: product.desc,
                        img: product.img,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        type: product.type,
                    }))
                    setIsLoading(false);
                } else if (product.id === id) {
                    setProduct(product)
                    setIsLoading(false);
                }
            })
        }
    }, [products]);

    useEffect(() => {
        if (cartData.length > 0 && user) {
            cartData.map((cartItem) => {
                if (cartItem.pid === id && user.uid === cartItem.uid) {
                    setIsExist(true);
                    setIsLoading(false);
                }
            })
        }
    }, [cartData]);

    var changedCurrency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);

    const onAddToCart = async (e) => {
        e.preventDefault();
        if (user === null) {
            alert("Bạn phải đăng nhập để thực hiện hành động !");
            navigate("/login");
        } else {
            try {
                await addDoc(cartCollectionRef, data);
                dispatch(addToCart(data));
            } catch (err) {
                alert(err);
            }
        }
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <div className="col-md-6">
                <img src={product.img} alt={product.name} width="400px" height="400px" />
            </div>
            <div className="col-md-6">
                <h4 className="text-uppercase text-black-50">Tên sản phẩm: {product.name}</h4>
                <h1 className="display-t">Loại: {product.type}</h1>
                <h3 className="display-6 fw-bold my-2">Giá: {changedCurrency}</h3>
                <p className="lead">Mô tả: {product.desc}</p>
                {
                    isExist ?
                        <div className="btn btn-outline-danger disabled" >Đã ở trong giỏ hàng</div>
                        :
                        <button className="btn btn-outline-dark" onClick={onAddToCart} >Thêm vào giỏ hàng</button>
                }
                <NavLink to={user ? "/cart" : "/login"} className="btn btn-dark ms-2 px-3 py-2">Đến giỏ hàng</NavLink>
            </div>
        </>
    );
};

export default ShowProductDetail;