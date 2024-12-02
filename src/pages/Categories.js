import React, { useEffect, useState } from "react";
import CategoriesForm from "../pages/Forms/CategoriesForm.js";
import DeleteButton from "../components/DeleteButton.js";
import toast from "react-hot-toast";
import {
  getAllCategories,
  createCategory,
  updateCategoryById,
  deleteCategory,
} from "../services/categoryService.js";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data.data);
      } catch (error) {
        console.log("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

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

  const handleSubmitCategory = async (categoryData) => {
    try {
      if (editData) {
        const updatedCategory = await updateCategoryById(
          editData.id,
          categoryData
        );
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === editData.id ? updatedCategory.data : category
          )
        );
        toast.success("Category updated successfully");
      } else {
        const newCategory = await createCategory(categoryData);
        setCategories((prevCategories) => [
          ...prevCategories,
          newCategory.data,
        ]);
        toast.success("Category created successfully");
      }
    } catch (error) {
      toast.error("Failed to save category");
    } finally {
      setIsFormOpen(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete category");
    } finally {
      setDeleteModalOpen(false);
      setSelectedCategory(null);
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
      <h2 className='text-heading3-bold mb-4'>Categories</h2>
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
                Category Name
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Description
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr
                key={category.id}
                className='border-b hover:bg-gray-100 transition-colors'
              >
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {category.name}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {category.description}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700 space-x-2'>
                  <button
                    onClick={() => handleEditCategory(category)}
                    className='text-blue-600 hover:text-blue-800'
                  >
                    <i className='ri-edit-line'></i>
                  </button>
                  <button
                    onClick={() => confirmDeleteCategory(category)}
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
