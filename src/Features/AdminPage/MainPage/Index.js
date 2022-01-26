import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFoundPage from '../../NotFoundPage/NotFoundPage';
import UsersTable from "../Components/Accounts/Accounts";
import Actions from "../Components/Actions/Actions";
import Menus from "../Components/Menus/Menus";
import Table from "../Components/Products/Products";
import UserAction from '../Components/UserAction/UserAction';

const Index = () => {
    return (
        <div>
            <Menus />

            <Routes>
                <Route path="/" element={<Navigate to="products" replace />} />

                <Route path="products" element={<Table />} />
                <Route path="products/actions/add" element={<Actions />} />
                <Route path="products/actions/:id/edit" element={<Actions />} />
                <Route path="users" element={<UsersTable />} />
                <Route path="users/action/add" element={<UserAction />} />
                <Route path="users/action/:id/edit" element={<UserAction />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
};

export default Index;