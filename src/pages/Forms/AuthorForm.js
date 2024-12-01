import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createAuthor, updateAuthorById } from "../../services/authorService";

const AuthorForm = ({ closeForm, onSubmit, initialData = null }) => {
  const [authorName, setAuthorName] = useState("");
  const [authorBio, setAuthorBio] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [authorWebsite, setAuthorWebsite] = useState("");

  useEffect(() => {
    if (initialData) {
      setAuthorName(initialData.name || "");
      setAuthorBio(initialData.bio || "");
      setAuthorEmail(initialData.email || "");
      setAuthorWebsite(initialData.website || "");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: authorName,
      bio: authorBio,
      email: authorEmail,
      website: authorWebsite,
    };

    try {
      if (initialData) {
        await updateAuthorById(initialData.id, formData);
      } else {
        await createAuthor(formData);
      }
      onSubmit(formData);
      closeForm();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white w-[30rem] p-6 rounded-lg shadow-lg relative'>
        <h2 className='text-heading4-bold mb-8 text-center text-primary'>
          {initialData ? "Edit Author" : "Create Author"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Author Name
            </label>
            <input
              type='text'
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Enter author name'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Bio
            </label>
            <textarea
              value={authorBio}
              onChange={(e) => setAuthorBio(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Enter author bio'
            ></textarea>
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Enter author email'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Website
            </label>
            <input
              type='url'
              value={authorWebsite}
              onChange={(e) => setAuthorWebsite(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Enter author website'
            />
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

export default AuthorForm;
