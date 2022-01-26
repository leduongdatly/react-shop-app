import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserCartRequest } from '../../../redux/actions/cartAction';
import { fetchProductByIdRequest } from '../../../redux/actions/productAction';
import Loading from '../Components/Loading/Loading';
import ShowProductDetail from '../Components/ShowProductDetail/ShowProductDetail';

const Index = () => {

    const {id} = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoading = useSelector((state) => state.products.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductByIdRequest(id));
        if (user) {
            dispatch(fetchUserCartRequest(user.id));
        }
    }, []);

    return (
        <div>
            <div className="container py-5">
                <div className="row py-4">
                    {isLoading ? <Loading /> : <ShowProductDetail user={user} />}
                </div>
            </div>
        </div>
    );
};

export default Index;