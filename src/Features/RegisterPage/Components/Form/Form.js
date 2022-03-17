import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spiner from '../../../../common/spinner/Spiner';
import { useUserAuth } from "../../../../context/UserAuthContext";
import { db } from '../../../../firebase/firebase-config';

const Form = () => {

    const { signUp } = useUserAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [register, setRegister] = useState({
        email: "",
        password: "",
    });

    const onRegister = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === "checkbox" ? target.checked : target.value;
        setRegister(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const onSave = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (register.email === "") {
            alert("email không được để trống !");
        } else
            if (register.password === "") {
                alert("Mật khẩu không được để trống !");
            } else
                if (register.password !== "" && register.password.length <= 6) {
                    alert("Mật khẩu phải nhiều hơn 6 ký tự !")
                } else {
                    try {
                        const { user } = await signUp(register.email, register.password);
                        await setDoc(doc(db, "users", user.uid), { email: user.email, role: "customer" }).then(
                            navigate("/")
                        );
                    } catch (err) {
                        alert(err.message);
                        setIsLoading(false);
                    }
                }
    }

    return (
        <form className="col-6 m-auto" onSubmit={onSave} >
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Nhập ..." name="email" value={register.email} onChange={onRegister} />
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Mật khẩu</label>
                <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="Nhập ..." name="password" value={register.password} onChange={onRegister} />
            </div>
            <div className="mb-3">
                <button className="btn btn-outline-dark w-100">{isLoading ? <Spiner /> : "Đăng ký"}</button>
            </div>
        </form>
    );
};

export default Form;