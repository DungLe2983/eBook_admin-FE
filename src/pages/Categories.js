import React, { useState } from 'react';
import CategoriesForm from './Forms/CategoriesForm';
import DeleteButton from '../components/DeleteButton.js';
import toast from 'react-hot-toast';

const Categories = () => {
    const [categories, setCategories] = useState([
        { id: '1', name: 'Fiction', numberOfProducts: 5 },
        { id: '2', name: 'Non-Fiction', numberOfProducts: 3 },
        { id: '3', name: 'Science', numberOfProducts: 8 },
        { id: '4', name: 'History', numberOfProducts: 4 },
        { id: '5', name: 'Biography', numberOfProducts: 2 },
    ]);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCreateCategory = () => {
        setEditData(null);
        setIsFormOpen(true);
    };

    const handleEditCategory = (category) => {
        setEditData(category);
        setIsFormOpen(true);
    };

    const confirmDeleteCategory = (category) => {
        setSelectedCategory(category);
        setDeleteModalOpen(true);
    };

    const handleDeleteCategory = (categoryId) => {
        setCategories((prevCategories) =>
            prevCategories.filter((category) => category.id !== categoryId)
        );
        setDeleteModalOpen(false);
        toast.success('Category deleted successfully');
    };

    const handleSubmitCategory = (categoryData) => {
        if (editData) {
            // Update existing category
            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category.id === categoryData.id ? categoryData : category
                )
            );
        } else {
            // Add new category
            setCategories((prevCategories) => [
                ...prevCategories,
                {
                    ...categoryData,
                    id: new Date().getTime().toString(),
                    numberOfProducts: 0,
                }, // Set default number of products
            ]);
        }
        setIsFormOpen(false);
        toast.success('Category saved successfully');
    };

    return (
        <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
            <h2 className='text-heading3-bold mb-4 '>Categories</h2>
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
                    onClick={handleCreateCategory}
                    className='bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
                >
                    Create Category
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
                                Category Name
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Number of Books
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr
                                key={category.id}
                                className='border-b hover:bg-gray-100 transition-colors'
                            >
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {category.id}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {category.name}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700 '>
                                    {category.numberOfProducts}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700 flex space-x-4'>
                                    <button
                                        onClick={() =>
                                            handleEditCategory(category)
                                        }
                                        className='text-blue-600 hover:text-blue-800 text-[18px]'
                                    >
                                        <i className='ri-edit-line'></i>
                                    </button>
                                    <button
                                        onClick={() =>
                                            confirmDeleteCategory(category)
                                        }
                                        className='text-red-600 hover:text-red-800 text-[18px]'
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
                <CategoriesForm
                    closeForm={() => setIsFormOpen(false)}
                    onSubmit={handleSubmitCategory}
                    initialData={editData}
                />
            )}
            {deleteModalOpen && selectedCategory && (
                <DeleteButton
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={() => handleDeleteCategory(selectedCategory.id)}
                    itemName={selectedCategory.name}
                />
            )}
        </div>
    );
};

export default Categories;
