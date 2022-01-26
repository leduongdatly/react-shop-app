import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteProductRequest } from '../../../../redux/actions/productAction';

const ProductDetail = (props) => {

    const { product, index } = props;
    const dispatch = useDispatch();
    var vndCurrency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);

    const handleDelete = (product_id) => {
        if(window.confirm("Bạn có muốn xóa chứ ?")) {
            dispatch(deleteProductRequest(product_id));
        }
    }

    return (
        <tr className="align-middle">
            <th scope="row">{index + 1}</th>
            <td>
                <img src={product.img} alt={product.name} height="50px" width="70px" />
            </td>
            <td>{product.name}</td>
            <td>{product.type}</td>
            <td>{vndCurrency}</td>
            <td>{product.quantity}</td>
            <td>
                <NavLink to={`actions/${product.id}/edit`} className="btn btn-outline-dark w-25">Sửa</NavLink>
                <button className="btn btn-outline-danger w-25 ms-2" onClick={() =>handleDelete(product.id)}>Xóa</button>
            </td>
        </tr>
    );
};

export default ProductDetail;