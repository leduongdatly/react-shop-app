import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCartRequest } from '../../../redux/actions/cartAction';
import EmptyCart from '../Components/EmptyCart/EmptyCart';
import IsLoading from '../Components/IsLoading/IsLoading';
import NotEmpty from '../Components/NotEmpty/NotEmpty';

const Index = () => {

    const user = JSON.parse(localStorage.getItem("user"));
    const userCart = useSelector((state) => state.cart.products);
    const isLoading = useSelector((state) => state.cart.isLoading);
    const dispatch = useDispatch();

    // if(typeof userCart === "number") {
    //     window.location.reload();
    // }

    useEffect(() => {
        if (user) {
            dispatch(fetchUserCartRequest(user.id));
        }
    }, []);

    const showProduct = () => {
        var result = null;
        if(userCart.length > 0) {
            result = userCart.map((product, index) => {
                return <NotEmpty key={index} product={product} />
            })
        }
        return result;
    }

    const showCart = () => {
        if (userCart.length === 0) {
            return <EmptyCart />;
        } else {
            return showProduct();
        }
    }

    return (
        <div className="container mt-4">
            <div className="row">
                {isLoading ? <IsLoading /> : showCart()}
            </div>
        </div>
    );
};

export default Index;