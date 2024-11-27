import React, { useState } from 'react';
import DeleteButton from '../components/DeleteButton.js';
import toast from 'react-hot-toast';
import PublisherForm from './Forms/PublisherForm.js';

const Publishers = () => {
    const [publishers, setPublishers] = useState([
        {
            id: '1',
            name: 'Penguin Books',
            phone: '123-456-789',
            address: '123 Publisher Lane, New York, USA',
            email: 'contact@penguin.com',
            website: 'https://www.penguin.com',
        },
        {
            id: '2',
            name: 'HarperCollins',
            phone: '987-654-321',
            address: '456 Book Street, London, UK',
            email: 'info@harpercollins.com',
            website: 'https://www.harpercollins.com',
        },
    ]);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedPublisher, setSelectedPublisher] = useState(null);

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

    const handleDeletePublisher = (publisherId) => {
        setPublishers((prevPublishers) =>
            prevPublishers.filter((publisher) => publisher.id !== publisherId)
        );
        setDeleteModalOpen(false);
        toast.success('Publisher deleted successfully');
    };

    const handleSubmitPublisher = (publisherData) => {
        if (editData) {
            // Update existing publisher
            setPublishers((prevPublishers) =>
                prevPublishers.map((publisher) =>
                    publisher.id === publisherData.id
                        ? publisherData
                        : publisher
                )
            );
        } else {
            // Add new publisher
            setPublishers((prevPublishers) => [
                ...prevPublishers,
                {
                    ...publisherData,
                    id: new Date().getTime().toString(),
                },
            ]);
        }
        setIsFormOpen(false);
        toast.success('Publisher saved successfully');
    };

    return (
        <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
            <h2 className='text-heading3-bold mb-4 '>Publishers</h2>
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
                                ID
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Name
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Phone
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Address
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
                        {publishers.map((publisher) => (
                            <tr
                                key={publisher.id}
                                className='border-b hover:bg-gray-100 transition-colors'
                            >
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {publisher.id}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {publisher.name}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {publisher.phone}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {publisher.address}
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
                                <td className='px-4 py-3 text-sm text-gray-700 flex space-x-2'>
                                    <button
                                        onClick={() =>
                                            handleEditPublisher(publisher)
                                        }
                                        className='text-blue-600 hover:text-blue-800'
                                    >
                                        <i className='ri-edit-line'></i>
                                    </button>
                                    <button
                                        onClick={() =>
                                            confirmDeletePublisher(publisher)
                                        }
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
                    onConfirm={() =>
                        handleDeletePublisher(selectedPublisher.id)
                    }
                    itemName={selectedPublisher.name}
                />
            )}
        </div>
    );
};

export default Publishers;
