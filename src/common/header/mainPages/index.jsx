import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useUserAuth } from '../../../context/UserAuthContext';

const Header = (props) => {

    const { user, logOut } = useUserAuth();
    const cartData = useSelector((state) => state.cart.userCartData);
    const { userData } = props;

    const onLogout = async () => {
        try {
            await logOut();
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
                <div className="container">
                    <NavLink to="/" className="navbar-brand fw-bold fs-4">DUONG STORE</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} aria-current="page">Trang chủ</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Sản phẩm</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="userInfo" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{user.email}</NavLink>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#">Liên hệ</a>
                            </li> */}
                            {
                                userData !== undefined && userData.role === "admin"
                                    ?
                                    <li className="nav-item">
                                        <NavLink to="admin" className="nav-link">Quản lý</NavLink>
                                    </li>
                                    :
                                    ""
                            }

                        </ul>
                        {/* <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form> */}
                        <div className="buttons">
                            {
                                user ?
                                    <>
                                        <NavLink to="cart" className="btn btn-outline-dark ms-2" >
                                            <i className="fa fa-shopping-cart me-1"></i>({cartData.length})
                                        </NavLink>
                                        <button className="btn btn-outline-dark ms-2" onClick={onLogout}>
                                            <i className="fa fa-sign-in me-1"></i> Đăng xuất
                                        </button>
                                    </> :
                                    <>
                                        <NavLink to="login" className="btn btn-outline-dark" >
                                            <i className="fa fa-sign-in me-1"></i> Đăng nhập
                                        </NavLink>
                                        <NavLink to="register" className="btn btn-outline-dark ms-2" >
                                            <i className="fa fa-user-plus me-1"></i> Đăng ký
                                        </NavLink>

                                    </>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;