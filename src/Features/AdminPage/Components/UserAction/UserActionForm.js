import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

const UserActionForm = (props) => {

    const params = useParams();
    const users = useSelector((state) => state.users.users);
    var result = users.find(({ id }) => id === params.id);

    const [user, setUser] = useState({
        id: "",
        username: "",
        password: "",
        email: "",
        role: "customer",
        avatar: "https://www.pinclipart.com/picdir/middle/221-2217551_user-icon-png-clipart-computer-icons-user-green.png",
    })

    useEffect(() => {
        if(params.id && result) {
            setUser(prev => ({
                ...prev,
                id: result.id,
                username: result.username,
                password: result.password,
                email: result.email,
                role: result.role,
                avatar: result.avatar
            }))
        }
    }, [result]);

    const onAdd = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const onSave = (e) => {
        e.preventDefault();
        props.onGetData(user);
    }

    return (
        <form className="col-6 m-auto" onSubmit={onSave}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Tên đăng nhập</label>
                <input type="text" className="form-control" id="username" placeholder="Nhập ..." name="username" value={user.username} onChange={onAdd} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Mật khẩu</label>
                <input type="text" className="form-control" id="password" placeholder="Nhập ..." name="password" value={user.password} onChange={onAdd} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Nhập ..." name="email" value={user.email} onChange={onAdd} />
            </div>
            <div className="mb-3">
                <label htmlFor="role" className="form-label">Quyền</label>
                <select id="role" className="form-select" aria-label="Default select example" name="role" value={user.role} onChange={onAdd} >
                    {/* <option defaultValue>Quyền</option> */}
                    <option value="admin">admin</option>
                    <option value="customer">customer</option>
                </select>
            </div>
            <div className="mb-5 text-center">
                <button className="btn btn-outline-dark w-25">Lưu</button>
                <NavLink to="/admin/users" className="btn btn-outline-danger w-25 ms-2">Trở lại</NavLink>
            </div>
        </form>
    );
};

export default UserActionForm;