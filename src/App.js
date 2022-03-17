import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from "./common/header/mainPages/index";
// import { UserAuthContextProvider } from './context/UserAuthContext';
import Admin from "./features/adminPage/mainPage/index";
import Cart from "./features/cartPage/mainPage/index";
import Home from "./features/homePage/mainPage/index";
import Login from "./features/loginPage/mainPage/index";
import NotFoundPage from "./features/notFoundPage/NotFoundPage";
import ProductDetail from "./features/productDetailPage/mainPage/index";
import Products from "./features/productsPage/mainPage/index";
import Register from "./features/registerPage/mainPage/index";
import { db } from './firebase/firebase-config';
import { getAllCartData } from './redux/actions/cartAction';
import { getAllProduct } from './redux/actions/productAction';
import { useUserAuth } from './context/UserAuthContext';
import { getAllTypes } from './redux/actions/typeAction';
import ProtectedUserRoute from './common/protectedRoute/ProtectedUserRoute';
import ProtectedAdminRoute from './common/protectedRoute/ProtectedAdminRoute';
import { getAllUsers } from './redux/actions/userAction';
import UserPage from './features/userPage/mainPage';

function App() {

	const productsCollectionRef = collection(db, "products");
	const typesCollectionRef = collection(db, "type");
	const cartCollectionRef = collection(db, "cart");
	const usersCollectionRef = collection(db, "users");
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users.users);
	let { user } = useUserAuth();

	useEffect(() => {
		const getProducts = async () => {
			const data = await getDocs(productsCollectionRef);
			dispatch(getAllProduct(data.docs.map((doc) => ({
				...doc.data(), id: doc.id
			}))));
		}

		getProducts();
	}, []);

	useEffect(() => {
		const getType = async () => {
			const data = await getDocs(typesCollectionRef);
			dispatch(getAllTypes(data.docs.map((doc) => ({
				...doc.data(), id: doc.id
			}))));
		}

		getType();
	}, []);

	useEffect(() => {
		const getCart = async () => {
			const data = await getDocs(cartCollectionRef);
			dispatch(getAllCartData(data.docs.map((doc) => ({
				...doc.data(), id: doc.id
			}))));
		}

		getCart();
	}, []);

	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(usersCollectionRef);
			dispatch(getAllUsers(data.docs.map((doc) => ({
				...doc.data(), id: doc.id
			}))));
		}

		getUsers();
	}, []);

	if (typeof user !== "string" && user) {
		var result = users.find(({ id }) => id === user.uid);
	}

	return (
		<>
			<Header userData={result} />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="products" element={<Products />} />
				<Route path="products/:id" element={<ProductDetail />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="cart" element={<ProtectedUserRoute><Cart /></ProtectedUserRoute>} />
				<Route path="admin/*" element={<ProtectedAdminRoute><Admin /></ProtectedAdminRoute>} />
				<Route path="userInfo" element={<UserPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
}

export default App;
