import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import OrderForm from './Forms/OrderForm';
import DeleteButton from '../components/DeleteButton.js';
import toast from 'react-hot-toast';

const Orders = () => {
    const [orders, setOrders] = useState([
        {
            id: '1',
            product_id: '4324',
            customer_id: '23143',
            customer_name: 'Shirley A. Lape',
            order_date: '2022-05-17T03:24:00',
            order_total: '$435.50',
            current_order_status: 'Pending',
            shipment_address: 'Cottage Grove, OR 97424',
        },
        {
            id: '2',
            product_id: '12345',
            customer_id: '1515',
            customer_name: 'Shirley A. Lape',
            order_date: '2022-05-17T03:24:00',
            order_total: '$435.50',
            current_order_status: 'Completed',
            shipment_address: 'Cottage Grove, OR 97424',
        },
        // Các đơn hàng khác...
    ]);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleCreateOrder = () => {
        setEditData(null);
        setIsFormOpen(true);
    };

    const handleEditOrder = (order) => {
        setEditData(order);
        setIsFormOpen(true);
    };

    const confirmDeleteOrder = (order) => {
        setSelectedOrder(order);
        setDeleteModalOpen(true);
    };
    const handleDeleteOrder = (orderId) => {
        // setOrders((prevOrders) =>
        //     prevOrders.filter((order) => order.id !== orderId)
        // );
        // setDeleteModalOpen(false);
        toast.success('Delete Order Successfully');
    };

    const handleSubmitOrder = (orderData) => {
        if (editData) {
            // Cập nhật đơn hàng
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderData.id ? orderData : order
                )
            );
        } else {
            // Thêm đơn hàng mới
            setOrders((prevOrders) => [...prevOrders, orderData]);
        }
        setIsFormOpen(false);
    };

    return (
        <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
            <h2 className='text-heading3-bold mb-4 '>Orders</h2>
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
                    onClick={handleCreateOrder}
                    className='bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
                >
                    Create Order
                </button>
            </div>

            <div className='mt-6 overflow-x-auto'>
                <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
                    <thead>
                        <tr className='bg-gray-100 border-b border-gray-200'>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                ID
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Product ID
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Customer Name
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Order Date
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Order Total
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Shipping Address
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Order Status
                            </th>
                            <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr
                                key={order.id}
                                className={`border-b ${
                                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                } hover:bg-gray-100 transition-colors`}
                            >
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {order.id}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {order.product_id}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {order.customer_name}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {format(
                                        new Date(order.order_date),
                                        'dd MMM yyyy'
                                    )}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {order.order_total}
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700'>
                                    {order.shipment_address}
                                </td>
                                <td className='px-4 py-3 text-sm font-medium'>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${
                                            order.current_order_status ===
                                            'Completed'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                        }`}
                                    >
                                        {order.current_order_status}
                                    </span>
                                </td>
                                <td className='px-4 py-3 text-sm text-gray-700 flex space-x-4'>
                                    <button
                                        onClick={() => handleEditOrder(order)}
                                        className='text-blue-600 hover:text-blue-800 text-[18px]'
                                    >
                                        <i className='ri-edit-line'></i>
                                    </button>
                                    <button
                                        onClick={() =>
                                            confirmDeleteOrder(order)
                                        }
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
            {isFormOpen && (
                <OrderForm
                    closeForm={() => setIsFormOpen(false)}
                    onSubmit={handleSubmitOrder}
                    initialData={editData}
                />
            )}
            {deleteModalOpen && selectedOrder && (
                <DeleteButton
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={() => handleDeleteOrder(selectedOrder.id)}
                    itemName={selectedOrder.id}
                />
            )}
        </div>
    );
};

export default Orders;
