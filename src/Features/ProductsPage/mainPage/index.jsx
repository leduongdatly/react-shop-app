import React from 'react';
import ShowProducts from '../Components/ShowProducts/ShowProducts';

const ProductPage = () => {
    return (
        <div>
            <div className="container m-6 py-5">
                {/* <div className="row"> */}
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center">Tất cả sản phẩm</h1>
                    </div>
                    <div className="row justify-content-center">
                        <ShowProducts />
                    </div>
                {/* </div> */}
            </div>
        </div>
    );
};

export default ProductPage;