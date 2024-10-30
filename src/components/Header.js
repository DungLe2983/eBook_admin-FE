import React from 'react';

const Header = () => (
    // <header className='bg-white shadow px-4 py-3 flex items-center justify-between'>
    //     <h1 className='text-lg font-semibold'>Dashboard</h1>
    //     <div className='flex items-center space-x-4'>
    //         <i className='ri-notification-3-line text-xl'></i>
    //         <i className='ri-user-line text-xl'></i>
    //     </div>
    // </header>
    <div className='bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200'>
        <div className='relative'>
            <i className='ri-search-line text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'></i>
            <input
                type='text'
                placeholder='Search...'
                className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 pr-4'
            />
        </div>
    </div>
);

export default Header;
