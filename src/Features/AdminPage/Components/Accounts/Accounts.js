import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AccountDetail from './AccountDetail';
import { CSVLink } from 'react-csv';

const Accounts = () => {

    const users = useSelector((state) => state.users.users);

    const showUsers = () => {
        var result = null;
        if (users.length > 0) {
            result = users.map((user, index) => {
                return <AccountDetail key={index} user={user} index={index} />;
            })
        }
        return result;
    }

    const headers = [
        { label: "Tên đăng nhập", key: "username" },
        { label: "Mật khẩu", key: "password" },
        { label: "Email", key: "email" },
    ]

    const csvReport = {
        filename: "Data.csv",
        headers: headers,
        data: users
    }

    return (
        <div className="container">
            <div className="mt-3">
                <NavLink to="action/add" className="btn btn-outline-dark">Thêm mới Tài khoản</NavLink>
                <CSVLink {...csvReport} className="btn btn-outline-success mx-2">Xuất dữ liệu người dùng</CSVLink>
            </div>
            <table className="table table-striped table-hover table-bordered mt-3">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên tài khoản</th>
                        <th scope="col">mật khẩu</th>
                        <th scope="col">email</th>
                        <th scope="col">Quyền</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {showUsers()}
                </tbody>
            </table>
        </div>
    );
};

export default Accounts;