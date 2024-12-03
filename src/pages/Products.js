import React, { useState, useEffect } from "react";
import { getBookAuthor } from "../services/bookAuthorService";
import { getAllPublishers } from "../services/publisherService";
import DeleteButton from "../components/DeleteButton";
import BookForm from "./Forms/ProductForm";
import { getBookCategory } from "../services/bookCategoryService";

const Products = () => {
  const [bookAuthors, setBookAuthors] = useState([]);
  const [bookCategories, setBookCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchBookAuthorsAndPublishers = async () => {
      try {
        const bookAuthorData = await getBookAuthor();
        if (bookAuthorData && bookAuthorData.data) {
          setBookAuthors(bookAuthorData.data);
        } else {
          console.error("No data found for BookAuthors");
        }

        const publisherData = await getAllPublishers();
        if (publisherData && publisherData.data) {
          setPublishers(publisherData.data);
        } else {
          console.error("No data found for Publishers");
        }
        const bookCategoryData = await getBookCategory();
        if (bookCategoryData && bookCategoryData.data) {
          setBookCategories(bookCategoryData.data);
        } else {
          console.error("No data found for bookCategory");
        }
      } catch (error) {
        console.log("Failed to fetch BookAuthors or Publishers");
      }
    };

    fetchBookAuthorsAndPublishers();
  }, [checked]);

  const getAuthorName = (authorId) => {
    const author = bookAuthors.find((ba) => ba.author.id === authorId);
    return author ? author.author.name : "Unknown Author";
  };

  const getPublisherName = (publisherId) => {
    const publisher = publishers.find((p) => p.id === publisherId);
    return publisher ? publisher.name : "Unknown Publisher";
  };

  const getCategoryName = (categoryId) => {
    const category = bookCategories.find((cd) => cd.category.id === categoryId);

    return category ? category.category.name : "Unknown Category";
  };

  const confirmDeleteBook = (book) => {
    setDeleteModalOpen(true);
  };
  const handleCreateProduct = () => {
    setEditData(null);
    setIsFormOpen(true);
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
      <h2 className='text-heading3-bold mb-4'>List of Books</h2>
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
          onClick={handleCreateProduct}
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
                Publisher
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Categories
              </th>
              {/* <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Description
              </th> */}
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Publication Year
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Stock Quantity
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Price
              </th>
              <th className='px-4 py-2 text-sm font-medium text-gray-600 text-center'>
                Image
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bookAuthors.map((item) => (
              <tr key={item.id} className='border-b hover:bg-gray-50'>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {item.book.title}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {getAuthorName(item.authorId)}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {getPublisherName(item.book.publisherId)}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {getCategoryName(item)}
                </td>
                {/* <td className='px-4 py-3 text-sm text-gray-700'>
                  {item.book.description}
                </td> */}
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {item.book.publicationYear}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {item.book.stockQuantity}
                </td>
                <td className='px-4 py-3 text-sm text-red-500 font-semibold'>
                  {item.book.price}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  <img
                    src={item.book.coverImage}
                    className='w-40 h-40 object-cover'
                    alt='book cover'
                  />
                </td>
                <td className='py-3 px-4 space-x-4'>
                  <button
                    onClick={() => setEditData(item)}
                    className='text-blue-600 hover:text-blue-800 text-[18px]'
                  >
                    <i className='ri-edit-line'></i>
                  </button>
                  <button
                    onClick={() => confirmDeleteBook()}
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
        <div className='form-container'>
          <BookForm
            closeForm={() => setIsFormOpen(false)}
            initialData={editData}
            reload={() => setChecked(!checked)}
          />
        </div>
      )}
      {deleteModalOpen && (
        <DeleteButton onClose={() => setDeleteModalOpen(false)} />
      )}
    </div>
  );
};

export default Products;
