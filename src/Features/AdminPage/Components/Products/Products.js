import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProductDetail from './ProductDetail';

const Products = () => {

    const products = useSelector((state) => state.products.products);

    const showProduct = () => {
        var result = null;
        if(products.length > 0) {
            result = products.map((product, index) => {
                return  <ProductDetail key={index} product={product} index={index} />;
            })
        }
        return result;
    }

    return (
        <div className="container">
            <div className="mt-3">
                <NavLink to="actions/add" className="btn btn-outline-dark">Thêm mới sản phẩm</NavLink>
            </div>
            <table className="table table-striped table-hover table-bordered mt-3">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Loại</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {showProduct()}
                </tbody>
            </table>
        </div>
    );
};

export default Products;