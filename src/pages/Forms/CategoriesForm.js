import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CategoriesForm = ({ closeForm, onSubmit, initialData = null }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setDescription(initialData.description || ''); // Nếu không có mô tả ban đầu, đặt chuỗi rỗng
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            id: initialData ? initialData.id : new Date().getTime(), // Sử dụng ID cũ khi sửa, hoặc tạo ID mới khi thêm
            name,
            description,
        };
        onSubmit(formData);
        toast.success('Category created/updated successfully');
        closeForm();
    };

    return (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white w-[30rem] p-6 rounded-lg shadow-lg relative'>
                <h2 className='text-heading4-bold mb-8 text-center text-primary'>
                    {initialData ? 'Edit Category' : 'Create Category'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Category Name
                        </label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            placeholder='Enter category name'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            placeholder='Enter category description'
                            rows='4'
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

export default CategoriesForm;
