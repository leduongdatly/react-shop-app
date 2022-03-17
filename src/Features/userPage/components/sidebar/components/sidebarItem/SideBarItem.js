import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBarItem = () => {
    return (
        <div className="text-center">
            <div>
                <p className="fw-bold">chao: leduongdatly@gmail.com</p>
            </div>
            <div className="m-0">
                <p className="nav-link m-0 p-0 text-black" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Button with data-bs-target
                </p>
            </div>
            <div className="collapse p-1" id="collapseExample">
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                    <li className="nav-item p-0">
                        <NavLink to="/" className="nav-link p-1 text-black" aria-current="page">Trang chủ</NavLink>
                    </li>
                    <li className="nav-item p-0">
                        <NavLink to="products" className="nav-link p-1 text-black">Sản phẩm</NavLink>
                    </li>
                    <li className="nav-item p-0">
                        <NavLink to="userInfo" className="nav-link p-1 text-black">a</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideBarItem;