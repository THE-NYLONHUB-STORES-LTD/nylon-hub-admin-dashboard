import React from "react";
import { FaMoneyBill, FaUser, FaUserPlus, FaDollarSign } from "react-icons/fa";

const Stats = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 ss:grid-cols-2 gap-8 mt-10">
        <div className="relative bg-white shadow-lg shadow-slate-200 w-full h-[10rem] p-6 rounded-xl">
          <div className="absolute -top-4 left-3 bg-gradient-to-b from-[#3E3D45] to-[#0e1013] h-[55px] w-[55px] rounded-xl flex items-center justify-center">
            <FaMoneyBill size={24} color="white" />
          </div>
          <div className="text-[#7b809a] text-right">
            <h1>Today's Money</h1>
            <h1 className="font-bold text-3xl text-[#344767]">₦200k</h1>
          </div>

          <div className="h-[2px] w-full mt-5  bg-gradient-to-r from-[#ffffff] via-[#dddddd] to-white"></div>

          <div className="mt-3">
            <h2>
              {" "}
              <span className=" text-green-500 font-medium">+55%</span> than
              last week
            </h2>
          </div>
        </div>

        <div className="relative bg-white shadow-lg shadow-slate-200 w-full h-[10rem] p-6 rounded-xl">
          <div className="absolute -top-4 left-3 bg-gradient-to-b from-[#ff9564] to-[#ef6426] h-[55px] w-[55px] rounded-xl flex items-center justify-center">
            <FaUser size={24} color="white" />
          </div>
          <div className="text-[#7b809a] text-right">
            <h1>Today's Users</h1>
            <h1 className="font-bold text-3xl text-[#344767]">500</h1>
          </div>

          <div className="h-[2px] w-full mt-5  bg-gradient-to-r from-[#ffffff] via-[#dddddd] to-white"></div>

          <div className="mt-3">
            <h2>
              {" "}
              <span className=" text-green-500 font-medium">+3%</span> than last
              month
            </h2>
          </div>
        </div>

        <div className="relative bg-white shadow-lg shadow-slate-200 w-full h-[10rem] p-6 rounded-xl">
          <div className="absolute -top-4 left-3 bg-gradient-to-b from-[#4bb57e] to-[#0b8d4a] h-[55px] w-[55px] rounded-xl flex items-center justify-center">
            <FaUserPlus size={24} color="white" />
          </div>
          <div className="text-[#7b809a] text-right">
            <h1>Pending Orders</h1>
            <h1 className="font-bold text-3xl text-[#344767]">100</h1>
          </div>

          <div className="h-[2px] w-full mt-5  bg-gradient-to-r from-[#ffffff] via-[#dddddd] to-white"></div>

          <div className="mt-3">
            <h2>
              {" "}
              <span className=" text-red-600 font-medium">-2%</span> than
              yesterday
            </h2>
          </div>
        </div>

        <div className="relative bg-white shadow-lg shadow-slate-200 w-full h-[10rem] p-6 rounded-xl">
          <div className="absolute -top-4 left-3 bg-gradient-to-b from-[#64aaff] to-[#1d71ca] h-[55px] w-[55px] rounded-xl flex items-center justify-center">
            <FaDollarSign size={24} color="white" />
          </div>
          <div className="text-[#7b809a] text-right">
            <h1>Completed Order</h1>
            <h1 className="font-bold text-3xl text-[#344767]">₦305,000 </h1>
          </div>

          <div className="h-[2px] w-full mt-5  bg-gradient-to-r from-[#ffffff] via-[#dddddd] to-white"></div>

          <div className="mt-3">
            <h2>
              {" "}
              <span className=" text-green-500 font-medium">+5%</span> than
              yesterday
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
