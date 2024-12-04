import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getAllAuthors } from "../../services/authorService";
import { getAllCategories } from "../../services/categoryService";
import { getAllPublishers } from "../../services/publisherService";
import { createBook, updateBookById } from "../../services/bookService";
import { createBookAuthor } from "../../services/bookAuthorService";
import { createBookCategory } from "../../services/bookCategoryService";
import { uploadToCloudinary } from "../../services/uploadService";

const ProductForm = ({ closeForm, reload, initialData = null }) => {
  const [title, setTitle] = useState("");
  const [authorId, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [coverImage, setCoverImage] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);
  const [allPublishers, setAllPublishers] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authors = await getAllAuthors();
        const categories = await getAllCategories();
        const publishers = await getAllPublishers();
        setAllAuthors(authors.data);
        setAllCategories(categories.data);
        setAllPublishers(publishers.data);
      } catch (error) {
        toast.error("Failed to load authors, publishers, or categories");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.authors?.map((p) => p.id) || []);
      setPublisher(initialData.publisherId);
      setPublicationYear(initialData.publicationYear);
      setPrice(initialData.price);
      setStockQuantity(initialData.stockQuantity);
      setCoverImage(initialData.coverImage);
      setDescription(initialData.description);
      setCategories(initialData.categories?.map((cat) => cat.id) || []);
      setDiscountPercentage(initialData.discountPercentage || 0);
    }
  }, [initialData]);

  console.log("initialData", initialData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      description,
      publicationYear: parseInt(publicationYear, 10),
      price: parseFloat(price),
      stockQuantity: parseInt(stockQuantity, 10),
      coverImage,
      discountPercentage: parseFloat(discountPercentage),
      publisherId: publisher,
      categoryIds: categories,
      authorIds: Array.isArray(authorId) ? authorId : [authorId],
    };

    try {
      if (initialData) {
        console.log("formData Update :", formData);
        await updateBookById(initialData.id, formData);

        toast.success("Book updated successfully!");
      } else {
        console.log("formData Create :", formData);
        const bookResponse = await createBook(formData);
        const { id: bookId } = bookResponse.data.data;

        for (const categoryId of categories) {
          await createBookCategory({ bookId, categoryId });
        }

        await createBookAuthor({ bookId, authorId });
        toast.success("Book created successfully!");
      }
      reload();
      closeForm();
    } catch (error) {
      toast.error("Failed to create book or its relationships.");
      console.error(error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const url = await uploadToCloudinary(file);
      if (url) {
        setCoverImage(url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("An error occurred while uploading the image.");
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]'>
        <h2 className='text-heading4-bold mb-8 text-center text-primary'>
          {initialData ? "Edit Book" : "Create Book"}
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
            <select
              value={authorId}
              onChange={(e) => setAuthor(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              required
            >
              <option value='' disabled>
                Select author
              </option>
              {allAuthors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Publisher
            </label>
            <select
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              required
            >
              <option value='' disabled>
                Select publisher
              </option>
              {allPublishers.map((publisher) => (
                <option key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </option>
              ))}
            </select>
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
              Discount (%)
            </label>
            <input
              type='number'
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Enter discount percentage'
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
              Cover Image
            </label>
            <input
              type='file'
              onChange={handleImageUpload}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              accept='image/*'
            />
            {coverImage && (
              <div className='mt-2'>
                <img
                  src={coverImage}
                  alt='Cover Preview'
                  className='max-w-full h-auto'
                />
              </div>
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
              {allCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
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
