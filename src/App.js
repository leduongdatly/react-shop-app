import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from "./Common/Header/MainPage/Index";
import Admin from "./Features/AdminPage/MainPage/Index";
import Cart from "./Features/CartPage/MainPage/Index";
import Home from "./Features/HomePage/MainPage/Index";
import Login from "./Features/LoginPage/MainPage/Index";
import NotFoundPage from './Features/NotFoundPage/NotFoundPage';
import ProductDetail from "./Features/ProductDetailPage/MainPage/Index";
import Products from "./Features/ProductsPage/MainPage/Index";
import Register from "./Features/RegisterPage/MainPage/Index";
import { fetchUserCartRequest } from './redux/actions/cartAction';
import { fetchProductRequest } from './redux/actions/productAction';
import { fetchUserRequest } from './redux/actions/userAction';

function App() {

	const user = JSON.parse(localStorage.getItem("user"));
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			dispatch(fetchUserCartRequest(user.id));
			dispatch(fetchProductRequest());
			dispatch(fetchUserRequest());
		}
	}, []);

	return (
		<>
			<Header />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="products" element={<Products />} />
				<Route path="products/:id" element={<ProductDetail />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="cart" element={user ? <Cart /> : <Navigate to="/" replace />} />
				<Route path="admin/*" element={user && user.role === "admin" ? <Admin /> : <Navigate to="/" replace />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
}

export default App;
