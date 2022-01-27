import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductRequest } from "../../../redux/actions/productAction";
import Loading from '../Components/Loading/Loading';
import ShowProducts from '../Components/ShowProducts/ShowProducts';

const Index = () => {

    const isLoading = useSelector((state) => state.products.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductRequest());
    }, []);
    
    return (
        <div>
            <div className="container m-6 py-5">
                {/* <div className="row"> */}
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center">Tất cả sản phẩm</h1>
                    </div>
                    <div className="row justify-content-center">
                        {isLoading ? <Loading /> : <ShowProducts />}
                    </div>
                {/* </div> */}
            </div>
        </div>
    );
};

export default Index;