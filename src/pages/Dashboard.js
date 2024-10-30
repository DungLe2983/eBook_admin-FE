import React from 'react';
import DataCard from '../components/DataCard';
import SalesChart from '../components/SalesChart';

const Dashboard = () => {
    return (
        <div className='p-4 bg-white rounded shadow'>
            <h2 className='text-3xl font-bold mb-8 '>Dashboard</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-10'>
                <DataCard
                    title='Total Revenue'
                    number='6.268.500 VNĐ'
                    icon='ri-money-dollar-circle-fill'
                />
                <DataCard
                    title='Total Orders'
                    number='18'
                    icon='ri-shopping-bag-4-fill'
                />
                <DataCard title='Total Users' number='4' icon='ri-user-fill' />
                <DataCard
                    title='Total Products'
                    number='21'
                    icon='ri-price-tag-3-fill'
                />
                <DataCard
                    title='Total Categories'
                    number='7'
                    icon='ri-layout-2-fill'
                />
                <DataCard
                    title='Total Authors'
                    number='6'
                    icon='ri-book-open-fill'
                />
            </div>

            <div className='my-16 bg-white  h-full w-full flex items-center justify-center'>
                <SalesChart />
            </div>
        </div>
    );
};

export default Dashboard;
