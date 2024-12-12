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
    totalRevenue: 0, // Tổng doanh thu
    totalOrders: 0, // Tổng số đơn hàng
    totalUsers: 0, // Tổng số người dùng
    totalBooks: 0,
    totalCategories: 0,
    totalAuthors: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksData = await getAllBooks();
        const categoriesData = await getAllCategories();
        const authorsData = await getAllAuthors();
        const publishersData = await getAllPublishers();
        const usersData = await getAllUsers();
        const ordersData = await getAllOrders();

        // Tính tổng doanh thu từ các đơn hàng có trạng thái 'Completed'
        const totalRevenue = ordersData.data
          .filter((order) => order.status === "Completed") // Chỉ lấy các đơn hàng có trạng thái 'Completed'
          .reduce((sum, order) => sum + order.totalAmount, 0); // Cộng dồn totalAmount

        setDataCounts({
          totalRevenue: totalRevenue,
          totalOrders: ordersData.data.length,
          totalUsers: usersData.data.length,
          totalBooks: booksData.data.length,
          totalCategories: categoriesData.data.length,
          totalAuthors: authorsData.data.length,
          totalPublishers: publishersData.data.length,
        });
      } catch (error) {
        console.error("Failed to fetch data for dashboard:", error);
      }
    };

    fetchData();
  }, []);

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

      <div className='my-16 bg-white  h-full w-full flex items-center justify-center'>
        <SalesChart />
      </div>
    </div>
  );
};

export default Dashboard;
