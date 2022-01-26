import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ShowProductCard from './ShowProductCard';

const ShowProducts = () => {

    const products = useSelector((state) => state.products.products);
    const [data, setData] = useState(products);

    const ShowProductItem = (data) => {
        var result = null;
        if (data.length > 0) {
            result = data.map((product, index) => {
                return <ShowProductCard key={index} product={product} />
            })
        }
        return result;
    }

    const filterProduct = (cat) => {
        const updatedList = products.filter((x) => x.type === cat);
        setData(updatedList);
    }

    return (
        <>
            <div className="buttons d-flex justify-content-center mb-5 pb-5">
                <button className="btn btn-outline-dark me-2" onClick={() => setData(products)}>Tất cả</button>
                <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("phone")}>Điện thoại</button>
                <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("idol")}>Idol</button>
            </div>
            {ShowProductItem(data)}
        </>
    );
};

export default ShowProducts;