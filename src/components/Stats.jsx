import React, { useState, useEffect } from "react";
import { FaCheckDouble } from "react-icons/fa6";
import { TbCurrencyNaira, TbBikeOff } from "react-icons/tb";
import { MdPending } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Stats = () => {
  const [adminStats, setAdminStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          icon={<TbCurrencyNaira size={24} color="white" />}
          title="Today's Money"
          value={adminStats.todays_money}
          change="+55%"
          changeType="increase"
        />
        <StatCard
          icon={<TbBikeOff size={24} color="white" />}
          title="Not Delivered"
          value={adminStats.total_not_delivered_carts}
          change="+3%"
          changeType="increase"
        />
        <StatCard
          icon={<MdPending size={24} color="white" />}
          title="Pending Orders"
          value={adminStats.total_pending_carts}
          change="-2%"
          changeType="decrease"
        />
        <StatCard
          icon={<FaCheckDouble size={24} color="white" />}
          title="Daily Completed Orders"
          value={adminStats.completed_order}
          change="+5%"
          changeType="increase"
        />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, change, changeType }) => {
  const changeColor =
    changeType === "increase" ? "text-green-500" : "text-red-600";
  return (
    <div className="relative bg-white shadow-lg shadow-slate-200 w-full h-[10rem] p-6 rounded-xl">
      <div className="absolute -top-4 left-3 bg-gradient-to-b from-[#3E3D45] to-[#0e1013] h-[55px] w-[55px] rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <div className="text-[#7b809a] text-right">
        <h1>{title}</h1>
        <h1 className="font-bold text-3xl text-[#344767]">{value}</h1>
      </div>

      <div className="h-[2px] w-full mt-5 bg-gradient-to-r from-[#ffffff] via-[#dddddd] to-white"></div>

      <div className="mt-3">
        <h2>
          <span className={`font-medium ${changeColor}`}>{change}</span> than
          last week
        </h2>
      </div>
    </div>
  );
};

export default Stats;
