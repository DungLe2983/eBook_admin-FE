import React, { useState } from 'react';
import DeleteButton from '../components/DeleteButton';
import ProductForm from './Forms/ProductForm';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const Products = () => {
    const [books, setBooks] = useState([
        {
            id: '1',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            publication_date: '1925-04-10',
            price: '$10.99',
            categories: ['Fiction', 'Classic'],
        },
        {
            id: '2',
            title: 'Sapiens: A Brief History of Humankind',
            author: 'Yuval Noah Harari',
            publication_date: '2011-01-01',
            price: '$14.99',
            categories: ['Non-Fiction', 'History'],
        },
        // Các sách khác...
    ]);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleCreateBook = () => {
        setEditData(null);
        setIsFormOpen(true);
    };

    const handleEditBook = (book) => {
        setEditData(book);
        setIsFormOpen(true);
    };

    const confirmDeleteBook = (book) => {
        setSelectedBook(book);
        setDeleteModalOpen(true);
    };

    const handleDeleteBook = (bookId) => {
        // setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
        // setDeleteModalOpen(false);
        toast.success('Delete Book Successfully');
    };

    const handleSubmitBook = (bookData) => {
        if (editData) {
            // Cập nhật sách
            setBooks((prevBooks) =>
                prevBooks.map((book) =>
                    book.id === bookData.id ? bookData : book
                )
            );
        } else {
            // Thêm sách mới
            setBooks((prevBooks) => [
                ...prevBooks,
                { ...bookData, id: Date.now().toString() },
            ]);
        }
        setIsFormOpen(false);
    };

    return (
        <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
            <h2 className='text-heading3-bold mb-4 '>List of Books</h2>
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
                    onClick={handleCreateBook}
                    className='bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
                >
                    Create Book
                </button>
            </div>

            <div className='mt-6 overflow-x-auto'>
                <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
                    <thead>
                        <tr className='bg-gray-100 border-b border-gray-200'>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Title
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Author
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Publication Date
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Price
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Categories
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr
                                key={book.id}
                                className='border-b hover:bg-gray-50'
                            >
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {book.title}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {book.author}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {format(
                                        new Date(book.publication_date),
                                        'MM/dd/yyyy'
                                    )}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {book.price}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {book.categories.join(', ')}
                                </td>
                                <td className='py-3 px-4 flex space-x-4'>
                                    <button
                                        onClick={() => handleEditBook(book)}
                                        className='text-blue-600 hover:text-blue-800 text-[18px]'
                                    >
                                        <i className='ri-edit-line'></i>
                                    </button>
                                    <button
                                        onClick={() => confirmDeleteBook(book)}
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
                <ProductForm
                    closeForm={() => setIsFormOpen(false)}
                    onSubmit={handleSubmitBook}
                    initialData={editData}
                />
            )}
            {deleteModalOpen && selectedBook && (
                <DeleteButton
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={() => handleDeleteBook(selectedBook.id)}
                    itemName={selectedBook.title}
                />
            )}
        </div>
    );
};

export default Products;
