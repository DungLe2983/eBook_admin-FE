import React, { useEffect, useState } from "react";
import AuthorForm from "./Forms/AuthorForm";
import DeleteButton from "../components/DeleteButton.js";
import toast from "react-hot-toast";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  updateAuthorById,
} from "../services/authorService.js";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const data = await getAllAuthors();
        setAuthors(data.data);
      } catch (error) {
        console.log("Failed to fetch authors");
      }
    };

    fetchAuthors();
  }, []);

  // Lọc danh sách tác giả theo từ khóa tìm kiếm
  useEffect(() => {
    const filtered = authors.filter((author) =>
      author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAuthors(filtered);
  }, [searchTerm, authors]);

  const handleCreateAuthor = () => {
    setEditData(null);
    setIsFormOpen(true);
  };

  const handleEditAuthor = (author) => {
    setEditData(author);
    setIsFormOpen(true);
  };

  const confirmDeleteAuthor = (author) => {
    setSelectedAuthor(author);
    setDeleteModalOpen(true);
  };

  const handleSubmitAuthor = async (authorData) => {
    try {
      if (editData) {
        const updatedAuthor = await updateAuthorById(editData.id, authorData);
        setAuthors((prevAuthors) =>
          prevAuthors.map((author) =>
            author.id === editData.id ? updatedAuthor.data : author
          )
        );
        toast.success("Author updated successfully");
      } else {
        const newAuthor = await createAuthor(authorData);
        setAuthors((prevAuthors) => [...prevAuthors, newAuthor.data]);
        toast.success("Author created successfully");
      }
    } catch (error) {
      toast.error("Failed to save author");
    } finally {
      setIsFormOpen(false);
    }
  };

  const handleDeleteAuthor = async (id) => {
    try {
      await deleteAuthor(id);
      setAuthors((prevAuthors) =>
        prevAuthors.filter((author) => author.id !== id)
      );
      toast.success("Author deleted successfully");
    } catch (error) {
      toast.error("Failed to delete author");
    } finally {
      setDeleteModalOpen(false);
      setSelectedAuthor(null);
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
      <h2 className='text-heading3-bold mb-4'>Authors</h2>
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
          onClick={handleCreateAuthor}
          className='bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
        >
          Create Author
        </button>
      </div>

      <div className='overflow-x-auto mt-6'>
        <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
          <thead>
            <tr className='bg-gray-100 border-b border-gray-200'>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Name
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Bio
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Email
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Website
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAuthors.map((author) => (
              <tr
                key={author.id}
                className='border-b hover:bg-gray-100 transition-colors'
              >
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {author.name}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {author.bio}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {author.email}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  <a
                    href={author.website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 hover:underline'
                  >
                    {author.website}
                  </a>
                </td>
                <td className='px-4 py-3 text-sm text-gray-700 space-x-2'>
                  <button
                    onClick={() => handleEditAuthor(author)}
                    className='text-blue-600 hover:text-blue-800'
                  >
                    <i className='ri-edit-line'></i>
                  </button>
                  <button
                    onClick={() => confirmDeleteAuthor(author)}
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
        <AuthorForm
          closeForm={() => setIsFormOpen(false)}
          onSubmit={handleSubmitAuthor}
          initialData={editData}
        />
      )}
      {deleteModalOpen && selectedAuthor && (
        <DeleteButton
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => handleDeleteAuthor(selectedAuthor.id)}
          itemName={selectedAuthor.name}
        />
      )}
    </div>
  );
};

export default Authors;
