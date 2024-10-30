import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const UserForm = ({ closeForm, onSubmit, initialData = null }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (initialData) {
            setUsername(initialData.username);
            setEmail(initialData.email);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            id: initialData ? initialData.id : new Date().getTime().toString(),
            username: username,
            email: email,
        };
        onSubmit(formData);
        toast.success('User saved successfully');
        closeForm();
    };

    return (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white w-[30rem] p-6 rounded-lg shadow-lg relative'>
                <h2 className='text-heading4-bold mb-8 text-center text-primary'>
                    {initialData ? 'Edit User' : 'Create User'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Username
                        </label>
                        <input
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            placeholder='Nhập tên người dùng'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Email
                        </label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            placeholder='Nhập email'
                        />
                    </div>
                    <div className='flex justify-end'>
                        <button
                            type='button'
                            onClick={closeForm}
                            className='px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 mr-2'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
