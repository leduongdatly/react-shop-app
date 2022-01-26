import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteUserRequest } from '../../../../redux/actions/userAction';

const AccountDetail = (props) => {

    const { user, index } = props;
    const dispatch = useDispatch();

    const handleDelete = (user_id) => {
        if(window.confirm("Bạn có muốn xóa chứ ?")) {
            dispatch(deleteUserRequest(user_id));
        }
    }

    return (
        <tr className="align-middle">
            <th scope="row">{index + 1}</th>
            <td>{user.username}</td>
            <td>{user.password}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
                <NavLink to={`action/${user.id}/edit`} className="btn btn-outline-dark w-25">Sửa</NavLink>
                <button className="btn btn-outline-danger w-25 ms-2" onClick={() =>handleDelete(user.id)}>Xóa</button>
            </td>
        </tr>
    );
};

export default AccountDetail;