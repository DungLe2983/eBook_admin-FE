import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateOrderStatus } from "../../services/orderService";

const OrderForm = ({ closeForm, reload, initialData = null }) => {
  const [customerName, setCustomerName] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [orderDate, setOrderDate] = useState("");
  const [shipmentAddress, setShipmentAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (initialData) {
      setCustomerName(initialData.userName || "");
      setOrderItems(initialData.orderItems || []);
      setTotalAmount(initialData.totalAmount || 0);
      setShipmentAddress(initialData.address || "");
      setOrderDate(initialData.orderDate || "");
      setPhoneNumber(initialData.phoneNumber || "");
      setStatus(initialData.status || "Pending");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingData = {
      userName: customerName,
      orderItems: orderItems,
      totalAmount: totalAmount,
      address: shipmentAddress,
      phoneNumber: phoneNumber,
      orderDate: orderDate,
      status: status, // Chỉ thay đổi status
    };

    try {
      await updateOrderStatus(initialData.id, status, existingData);
      toast.success("Order status updated successfully");
      reload();
      closeForm();
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white w-full max-w-5xl p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]'>
        <h2 className='text-heading4-bold mb-8 text-center text-primary'>
          {initialData ? "Edit Order" : "Create Order"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Customer Name */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Order Date
            </label>
            <input
              type='text'
              value={
                new Date(initialData?.orderDate).toLocaleDateString() || ""
              }
              readOnly
              className='mt-1 block w-full px-3 py-2 border bg-gray-200 cursor-not-allowed border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Customer Name
            </label>
            <input
              type='text'
              value={customerName}
              readOnly
              className='mt-1 block w-full px-3 py-2 border bg-gray-200 cursor-not-allowed border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm'
            />
          </div>

          {/* Shipping Address */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Shipping Address
            </label>
            <input
              type='text'
              value={shipmentAddress}
              readOnly
              className='mt-1 block w-full px-3 py-2 border bg-gray-200 cursor-not-allowed border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm'
            />
          </div>

          {/* Phone Number */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Phone Number
            </label>
            <input
              type='text'
              value={phoneNumber}
              readOnly
              className='mt-1 block w-full px-3 py-2 border bg-gray-200 cursor-not-allowed border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm'
            />
          </div>

          {/* Status */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            >
              <option value='Pending'>Pending</option>
              <option value='Completed'>Completed</option>
              <option value='Cancelled'>Cancelled</option>
            </select>
          </div>

          {/* Order Items */}
          <div className='mb-4'>
            <h3 className='text-sm font-medium text-gray-700 mb-2'>
              Order Items
            </h3>
            <table className='min-w-full bg-white border border-gray-300 rounded-md'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                    Title
                  </th>
                  <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                    Image
                  </th>
                  <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                    Quantity
                  </th>
                  <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                    Price
                  </th>
                  <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item, index) => (
                  <tr key={index} className='border-b'>
                    <td className='px-4 py-2 font-semibold'>
                      <span>{item.book.title}</span>
                    </td>
                    <td className='px-4 py-2'>
                      <img
                        src={item.book.coverImage}
                        className='w-14 h-20 object-cover'
                        alt='book cover'
                      />
                    </td>
                    <td className='px-4 py-2 text-center'>
                      <span>{item.quantity}</span>
                    </td>
                    <td className='px-4 py-2'>
                      <span>{item.book.price.toLocaleString()} đ</span>
                    </td>
                    <td className='px-4 py-2 font-bold'>
                      <span>{item.priceAtTime.toLocaleString()} đ</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
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
