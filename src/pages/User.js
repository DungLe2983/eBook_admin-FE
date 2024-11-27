import React, { useState } from 'react';
import UserForm from './Forms/UserForm';
import DeleteButton from '../components/DeleteButton.js';
import toast from 'react-hot-toast';

const User = () => {
    const [users, setUsers] = useState([
        {
            id: '1',
            username: 'john_doe',
            email: 'john@example.com',
            fullname: 'John Doe',
            phone: '123-456-7890',
            address: '123 Main St, City, Country',
        },
        {
            id: '2',
            username: 'jane_doe',
            email: 'jane@example.com',
            fullname: 'Jane Doe',
            phone: '987-654-3210',
            address: '456 Elm St, City, Country',
        },
        {
            id: '3',
            username: 'user123',
            email: 'user123@example.com',
            fullname: 'User Test',
            phone: '555-555-5555',
            address: '789 Pine St, City, Country',
        },
    ]);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleCreateUser = () => {
        setEditData(null);
        setIsFormOpen(true);
    };

    const handleEditUser = (user) => {
        setEditData(user);
        setIsFormOpen(true);
    };

    const confirmDeleteUser = (user) => {
        setSelectedUser(user);
        setDeleteModalOpen(true);
    };

    const handleDeleteUser = (userId) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        setDeleteModalOpen(false);
        toast.success('User deleted successfully');
    };

    const handleSubmitUser = (userData) => {
        if (editData) {
            // Update existing user
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userData.id ? userData : user
                )
            );
        } else {
            // Add new user
            setUsers((prevUsers) => [
                ...prevUsers,
                { ...userData, id: new Date().getTime().toString() }, // Tạo ID mới
            ]);
        }
        setIsFormOpen(false);
        toast.success('User saved successfully');
    };

    return (
        <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
            <h2 className='text-heading3-bold mb-4 '>Users</h2>
            <div className='bg-white h-16 flex justify-between items-center border-b border-gray-200'>
                <div className='relative'>
                    <i className='ri-search-line text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'></i>
                    <input
                        type='text'
                        placeholder='Search...'
                        className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 pr-4'
                    />
                </div>
                <button
                    onClick={handleCreateUser}
                    className='bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
                >
                    Create User
                </button>
            </div>

            <div className='overflow-x-auto mt-6'>
                <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
                    <thead>
                        <tr className='bg-gray-100 border-b border-gray-200'>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                ID
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Username
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Email
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Full Name
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Phone
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Address
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className='border-b hover:bg-gray-100 transition-colors'
                            >
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {user.id}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {user.username}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {user.email}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {user.fullname}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {user.phone}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {user.address}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700 flex space-x-2'>
                                    <button
                                        onClick={() => handleEditUser(user)}
                                        className='text-blue-600 hover:text-blue-800'
                                    >
                                        <i className='ri-edit-line'></i>
                                    </button>
                                    <button
                                        onClick={() => confirmDeleteUser(user)}
                                        className='text-red-600 hover:text-red-800'
                                    >
                                        <i className='ri-delete-bin-line'></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isFormOpen && (
                <UserForm
                    closeForm={() => setIsFormOpen(false)}
                    onSubmit={handleSubmitUser}
                    initialData={editData}
                />
            )}
            {deleteModalOpen && selectedUser && (
                <DeleteButton
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={() => handleDeleteUser(selectedUser.id)}
                    itemName={selectedUser.username}
                />
            )}
        </div>
    );
};

export default User;
