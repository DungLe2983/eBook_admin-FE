import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ProductForm = ({ closeForm, onSubmit, initialData = null }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publicationYear, setPublicationYear] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [isbn, setIsbn] = useState('');
    const [coverImage, setCoverImage] = useState(''); // Đổi từ URL thành ảnh
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]); // Danh sách thể loại sách

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setAuthor(initialData.author);
            setPublicationYear(initialData.publication_year);
            setPrice(initialData.price);
            setStockQuantity(initialData.stock_quantity);
            setIsbn(initialData.isbn);
            setCoverImage(initialData.cover_image);
            setDescription(initialData.description);
            setCategories(initialData.categories || []); // Khôi phục thể loại từ dữ liệu ban đầu
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            id: initialData ? initialData.id : new Date().getTime(), // Tạo ID mới hoặc sử dụng ID cũ
            title,
            author,
            publication_year: publicationYear,
            price,
            stock_quantity: stockQuantity,
            isbn,
            cover_image: coverImage, // Lưu ảnh thay vì URL
            description,
            categories,
        };
        onSubmit(formData);
        toast.success('Book created/updated successfully');
        closeForm();
    };

    // Hàm xử lý khi người dùng chọn ảnh từ máy tính
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImage(reader.result); // Đọc và lưu ảnh dưới dạng base64
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]'>
                <h2 className='text-heading4-bold mb-8 text-center text-primary'>
                    {initialData ? 'Edit Book' : 'Create Book'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Title
                        </label>
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            placeholder='Enter book title'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Author
                        </label>
                        <input
                            type='text'
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            placeholder='Enter author name'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Publication Year
                        </label>
                        <input
                            type='number'
                            value={publicationYear}
                            onChange={(e) => setPublicationYear(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            placeholder='Enter publication year'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Price
                        </label>
                        <input
                            type='text'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            placeholder='Enter book price'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Stock Quantity
                        </label>
                        <input
                            type='number'
                            value={stockQuantity}
                            onChange={(e) => setStockQuantity(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            placeholder='Enter stock quantity'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            ISBN
                        </label>
                        <input
                            type='text'
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            placeholder='Enter ISBN'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Cover Image
                        </label>
                        <input
                            type='file'
                            onChange={handleFileChange}
                            accept='image/*'
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        />
                        {coverImage && (
                            <img
                                src={coverImage}
                                alt='Cover preview'
                                className='mt-4 max-w-full h-auto rounded-md'
                            />
                        )}
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            placeholder='Enter book description'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Categories
                        </label>
                        <select
                            multiple
                            value={categories}
                            onChange={(e) => {
                                const selectedOptions = Array.from(
                                    e.target.selectedOptions
                                ).map((option) => option.value);
                                setCategories(selectedOptions);
                            }}
                            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        >
                            <option value='Fiction'>Fiction</option>
                            <option value='Non-Fiction'>Non-Fiction</option>
                            <option value='Science'>Science</option>
                            <option value='History'>History</option>
                            <option value='Biography'>Biography</option>
                        </select>
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

export default ProductForm;