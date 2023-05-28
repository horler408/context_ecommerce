import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
// import Context from './context/Context';
import './App.css';
import Admin from './pages/admin/Dashboard';
import Products from './pages/products/Products';
import SingleProduct from './pages/products/SingleProduct';
import Checkout from './pages/payments/Checkout';
import Dashboard from './pages/user/Dashboard';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import NotFound from './conponents/commons/NotFound';
// import Carts from './pages/products/Carts';
import Header from './conponents/Header';
import Cart from './pages/products/Cart';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          {/* <Route path="/carts/:id" element={<Carts />} /> */}
          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
