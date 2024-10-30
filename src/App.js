import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Customers from './pages/Customers';


function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='orders' element={<Orders />} />
                    <Route path='products' element={<Products />} />
                    <Route path='customers' element={<Customers />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
