import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CartPage from "./pages/CartPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import OrdersPage from "./pages/OrdersPage";
import ProductPage from "./pages/ProductPage";
import ProductsPage from "./pages/ProductsPage";
import SingleOrderPage from "./pages/SingleOrderPage";
import Modal from "./components/Modal";
import { useState } from "react";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<ProductsPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="orders/:id" element={<SingleOrderPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="logout" element={<LogoutPage />} />
        <Route path="create" element={<CreateOrderPage />} />
      </Route>
    </Routes>
  );
};

export default App;
