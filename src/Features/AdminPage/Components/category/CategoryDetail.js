import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Spiner from '../../../../common/spinner/Spiner';
import { useUserAuth } from '../../../../context/UserAuthContext';
import { deleteType } from '../../../../redux/actions/typeAction';

const CategoryDetail = (props) => {

    const { cat, index } = props;

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const { deleteTypeFirebase } = useUserAuth();

    const onDelete = async (id) => {
        setIsLoading(true);
        await deleteTypeFirebase(id);
        dispatch(deleteType(id));
    }

    return (
        <tr className="align-middle">
            <th scope="row">{index + 1}</th>
            <td>{cat.name}</td>
            <td>{cat.type}</td>
            <td>
                <NavLink to={`${cat.id}/edit`} className="btn btn-outline-dark w-25">Sửa</NavLink>
                <button className="btn btn-outline-danger w-25 ms-2" onClick={() => onDelete(cat.id)}>{isLoading ? <Spiner /> : "Xóa"}</button>
            </td>
        </tr>
    );
};

export default CategoryDetail;