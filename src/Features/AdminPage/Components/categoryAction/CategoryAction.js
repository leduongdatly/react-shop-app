import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserAuth } from '../../../../context/UserAuthContext';
import { addType, updateType } from '../../../../redux/actions/typeAction';
import CategoryActionForm from './CategoryActionForm';

const CategoryAction = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { addTypeFirebase, updateTypeFirebase } = useUserAuth();

    const onGetData = async (data) => {
        if (data.id) {
            await updateTypeFirebase(data, data.id);
            dispatch(updateType(data))
            navigate("/admin/category");
        } else {
            await addTypeFirebase(data);
            dispatch(addType(data));
            navigate("/admin/category");
        }
    }

    return (
        <div className="mt-2">
            <div className="col-12 mb-4">
                <h1 className="text-center">{id ? "Cập nhật sản phẩm" : "Thêm mới loại sản phẩm"}</h1>
            </div>
            <CategoryActionForm onGetData={onGetData} tid={id} />
        </div>
    );
};

export default CategoryAction;