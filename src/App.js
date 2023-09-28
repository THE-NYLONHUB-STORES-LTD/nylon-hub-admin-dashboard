import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidemenu from "./components/Sidemenu";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Orders from "./components/Orders";
import Notifications from "./components/Notifications";
import Settings from "./components/Settings";
import Customers from "./components/Customers";

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <Sidemenu isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />{" "}
      <Navbar toggleSidebar={toggleSidebar} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/notification" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
    </>
  );
};

export default App;
