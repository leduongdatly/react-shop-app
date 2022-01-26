import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Form = () => {

    const users = useSelector((state) => state.users.users);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const onLogin = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === "checkbox" ? target.checked : target.value;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const onSave = (e) => {
        e.preventDefault();
        if(user.username === "" || user.password === "") {
            alert("Mồi điền đầy đủ thông tin !");
        } else {
            var result = users.find(({username}) => username === user.username);
            if(result) {
                if(result.password !== user.password) {
                    alert("Mật khẩu không chính xác !");
                } else
                if(result.username === user.username && result.password === user.password) {
                    localStorage.setItem("user", JSON.stringify(result));
                    navigate("/");
                    window.location.reload();
                }
            } else {
                alert("Tên đăng nhập không tồn tại !")
            }
        }
    }

    return (
        <form className="col-6 m-auto" onSubmit={onSave}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Tên đăng nhập</label>
                <input type="text" className="form-control" id="username" placeholder="Nhập ..." name="username" value={user.username} onChange={onLogin} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Mật khẩu</label>
                <input type="password" className="form-control" id="password" placeholder="Nhập ..." name="password" value={user.password} onChange={onLogin} />
            </div>
            <div className="mb-3">
                <button className="btn btn-outline-dark w-100">Đăng nhập</button>
            </div>
        </form>
    );
};

export default Form;