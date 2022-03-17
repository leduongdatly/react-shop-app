import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Spinner from "../../../../common/spinner/Spiner";

const ActionsForm = (props) => {

    const { pid } = props;

    const types = useSelector((state) => state.cat.types);
    const products = useSelector((state) => state.products.products);

    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({
        name: "",
        price: 1,
        quantity: 1,
        type: "",
        img: "",
        desc: ""
    });

    useEffect(() => {
        if (pid) {
            const result = products.find(({ id }) => id === pid);
            setProduct(result)
        }
    }, []);

    const showType = () => {
        var result = null;
        if (types.length > 0) {
            result = types.map((type, index) => {
                return <option key={index} value={type.type}>{type.name}</option>
            })
        }
        return result;
    }

    const onAdd = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === "checkbox" ? target.checked : target.value;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const onUpload = (e) => {
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
        setIsLoading(true);
        if (product.name === "" || product.type === "" || product.img === "" || product.desc === "") {
            alert("Mời nhập đầy đủ thông tin !");
        } else {
            props.onGetData(product);
        }
    }

    return (
        <form className="col-6 m-auto" onSubmit={onSave}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Tên sản phẩm</label>
                <input type="text" className="form-control" id="name" placeholder="Nhập ..." name="name" value={product.name} onChange={onAdd} />
            </div>
            <div className="mb-3">
                <label htmlFor="img" className="form-label">Ảnh</label>
                <input type="file" className="form-control" id="img" placeholder="Nhập ..." name="img" onChange={onUpload} />
            </div>
            <fieldset disabled>
                <div className="mb-3">
                    <label htmlFor="imgLink" className="form-label">URL Ảnh</label>
                    <input type="text" className="form-control" id="imgLink" placeholder="URL ảnh" />
                </div>
            </fieldset>
            <div className="mb-3">
                <label htmlFor="type" className="form-label">Loại</label>
                <select id="type" className="form-select" aria-label="Default select example" name="type" value={product.type} onChange={onAdd} >
                    <option defaultValue>Chọn loại</option>
                    {/* <option value="phone">phone</option>
                    <option value="idol">idol</option> */}
                    {showType()}
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
                <textarea rows="5" type="number" className="form-control" id="desc" placeholder="Nhập ..." name="desc" value={product.desc} onChange={onAdd} />
            </div>
            <div className="mb-5 text-center">
                <button className="btn btn-outline-dark w-25">{isLoading ? <Spinner /> : "Lưu"}</button>
                <NavLink to="/admin" className="btn btn-outline-danger w-25 ms-2">Trở lại</NavLink>
            </div>
        </form>
    );
};

export default ActionsForm;