import React from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../../../../redux/actions/productAction';
import ActionsForm from './ActionsForm';
import { useUserAuth } from '../../../../context/UserAuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const Actions = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { addProductFirebase, updateProductFirebase } = useUserAuth();

    const onGetData = async (data) => {
        if (data.id) {
            await updateProductFirebase(data, data.id);
            dispatch(updateProduct(data));
            navigate("/admin");
        } else {
            await addProductFirebase(data);
            dispatch(addProduct(data));
            navigate("/admin");
        }
    }

    return (
        <div className="mt-2">
            <div className="col-12 mb-4">
                <h1 className="text-center">{id ? "Cập nhật sản phẩm" : "Thêm mới sản phẩm"}</h1>
            </div>
            <ActionsForm onGetData={onGetData} pid={id} />
        </div>
    );
};

export default Actions;