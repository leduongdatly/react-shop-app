import React from 'react';
import { NavLink } from 'react-router-dom';

const Menus = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} aria-current="page">Sản phẩm</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="users" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} href="#">Tài khoản</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="category" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} href="#">Loại sản phẩm</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Menus;