import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTimes, FaSignOutAlt } from "react-icons/fa";
import { menuLinks } from "../constants/menulinks";
import axios from "axios"; // Import axios for HTTP requests

const Sidemenu = ({ isSidebarOpen, closeSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("User"); // Default name

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.post(
          "https://pbwkbq0l-4000.uks1.devtunnels.ms/nylonhub/v1/security/profileVerify",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.user_name) {
          setUsername(response.data.user_name);
        } else {
          console.error("Username not found in response");
        }
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  const handleLinkClick = () => {
    closeSidebar();
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/"); // Redirect to the home page
    window.location.reload(); // Refresh the page
  };

  return (
    <div
      className={`bg-gradient-to-b from-[#3E3D45] to-[#0e1013] w-64 h-screen fixed top-0 left-0 overflow-y-auto transition-transform ease-in-out duration-300 transform z-50 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-x-2">
            <span className="bg-white h-[32px] w-[32px] flex items-center justify-center rounded-full">
              <span className="bg-[#ef6426] h-[30px] w-[30px] flex items-center justify-center rounded-full font-black text-white">
                {username.charAt(0).toUpperCase()}
              </span>
            </span>
            <div className="text-white">{username}</div>
          </div>
          <button
            onClick={closeSidebar}
            className="text-white hover:text-gray-400 transition duration-300 cursor-pointer"
          >
            <FaTimes size={25} />
          </button>
        </div>

        <hr className="mt-3 mb-3 border-gray-500" />
        <ul className="text-white space-y-3">
          {menuLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={handleLinkClick}
                className={
                  location.pathname === link.path
                    ? "active-link rounded-lg transition-all duration-200 p-3 w-full flex items-center gap-x-2"
                    : "p-3 w-full flex items-center gap-x-2 hover:bg-[#ffffff2e] rounded-lg transition-all duration-400"
                }
              >
                {link.icon} {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <hr className="mt-3 border-gray-500" />
        <button
          onClick={handleLogout}
          className="text-white hover:text-gray-400 transition duration-300 mt-6 p-3 w-full flex items-center rounded-lg cursor-pointer"
        >
          <FaSignOutAlt size={20} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidemenu;
