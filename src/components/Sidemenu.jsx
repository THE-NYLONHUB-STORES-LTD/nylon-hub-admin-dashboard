import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTimes, FaSignOutAlt } from "react-icons/fa"; // Import the close icon from React Icons
import { menuLinks } from "../constants/menulinks";

const Sidemenu = ({ isSidebarOpen, closeSidebar }) => {
  const location = useLocation();

  const handleLinkClick = () => {
    // Close the sidebar when a link is clicked
    closeSidebar();
  };

  return (
    <div
      className={` bg-gradient-to-b from-[#3E3D45] to-[#0e1013] w-64 h-screen fixed top-0 left-0 overflow-y-auto transition-transform ease-in-out duration-300 transform z-50  ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          {/* <h2 className="text-white text-2xl">Menu</h2> */}
          <div className=" flex items-center gap-x-2">
            <span className="bg-white h-[32px] w-[32px] flex items-center justify-center rounded-full">
              <span className=" bg-[#ef6426] h-[30px] w-[30px] flex items-center justify-center rounded-full font-black text-white">
                A
              </span>
            </span>

            <div className=" text-white">Adedamola</div>
          </div>

          <button
            onClick={closeSidebar}
            className="text-white hover:text-gray-400 transition duration-300"
          >
            <FaTimes size={25} /> {/* Use the FaTimes icon component */}
          </button>
        </div>

        <hr className=" mt-3 mb-3 border-gray-500" />
        <ul className="text-white space-y-3">
          {menuLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={handleLinkClick}
                className={
                  location.pathname === link.path
                    ? "active-link  rounded-lg transition-all duration-200 p-3 w-full flex items-center gap-x-2 "
                    : "p-3 w-full flex items-center gap-x-2 hover:bg-[#ffffff2e] rounded-lg transition-all duration-400"
                }
              >
                {link.icon} {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <hr className=" mt-3 border-gray-500" />
        <button className="text-white hover:text-gray-400 transition duration-300 mt-6 p-3 w-full flex  items-center rounded-lg">
          <FaSignOutAlt size={20} className="mr-2" />{" "}
          {/* Use the FaSignOutAlt icon component */}
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidemenu;
