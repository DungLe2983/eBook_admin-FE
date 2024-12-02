import React, { useEffect, useState } from "react";
import PublisherForm from "./Forms/PublisherForm";
import DeleteButton from "../components/DeleteButton.js";
import toast from "react-hot-toast";
import {
  createPublisher,
  deletePublisher,
  getAllPublishers,
  updatePublisherById,
} from "../services/publisherService.js";

const Publishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPublishers, setFilteredPublishers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPublisher, setSelectedPublisher] = useState(null);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const data = await getAllPublishers();
        setPublishers(data.data);
      } catch (error) {
        console.log("Failed to fetch publishers");
      }
    };

    fetchPublishers();
  }, []);

  useEffect(() => {
    const filtered = publishers.filter((publisher) =>
      publisher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPublishers(filtered);
  }, [searchTerm, publishers]);

  const handleCreatePublisher = () => {
    setEditData(null);
    setIsFormOpen(true);
  };

  const handleEditPublisher = (publisher) => {
    setEditData(publisher);
    setIsFormOpen(true);
  };

  const confirmDeletePublisher = (publisher) => {
    setSelectedPublisher(publisher);
    setDeleteModalOpen(true);
  };

  const handleSubmitPublisher = async (publisherData) => {
    try {
      if (editData) {
        const updatedPublisher = await updatePublisherById(
          editData.id,
          publisherData
        );
        setPublishers((prevPublishers) =>
          prevPublishers.map((publisher) =>
            publisher.id === editData.id ? updatedPublisher.data : publisher
          )
        );
        toast.success("Publisher updated successfully");
      } else {
        const newPublisher = await createPublisher(publisherData);
        setPublishers((prevPublishers) => [
          ...prevPublishers,
          newPublisher.data,
        ]);
        toast.success("Publisher created successfully");
      }
    } catch (error) {
      toast.error("Failed to save publisher");
    } finally {
      setIsFormOpen(false);
    }
  };

  const handleDeletePublisher = async (id) => {
    try {
      await deletePublisher(id);
      setPublishers((prevPublishers) =>
        prevPublishers.filter((publisher) => publisher.id !== id)
      );
      toast.success("Publisher deleted successfully");
    } catch (error) {
      toast.error("Failed to delete publisher");
    } finally {
      setDeleteModalOpen(false);
      setSelectedPublisher(null);
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
      <h2 className='text-heading3-bold mb-4'>Publishers</h2>
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
          onClick={handleCreatePublisher}
          className='bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
        >
          Create Publisher
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
                Address
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Phone
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
            {filteredPublishers.map((publisher) => (
              <tr
                key={publisher.id}
                className='border-b hover:bg-gray-100 transition-colors'
              >
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {publisher.name}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {publisher.address}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {publisher.phone}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {publisher.email}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  <a
                    href={publisher.website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 hover:underline'
                  >
                    {publisher.website}
                  </a>
                </td>
                <td className='px-4 py-3 text-sm text-gray-700 space-x-2'>
                  <button
                    onClick={() => handleEditPublisher(publisher)}
                    className='text-blue-600 hover:text-blue-800'
                  >
                    <i className='ri-edit-line'></i>
                  </button>
                  <button
                    onClick={() => confirmDeletePublisher(publisher)}
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
        <PublisherForm
          closeForm={() => setIsFormOpen(false)}
          onSubmit={handleSubmitPublisher}
          initialData={editData}
        />
      )}
      {deleteModalOpen && selectedPublisher && (
        <DeleteButton
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => handleDeletePublisher(selectedPublisher.id)}
          itemName={selectedPublisher.name}
        />
      )}
    </div>
  );
};

export default Publishers;
