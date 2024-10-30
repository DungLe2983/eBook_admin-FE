import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthorForm = ({ closeForm, onSubmit, initialData = null }) => {
    const [authorName, setAuthorName] = useState('');

    useEffect(() => {
        if (initialData) {
            setAuthorName(initialData.name);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            id: initialData ? initialData.id : new Date().getTime().toString(),
            name: authorName,
            numberOfBooks: initialData ? initialData.numberOfBooks : 0, // Cập nhật hoặc giữ số lượng sách
        };
        onSubmit(formData);
        toast.success('Author saved successfully');
        closeForm();
    };

    return (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white w-[30rem] p-6 rounded-lg shadow-lg relative'>
                <h2 className='text-heading4-bold mb-8 text-center text-primary'>
                    {initialData ? 'Edit Author' : 'Create Author'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Author Name
                        </label>
                        <input
                            type='text'
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            placeholder='Nhập tên tác giả'
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

export default AuthorForm;
