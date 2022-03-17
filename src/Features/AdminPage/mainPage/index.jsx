import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFoundPage from '../../notFoundPage/NotFoundPage';
import UsersTable from "../components/accounts/Accounts";
import Actions from "../components/actions/Actions";
import Category from '../components/category/Category';
import CategoryAction from '../components/categoryAction/CategoryAction';
import Menus from "../components/menus/Menus";
import Table from "../components/products/Products";

const AdminPage = () => {
    return (
        <div>
            <Menus />

            <Routes>
                <Route path="/" element={<Navigate to="products" replace />} />

                <Route path="products" element={<Table />} />
                <Route path="products/actions/add" element={<Actions />} />
                <Route path="products/actions/:id/edit" element={<Actions />} />
                <Route path="users" element={<UsersTable />} />
                <Route path="category" element={<Category />} />
                <Route path="category/add" element={<CategoryAction />} />
                <Route path="category/:id/edit" element={<CategoryAction />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
};

export default AdminPage;