import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserRequest } from '../../../redux/actions/userAction';
import Form from "../Components/Form/Form";

const Index = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserRequest());
    }, []);

    return (
        <div className="container m-6 py-5">
            <div className="row">
                <div className="col-12 mb-4">
                    <h1 className="text-center">Đăng nhập</h1>
                </div>
                <Form />
            </div>
        </div>
    );
};

export default Index;