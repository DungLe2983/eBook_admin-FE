import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import OrderForm from "./Forms/OrderForm";
import DeleteButton from "../components/DeleteButton.js";
import toast from "react-hot-toast";
import { deleteOrder, getAllOrders } from "../services/orderService.js";
import { getUserById } from "../services/userService.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        const ordersWithUserDetails = await Promise.all(
          data.data.map(async (order) => {
            if (order.userId) {
              try {
                const user = await getUserById(order.userId);
                return {
                  ...order,
                  userName: user.data.fullName,
                  address: user.data.address,
                  phoneNumber: user.data.phoneNumber,
                };
              } catch (error) {
                console.error(
                  `Failed to fetch user details for userId: ${order.userId}`,
                  error
                );
                return {
                  ...order,
                  userName: "Unknown",
                  address: "N/A",
                  phoneNumber: "N/A",
                };
              }
            }
            return {
              ...order,
              userName: "Anonymous",
              address: "N/A",
              phoneNumber: "N/A",
            };
          })
        );
        setOrders(ordersWithUserDetails);
      } catch (error) {
        console.log("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, [checked]);

  const handleEditOrder = (order) => {
    setEditData(order);
    setIsFormOpen(true);
  };

  const confirmDeleteOrder = (order) => {
    setSelectedOrder(order);
    setDeleteModalOpen(true);
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
      setDeleteModalOpen(false);
      toast.success("Order deleted successfully");
    } catch (error) {
      toast.error("Failed to delete order");
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.orderDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
      <h2 className='text-heading3-bold mb-4'>Orders</h2>
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
      </div>

      <div className='mt-6 overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
          <thead>
            <tr className='bg-gray-100 border-b border-gray-200'>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Order Date
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Customer
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Address
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Phone
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600 '>
                Number of Items
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Total Amount
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Status
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr
                key={order.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {order.orderDate
                    ? format(new Date(order.orderDate), "dd MMM yyyy")
                    : "N/A"}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {order.userName}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {order.address}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {order.phoneNumber}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {order.orderItems.length}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {order.totalAmount.toLocaleString()} đ
                </td>
                <td className='px-4 py-3 text-sm font-medium'>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
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
                    onClick={() => confirmDeleteOrder(order)}
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
          reload={() => setChecked(!checked)}
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
