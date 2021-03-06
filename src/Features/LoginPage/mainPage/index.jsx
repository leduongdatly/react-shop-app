import React from 'react';
import Form from "../components/form/Form";

const LoginPage = () => {
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

export default LoginPage;