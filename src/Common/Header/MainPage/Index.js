import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Index = () => {

    let isLogin = JSON.parse(localStorage.getItem("user"));
    const products = useSelector((state) => state.cart.products);

    const onLogout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
                <div className="container">
                    <NavLink to="/" className="navbar-brand fw-bold fs-4">DUONG STORE</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} aria-current="page">Trang chủ</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} href="#">Sản phẩm</NavLink>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Giới thiệu</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Liên hệ</a>
                            </li>
                            {isLogin && isLogin.role === "admin" ?
                                (
                                    <li className="nav-item">
                                        <NavLink to="admin" className="nav-link">Admin</NavLink>
                                    </li>
                                ) :
                                ("")
                            }
                        </ul>
                        {/* <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form> */}
                        <div className="buttons">
                            {isLogin ?
                                (
                                    <>
                                        <NavLink to="cart" className="btn btn-outline-dark ms-2" >
                                            <i className="fa fa-shopping-cart me-1"></i>({products.length})
                                        </NavLink>
                                        <button className="btn btn-outline-dark ms-2" onClick={onLogout} >
                                            <i className="fa fa-sign-in me-1"></i> Đăng xuất
                                        </button>
                                    </>
                                ) :
                                (
                                    <>
                                        <NavLink to="login" className="btn btn-outline-dark" >
                                            <i className="fa fa-sign-in me-1"></i> Đăng nhập
                                        </NavLink>
                                        <NavLink to="register" className="btn btn-outline-dark ms-2" >
                                            <i className="fa fa-user-plus me-1"></i> Đăng ký
                                        </NavLink>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Index;