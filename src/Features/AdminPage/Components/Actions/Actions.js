import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addProductRequest, updateProductRequest } from '../../../../redux/actions/productAction';
import ActionsForm from './ActionsForm';

const Actions = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const onGetData = (data) => {
        if (data.name === "" || data.type === "" || data.detail === "" || data.price === "" || data.img === "" || data.quantity === "") {
            alert("Vui lòng điền đầy đủ thông tin !");
        } else {
            if (data.id) {
                dispatch(updateProductRequest(data.id, data));
                navigate("/admin/products");
            } else {
                dispatch(addProductRequest(data));
                navigate("/admin/products");
            }
        }
    }

    return (
        <div className="mt-2">
            <div className="col-12 mb-4">
                <h1 className="text-center">{id ? "Cập nhật sản phẩm" : "Thêm mới sản phẩm"}</h1>
            </div>
            <ActionsForm onGetData={onGetData} />
        </div>
    );
};

export default Actions;