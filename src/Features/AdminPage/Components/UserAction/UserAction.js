import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import UserActionForm from './UserActionForm';
import { addUserRequest, updateUserRequest } from '../../../../redux/actions/userAction';

const UserAction = () => {


    const { id } = useParams();
    const users = useSelector((state) => state.users.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onGetData = (data) => {
        if (data.username === "" || data.password === "" || data.email === "" || data.role === "" || data.avatar === "") {
            alert("Vui lòng điền đầy đủ thông tin !");
        } else {
            if (data.id) {
                dispatch(updateUserRequest(data.id, data));
                navigate("/admin/users");
            } else {
                var result = users.find(({ username }) => username === data.username);
                if (result) {
                    alert("Tên đăng nhập đã tồn tại !");
                } else {
                    dispatch(addUserRequest(data));
                    navigate("/admin/users");
                }
            }
        }
    }

    return (
        <div className="mt-2">
            <div className="col-12 mb-4">
                <h1 className="text-center">{id ? "Cập nhật tài khoản" : "Thêm mới tài khoản"}</h1>
            </div>
            <UserActionForm onGetData={onGetData} />
        </div>
    );
};

export default UserAction;