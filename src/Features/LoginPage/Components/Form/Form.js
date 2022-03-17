import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../../../context/UserAuthContext';
import Spiner from '../../../../common/spinner/Spiner';

const Form = () => {

    const { signIn } = useUserAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const onLogin = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === "checkbox" ? target.checked : target.value;
        setLogin(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const onSave = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await signIn(login.email, login.password)
            navigate("/");
        } catch (error) {
            alert(error);
            setIsLoading(false);
        }
    }

    return (
        <form className="col-6 m-auto" onSubmit={onSave}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Tên đăng nhập</label>
                <input type="text" className="form-control" id="username" placeholder="Nhập ..." name="email" value={login.email} onChange={onLogin} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Mật khẩu</label>
                <input type="password" className="form-control" id="password" placeholder="Nhập ..." name="password" value={login.password} onChange={onLogin} />
            </div>
            <div className="mb-3">
                <button className="btn btn-outline-dark w-100">{isLoading ? <Spiner /> : "Đăng nhập"}</button>
            </div>
        </form>
    );
};

export default Form;