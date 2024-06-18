import React, { useState, useEffect } from "react"; // Add import for useEffect
import { FaCheckDouble } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import { MdPending } from "react-icons/md";
import { TbBikeOff } from "react-icons/tb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Stats = () => {
  const [adminStats, setAdminStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => { 
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          toast.error("JWT token not available");
          return;
        }

        const response = await fetch(
          "https://pbwkbq0l-4000.uks1.devtunnels.ms/nylonhub/v1/getadminstats",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          const errorMessage = await response.text();
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return;
        }

        const data = await response.json();
        setAdminStats(data);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching admin stats");
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or error
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>; // Render loading indicator
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 ss:grid-cols-2 gap-8 mt-10">
        <div className="relative bg-white shadow-lg shadow-slate-200 w-full h-[10rem] p-6 rounded-xl">
          <div className="absolute -top-4 left-3 bg-gradient-to-b from-[#3E3D45] to-[#0e1013] h-[55px] w-[55px] rounded-xl flex items-center justify-center">
            <TbCurrencyNaira size={24} color="white" />
          </div>
          <div className="text-[#7b809a] text-right">
            <h1>Today's Money</h1>
            <h1 className="font-bold text-3xl text-[#344767]">
              {adminStats.todays_money}
            </h1>
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
            <TbBikeOff size={24} color="white" />
          </div>
          <div className="text-[#7b809a] text-right">
            <h1>Not Delivered</h1>
            <h1 className="font-bold text-3xl text-[#344767]">{adminStats.total_not_delivered_carts}</h1>
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
          <div className="absolute -top-4 left-3 bg-gradient-to-b from-[#64aaff] to-[#1d71ca] h-[55px] w-[55px] rounded-xl flex items-center justify-center">
            <MdPending size={24} color="white" />
          </div>
          <div className="text-[#7b809a] text-right">
            <h1>Pending Orders</h1>
            <h1 className="font-bold text-3xl text-[#344767]">
              {adminStats.total_pending_carts}
            </h1>
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
          <div className="absolute -top-4 left-3 bg-gradient-to-b from-[#4bb57e] to-[#0b8d4a] h-[55px] w-[55px] rounded-xl flex items-center justify-center">
            <FaCheckDouble size={24} color="white" />
          </div>
          <div className="text-[#7b809a] text-right">
            <h1>Daily completed Order</h1>
            <h1 className="font-bold text-3xl text-[#344767]">
              {adminStats.completed_order}
            </h1>
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
