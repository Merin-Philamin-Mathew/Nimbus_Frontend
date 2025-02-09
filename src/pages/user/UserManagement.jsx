import React, { useEffect } from 'react'
import { get_users_action } from '../../features/userActions';
import AdminHeader from '../../components/partials/AdminHeader';
import { useNavigate } from 'react-router-dom';
import UserList from '../../components/user/UsersList';
import { useDispatch } from 'react-redux';
import { setUsers } from '../../redux/userSlice';

function UserManagement() {

    const navigate = useNavigate(); 
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchUsers = async () => {
            console.log('Fetching users...');
            const users = await get_users_action(navigate);
            dispatch(setUsers(users));
            console.log('Fetched users:', users);
        };

        fetchUsers();
    }, []); // Empty dependency array to run only on mount

    return (
        <>
            <AdminHeader/>
            <UserList />
        </>
    );
}

export default UserManagement;
