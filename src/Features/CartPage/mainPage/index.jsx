import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUserAuth } from '../../../context/UserAuthContext';
import { db } from '../../../firebase/firebase-config';
import { getAllCartData, getUserCartData } from '../../../redux/actions/cartAction';
import EmptyCart from "../components/emptyCart/EmptyCart";
import NotEmpty from '../components/notEmpty/NotEmpty';

const CartPage = () => {

    const cartData = useSelector((state) => state.cart.cartData);
    const data = useSelector((state) => state.cart.userCartData);
    const dispatch = useDispatch();
    const { user } = useUserAuth();
    const cartCollectionRef = collection(db, "cart");

    useEffect(() => {
        if (cartData.length > 0 && user) {
            var item = cartData.filter((cartDataItem) => cartDataItem.uid === user.uid);
            dispatch(getUserCartData(item)) ;
        };
    }, [cartData]);

    useEffect(() => {
        const getCart = async () => {
            const dataCart = await getDocs(cartCollectionRef);
            dispatch(getAllCartData(dataCart.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }))));
        }

        getCart();
    }, []);

    const showCartItem = () => {
        var result = null;
        if (data && data.length > 0) {
            result = data.map((product, index) => {
                return <NotEmpty key={index} product={product} />
            })
        }
        return result;
    }

    const showEmpty = () => {
        if (data.length === 0) {
            return <EmptyCart />
        } else {
            return showCartItem()
        }
    }

    return (
        <div className="container mt-4">
            <div className="row">
                {showEmpty()}
            </div>
        </div>
    );
};

export default CartPage;