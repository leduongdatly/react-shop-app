import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { db } from '../../../../firebase/firebase-config';
import { getAllTypes } from '../../../../redux/actions/typeAction';
import CategoryDetail from './CategoryDetail';

const Category = () => {

    const typesCollectionRef = collection(db, "type");

    const dispatch = useDispatch();
    const cats = useSelector((state) => state.cat.types);

    useEffect(() => {
        const getType = async () => {
            const data = await getDocs(typesCollectionRef);
            dispatch(getAllTypes(data.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }))));
        }

        getType();
    }, []);

    const showCatDetail = () => {
        var result = null;
        if (cats.length > 0) {
            result = cats.map((cat, index) => {
                return <CategoryDetail key={index} cat={cat} index={index} />;
            })
        }
        return result;
    }

    return (
        <div className="container">
            <div className="mt-3">
                <NavLink to="add" className="btn btn-outline-dark">Thêm mới loại sản phẩm</NavLink>
            </div>
            <table className="table table-striped table-hover table-bordered mt-3">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên loại</th>
                        <th scope="col">ký tự loại</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {showCatDetail()}
                </tbody>
            </table>
        </div>
    );
};

export default Category;