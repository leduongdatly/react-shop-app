import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserRole } from '../../../../redux/actions/userAction';
import { useUserAuth } from '../../../../context/UserAuthContext';
import Spinner from "../../../../common/spinner/Spiner";

const AccountDetail = (props) => {

    const { user, index } = props;

    const dispatch = useDispatch();
    const { updateUserRoleFirebase } = useUserAuth();
    const [isLoading, setIsLoading] = useState(false);

    const onChangeRole = async (id, role) => {
        setIsLoading(true);
        try {
            await updateUserRoleFirebase(id, role);
            dispatch(updateUserRole(id));
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    return (
        <tr className="align-middle">
            <th scope="row">{index + 1}</th>
            <td>{user.email}</td>
            <td style={{ cursor: "pointer" }} onClick={() => onChangeRole(user.id, user.role)} >{isLoading ? <Spinner /> : user.role}</td>
        </tr>
    );
};

export default AccountDetail;