import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { storage } from "../../../../firebase";
import { NavLink, useParams } from 'react-router-dom';

const ActionsForm = (props) => {

    const params = useParams();
    const products = useSelector((state) => state.products.products);

    const [product, setProduct] = useState({
        id: "",
        name: "",
        type: "",
        detail: "",
        price: 1,
        img: "",
        quantity: 1
    });

    const [image, setImage] = useState(null);

    var result = products.find(({ id }) => id === params.id);

    useEffect(() => {
        if (params.id && result !== undefined) {
            setProduct(prev => ({
                ...prev,
                id: result.id,
                name: result.name,
                type: result.type,
                detail: result.detail,
                price: result.price,
                img: result.img,
                quantity: result.quantity
            }));
        }
    }, []);

    const onAdd = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === "checkbox" ? target.checked : target.value;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const changeHandler = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    useEffect(() => {
        // get image url
        const storage = getStorage();

        // Upload file and metadata to the object 'images/mountains.jpg'
        if (image) {
            const storageRef = ref(storage, 'images/' + image.name);
            const uploadTask = uploadBytesResumable(storageRef, image);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
                (snapshot) => { },
                (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;
                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // console.log('File available at', downloadURL);
                        setProduct(prev => ({
                            ...prev,
                            img: downloadURL,
                        }));
                    });
                }
            );
        }
    }, [image]);

    const onSave = (e) => {
        e.preventDefault();

        props.onGetData(product);

        setProduct({
            name: "",
            type: "",
            detail: "",
            price: 1,
            img: "",
            quantity: 1
        })
    }

    return (
        <form className="col-6 m-auto" onSubmit={onSave}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Tên sản phẩm</label>
                <input type="text" className="form-control" id="name" placeholder="Nhập ..." name="name" value={product.name} onChange={onAdd} />
            </div>
            <div className="mb-3">
                <label htmlFor="img" className="form-label">Ảnh</label>
                <input type="file" className="form-control" id="img" placeholder="Nhập ..." onChange={changeHandler} />
            </div>
            <fieldset disabled>
                <div className="mb-3">
                    <label htmlFor="imgLink" className="form-label">URL Ảnh</label>
                    <input type="text" className="form-control" id="imgLink" placeholder="URL ảnh" name="img" value={product.img} onChange={onAdd} />
                </div>
            </fieldset>
            <div className="mb-3">
                <label htmlFor="type" className="form-label">Loại</label>
                <select id="type" className="form-select" aria-label="Default select example" name="type" value={product.type} onChange={onAdd} >
                    <option defaultValue>Chọn loại</option>
                    <option value="phone">phone</option>
                    <option value="idol">idol</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Giá</label>
                <input type="number" className="form-control" id="price" placeholder="Nhập ..." name="price" value={product.price} onChange={onAdd} />
            </div>
            <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Số lượng</label>
                <input type="number" className="form-control" id="quantity" placeholder="Nhập ..." name="quantity" value={product.quantity} onChange={onAdd} />
            </div>
            <div className="mb-3">
                <label htmlFor="desc" className="form-label">Mô tả</label>
                <textarea rows="5" type="number" className="form-control" id="desc" placeholder="Nhập ..." name="detail" value={product.detail} onChange={onAdd} />
            </div>
            <div className="mb-5 text-center">
                <button className="btn btn-outline-dark w-25">Lưu</button>
                <NavLink to="/admin" className="btn btn-outline-danger w-25 ms-2">Trở lại</NavLink>
            </div>
        </form>
    );
};

export default ActionsForm;