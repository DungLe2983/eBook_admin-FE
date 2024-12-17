import React, { useEffect, useState } from "react";
import DataCard from "../components/DataCard";
import SalesChart from "../components/SalesChart";
import { getAllBooks } from "../services/bookService";
import { getAllCategories } from "../services/categoryService";
import { getAllAuthors } from "../services/authorService";
import { getAllPublishers } from "../services/publisherService";
import { getAllUsers } from "../services/userService";
import { getAllOrders } from "../services/orderService";

const Dashboard = () => {
  const [dataCounts, setDataCounts] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalBooks: 0,
    totalCategories: 0,
    totalAuthors: 0,
    totalPublishers: 0,
  });

  const [orders, setOrders] = useState([]); // Dữ liệu đơn hàng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [
          booksData,
          categoriesData,
          authorsData,
          publishersData,
          usersData,
          ordersData,
        ] = await Promise.all([
          getAllBooks(),
          getAllCategories(),
          getAllAuthors(),
          getAllPublishers(),
          getAllUsers(),
          getAllOrders(),
        ]);

        const completedOrders = ordersData.data.filter(
          (order) => order.status === "Completed"
        );

        const totalRevenue = completedOrders.reduce(
          (sum, order) => sum + order.totalAmount,
          0
        );

        setDataCounts({
          totalRevenue: totalRevenue,
          totalOrders: ordersData.data.length,
          totalUsers: usersData.data.length,
          totalBooks: booksData.data.length,
          totalCategories: categoriesData.data.length,
          totalAuthors: authorsData.data.length,
          totalPublishers: publishersData.data.length,
        });

        setOrders(ordersData.data);
      } catch (error) {
        console.error("Failed to fetch data for dashboard:", error);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className='text-red-500'>{error}</p>;
  }

  return (
    <div className='p-4 bg-white rounded shadow'>
      <h2 className='text-heading3-bold mb-8'>Dashboard</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-10'>
        <DataCard
          title='Total Revenue'
          number={`${dataCounts.totalRevenue.toLocaleString()} VNĐ`}
          icon='ri-money-dollar-circle-fill'
        />
        <DataCard
          title='Total Orders'
          number={dataCounts.totalOrders}
          icon='ri-shopping-bag-4-fill'
        />
        <DataCard
          title='Total Users'
          number={dataCounts.totalUsers}
          icon='ri-user-fill'
        />
        <DataCard
          title='Total Books'
          number={dataCounts.totalBooks}
          icon='ri-price-tag-3-fill'
        />
        <DataCard
          title='Total Categories'
          number={dataCounts.totalCategories}
          icon='ri-layout-2-fill'
        />
        <DataCard
          title='Total Authors'
          number={dataCounts.totalAuthors}
          icon='ri-book-open-fill'
        />
      </div>

      <div className='my-16 bg-white h-full flex items-center '>
        <SalesChart orders={orders} />
      </div>
    </div>
  );
};

export default Dashboard;
