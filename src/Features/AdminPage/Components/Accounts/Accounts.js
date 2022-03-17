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
                <CSVLink {...csvReport} className="btn btn-outline-success mx-2">Xuất email người dùng</CSVLink>
            </div>
            <table className="table table-striped table-hover table-bordered mt-3">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Email</th>
                        <th scope="col">Quyền</th>
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