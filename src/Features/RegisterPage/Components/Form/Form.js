import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUserRequest } from '../../../../redux/actions/userAction';

const Form = () => {

    const users = useSelector((state) => state.users.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        role: "customer",
        avatar: "https://www.pinclipart.com/picdir/middle/221-2217551_user-icon-png-clipart-computer-icons-user-green.png"
    })

    const onRegister = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === "checkbox" ? target.checked : target.value;
        setUser(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const onSave = (e) => {
        e.preventDefault();
        if(user.username === "" || user.email === "" || user.password === "") {
            alert("Mời điền đầy đủ thông tin !");
        } else {
            var result = users.find(({username}) => username === user.username);
            if(result) {
                alert("Tên đăng nhập đã tồn tại !");
            } else {
                dispatch(addUserRequest(user));
                navigate("/login");
            }
        }
    }

    return (
        <form className="col-6 m-auto" onSubmit={onSave}>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Tên đăng nhập</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Nhập ..." name="username" value={user.username} onChange={onRegister} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Nhập ..." name="email" value={user.email} onChange={onRegister} />
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Mật khẩu</label>
                <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="Nhập ..." name="password" value={user.password} onChange={onRegister} />
            </div>
            <div className="mb-3">
                <button className="btn btn-outline-dark w-100">Đăng ký</button>
            </div>
        </form>
    );
};

export default Form;