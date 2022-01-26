import React from 'react';
import { NavLink } from 'react-router-dom';

const ShowProductCard = (props) => {

    const { product } = props;

    var vndCurrency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price);

    return (
        <div className="col-md-3 mb-4">
            <div className="card h-100 text-center p-4">
                <img src={product.img} className="card-img-top" alt={product.name} height="250px" />
                <div className="card-body">
                    <h5 className="card-title mb-0">{product.name.substring(0, 12)}</h5>
                    <p className="card-text lead fw-bold">{vndCurrency}</p>
                    <NavLink to={`${product.id}`} className="btn btn-outline-dark">Mua ngay</NavLink>
                </div>
            </div>
        </div>
    );
};

export default ShowProductCard;