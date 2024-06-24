import React, { useState, useEffect } from "react";
import {
  FaHamburger,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";

const RecentlySold = () => {
  const [recentlySoldData, setRecentlySoldData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await fetch(
          "https://pbwkbq0l-4000.uks1.devtunnels.ms/nylonhub/v1/products/getcarts",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setRecentlySoldData(data);
      } catch (error) {
        console.error("Error fetching recently sold data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaHourglassHalf className="text-yellow-500" />;
      case "completed":
        return <FaCheckCircle className="text-green-500" />;
      case "failed":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  const totalPages = Math.ceil(recentlySoldData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = recentlySoldData.slice(startIndex, endIndex);

  return (
    <div className="bg-white shadow-lg shadow-slate-200 w-full p-4 mt-8 rounded-xl">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-[#344767] font-medium text-md sm:text-lg">
            Recently Sold
          </h2>
          <FaHamburger />
        </div>
        <hr className="mt-4" />
      </div>

      <div className="my-4">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-[#344767] text-left pr-4 text-sm">
                    Order ID
                  </th>
                  <th className="text-[#344767] text-left text-sm">
                    Bought By
                  </th>
                  <th className="text-[#344767] text-left text-sm">
                    Price (₦)
                  </th>
                  <th className="text-[#344767] text-left text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <LuShoppingBag />
                        {item.order_id}
                      </div>
                    </td>
                    <td className="py-2">{item.name_of_buyer}</td>
                    <td className="py-2">{item.total_price}</td>
                    <td className="py-2">
                      <div
                        className="rounded-lg flex items-center justify-center"
                        style={{
                          display: "inline-block",
                          width: "fit-content",
                          padding: "0.5rem 1rem",
                        }}
                      >
                        {getStatusIcon(item.order_status)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlySold;
