import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
    <nav className='w-64 bg-gray-800 text-white  flex flex-col'>
        <h2 className='text-2xl font-bold mb-6 text-primary p-4 '>
            E-Book Admin
        </h2>
        <ul className='space-y-2 text-lg'>
            <li className='py-4 hover:bg-gray-600 pl-4 '>
                <Link
                    to='/'
                    className='flex items-center space-x-2 hover:text-primary'
                >
                    <i className='ri-dashboard-line text-xl'></i>
                    <span>Dashboard</span>
                </Link>
            </li>
            <li className='py-4 hover:bg-gray-600 pl-4'>
                <Link
                    to='/orders'
                    className='flex items-center space-x-2 hover:text-primary'
                >
                    <i className='ri-file-list-line text-xl'></i>
                    <span>Orders</span>
                </Link>
            </li>
            <li className='py-4 hover:bg-gray-600 pl-4'>
                <Link
                    to='/products'
                    className='flex items-center space-x-2 hover:text-primary'
                >
                    <i className='ri-shopping-bag-line text-xl'></i>
                    <span>Products</span>
                </Link>
            </li>
            <li className='py-4 hover:bg-gray-600 pl-4'>
                <Link
                    to='/customers'
                    className='flex items-center space-x-2 hover:text-primary'
                >
                    <i className='ri-user-line text-xl'></i>
                    <span>Customers</span>
                </Link>
            </li>
        </ul>
    </nav>
);

export default Sidebar;
