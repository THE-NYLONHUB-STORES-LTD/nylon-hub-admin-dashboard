import React from "react";
import { FaBars } from "react-icons/fa";
import Logo from "./Logo";

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-[#202020] p-4 px-7 sm:px-24 fixed inset-x-0 z-40">
      <div className="flex items-center justify-between">
        <button onClick={toggleSidebar} className="text-white">
          <FaBars size={25} />
        </button>
        <Logo />
      </div>
    </header>
  );
};

export default Navbar;
