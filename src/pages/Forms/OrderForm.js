import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const OrderForm = ({ closeForm, onSubmit, initialData = null }) => {
    const [customerName, setCustomerName] = useState('');
    const [productId, setProductId] = useState('');
    const [orderTotal, setOrderTotal] = useState('');
    const [shipmentAddress, setShipmentAddress] = useState('');

    useEffect(() => {
        if (initialData) {
            setCustomerName(initialData.customer_name);
            setProductId(initialData.product_id);
            setOrderTotal(initialData.order_total);
            setShipmentAddress(initialData.shipment_address);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // const formData = {
        //     id: initialData ? initialData.id : new Date().getTime(), // Dùng ID cũ khi sửa, hoặc tạo ID mới khi thêm
        //     customer_name: customerName,
        //     product_id: productId,
        //     order_total: orderTotal,
        //     shipment_address: shipmentAddress,
        // };
        // onSubmit(formData);
        toast.success("Created Successfully")
        closeForm();
    };

    return (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white w-[30rem] p-6 rounded-lg shadow-lg relative'>
                <h2 className='text-heading4-bold mb-8 text-center text-primary'>
                    {initialData ? 'Edit Order' : 'Create Order'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Customer Name
                        </label>
                        <input
                            type='text'
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            placeholder='Nhập tên khách hàng'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Product ID
                        </label>
                        <input
                            type='text'
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            placeholder='Nhập ID sản phẩm'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Order Total
                        </label>
                        <input
                            type='text'
                            value={orderTotal}
                            onChange={(e) => setOrderTotal(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            placeholder='Nhập tổng đơn hàng'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Shipping Address
                        </label>
                        <input
                            type='text'
                            value={shipmentAddress}
                            onChange={(e) => setShipmentAddress(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            placeholder='Nhập địa chỉ giao hàng'
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

export default OrderForm;
