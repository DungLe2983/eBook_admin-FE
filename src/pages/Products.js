// import React, { useEffect, useState } from "react";
// import BookForm from "./Forms/ProductForm.js";
// import DeleteButton from "../components/DeleteButton.js";
// import toast from "react-hot-toast";
// import { deleteBook, getAllBooks } from "../services/bookService.js";

// const Products = () => {
//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [checked, setChecked] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const booksData = await getAllBooks();
//         setBooks(booksData.data);
//       } catch (error) {
//         toast.error("Failed to fetch data");
//       }
//     };

//     fetchData();
//   }, [checked]);

//   useEffect(() => {
//     const filtered = books.filter((book) =>
//       book.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredBooks(filtered);
//   }, [searchTerm, books]);

//   const handleCreateProduct = () => {
//     setEditData(null);
//     setIsFormOpen(true);
//   };

//   const handleEditBook = (book) => {
//     setEditData(book);
//     setIsFormOpen(true);
//   };

//   const confirmDeleteBook = (book) => {
//     setSelectedBook(book);
//     setDeleteModalOpen(true);
//   };

//   const handleDeleteBook = async (id) => {
//     try {
//       await deleteBook(id);
//       setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
//       toast.success("Book deleted successfully");
//     } catch (error) {
//       toast.error("Failed to delete book");
//     } finally {
//       setDeleteModalOpen(false);
//       setSelectedBook(null);
//     }
//   };
//   console.log("FilterBoooks===", filteredBooks);

//   return (
//     <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
//       <h2 className='text-heading3-bold mb-4'>List of Books</h2>
//       <div className='bg-white h-16 flex justify-between items-center border-b border-gray-200'>
//         <div className='relative'>
//           <i className='ri-search-line text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'></i>
//           <input
//             type='text'
//             placeholder='Search...'
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 pr-4'
//           />
//         </div>
//         <button
//           onClick={handleCreateProduct}
//           className='bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
//         >
//           Create Book
//         </button>
//       </div>

//       <div className='mt-6 overflow-x-auto'>
//         <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
//           <thead>
//             <tr className='bg-gray-100 border-b border-gray-200'>
//               <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
//                 Title
//               </th>
//               <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
//                 Author
//               </th>
//               <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
//                 Publisher
//               </th>
//               <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
//                 Categories
//               </th>
//               <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
//                 Publication Year
//               </th>
//               <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
//                 Stock Quantity
//               </th>
//               <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
//                 Price
//               </th>
//               <th className='px-4 py-2 text-sm font-medium text-gray-600 text-center'>
//                 Image
//               </th>
//               <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredBooks.map((book) => (
//               <tr key={book.id} className='border-b hover:bg-gray-50'>
//                 <td className='px-4 py-3 text-sm text-gray-700'>
//                   {book.title}
//                 </td>
//                 <td className='px-4 py-3 text-sm text-gray-700'>
//                   {book.authors.map((author) => author.name).join(", ")}
//                 </td>
//                 <td className='px-4 py-3 text-sm text-gray-700'>
//                   {book.publisher.name}
//                 </td>
//                 <td className='px-4 py-3 text-sm text-gray-700'>
//                   {book.categories.map((category) => category.name).join(", ")}
//                 </td>

//                 <td className='px-4 py-3 text-sm text-gray-700'>
//                   {book.publicationYear}
//                 </td>
//                 <td className='px-4 py-3 text-sm text-gray-700'>
//                   {book.stockQuantity}
//                 </td>
//                 <td className='px-4 py-3 text-sm text-red-500 font-semibold'>
//                   {book.price.toLocaleString("vi-VN", {
//                     style: "currency",
//                     currency: "VND",
//                   })}
//                 </td>
//                 <td className='px-4 py-3 text-sm text-gray-700'>
//                   <img
//                     src={book.coverImage}
//                     className='w-40 h-40 object-cover'
//                     alt='book cover'
//                   />
//                 </td>
//                 <td className='py-3 px-4 space-x-4'>
//                   <button
//                     onClick={() => handleEditBook(book)}
//                     className='text-blue-600 hover:text-blue-800 text-[18px]'
//                   >
//                     <i className='ri-edit-line'></i>
//                   </button>
//                   <button
//                     onClick={() => confirmDeleteBook(book)}
//                     className='text-red-600 hover:text-red-800 text-[18px]'
//                   >
//                     <i className='ri-delete-bin-line'></i>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {isFormOpen && (
//         <BookForm
//           closeForm={() => setIsFormOpen(false)}
//           reload={() => setChecked(!checked)}
//           initialData={editData}
//         />
//       )}
//       {deleteModalOpen && selectedBook && (
//         <DeleteButton
//           onClose={() => setDeleteModalOpen(false)}
//           onConfirm={() => handleDeleteBook(selectedBook.id)}
//           itemName={selectedBook.title}
//         />
//       )}
//     </div>
//   );
// };

// export default Products;

import React, { useEffect, useState } from "react";
import BookForm from "./Forms/ProductForm.js";
import DeleteButton from "../components/DeleteButton.js";
import toast from "react-hot-toast";
import { deleteBook, getBooksByPage } from "../services/bookService.js";

const Products = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [checked, setChecked] = useState(false);

  const [currentPage, setCurrentPage] = useState(2);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBooksByPage(currentPage, pageSize);
        console.log("response===", response);
        setBooks(response.data);
   
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, [currentPage, pageSize, checked]);

  useEffect(() => {
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  const handleCreateProduct = () => {
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

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      setChecked(!checked); // Trigger reload
      toast.success("Book deleted successfully");
    } catch (error) {
      toast.error("Failed to delete book");
    } finally {
      setDeleteModalOpen(false);
      setSelectedBook(null);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  console.log("totalPage==", totalPages);
  return (
    <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
      <h2 className='text-heading3-bold mb-4'>List of Books</h2>
      <div className='bg-white h-16 flex justify-between items-center border-b border-gray-200'>
        <div className='relative'>
          <i className='ri-search-line text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'></i>
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            {filteredBooks.map((book) => (
              <tr key={book.id} className='border-b hover:bg-gray-50'>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {book.title}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {book.authors.map((author) => author.name).join(", ")}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {book.publisher.name}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {book.categories.map((category) => category.name).join(", ")}
                </td>

                <td className='px-4 py-3 text-sm text-gray-700'>
                  {book.publicationYear}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {book.stockQuantity}
                </td>
                <td className='px-4 py-3 text-sm text-red-500 font-semibold'>
                  {book.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  <img
                    src={book.coverImage}
                    className='w-40 h-40 object-cover'
                    alt='book cover'
                  />
                </td>
                <td className='py-3 px-4 space-x-4'>
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

      <div className='flex justify-center items-center mt-4 space-x-2'>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page + 1)}
            className={`px-4 py-2 border rounded ${
              page + 1 === currentPage
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>

      {isFormOpen && (
        <BookForm
          closeForm={() => setIsFormOpen(false)}
          reload={() => setChecked(!checked)}
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
