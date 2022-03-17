import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Spiner from "../../../../common/spinner/Spiner";

const CategoryActionForm = (props) => {

    const { tid } = props;

    const types = useSelector((state) => state.cat.types);
    const [isLoading, setIsLoading] = useState(false);
    const [cat, setCat] = useState({
        name: "",
        type: ""
    });

    useEffect(() => {
        if (tid) {
            const result = types.find(({ id }) => id === tid);
            setCat(result);
        }
    }, []);

    const onHandleChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === "checkbox" ? target.checked : target.value;
        setCat(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const onSave = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (cat.name === "" || cat.type === "") {
            alert("Vui lòng điền đầy đủ thông tin !");
        } else {
            props.onGetData(cat);
        }
    }

    return (
        <form className="col-6 m-auto" onSubmit={onSave} >
            <div className="mb-3">
                <label htmlFor="catName" className="form-label">Tên loại</label>
                <input type="text" className="form-control" id="catName" placeholder="Nhập ..." name="name" value={cat.name} onChange={onHandleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="catType" className="form-label">Ký tự Loại</label>
                <input type="text" className="form-control" id="catType" placeholder="Nhập ..." name="type" value={cat.type} onChange={onHandleChange} />
            </div>
            <div className="mb-5 text-center">
                <button className="btn btn-outline-dark w-25">{isLoading ? <Spiner /> : "Lưu"}</button>
                <NavLink to="/admin/category" className="btn btn-outline-danger w-25 ms-2">Trở lại</NavLink>
            </div>
        </form>
    );
};

export default CategoryActionForm;