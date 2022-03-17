import React from 'react';
import ShowProductDetail from '../components/showProductDetail/ShowProductDetail';

const ProductDetailPage = () => {
    return (
        <div>
            <div className="container py-5">
                <div className="row py-4">
                    <ShowProductDetail />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;