import React, { useState, useEffect } from "react";
import {
  FaHamburger,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { BiCopy } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecentlySold = () => {
  const [recentlySoldData, setRecentlySoldData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("order_id");
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
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching recently sold data:", error);
        toast.error("Error fetching recently sold data");
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

  const handleSearch = () => {
    if (!searchQuery) {
      toast.error("Search query cannot be empty");
      return;
    }

    if (/[^a-zA-Z0-9\s]/.test(searchQuery)) {
      toast.error("Search query contains invalid characters");
      return;
    }

    const filtered = recentlySoldData.filter((item) =>
      item[searchField]
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page after search

    if (filtered.length === 0) {
      toast.info("No results found");
    }
  };

  const handleShowAll = () => {
    setFilteredData(recentlySoldData);
    setSearchQuery("");
    setCurrentPage(1); // Reset to the first page
  };

  const handleRefresh = async () => {
    setIsLoading(true);
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
      const filtered = data.filter((item) =>
        item[searchField]
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } catch (error) {
      console.error("Error fetching recently sold data:", error);
      toast.error("Error fetching recently sold data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = (orderId) => {
    navigator.clipboard.writeText(orderId);
    toast.success("Order ID copied to clipboard");
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="bg-white shadow-lg shadow-slate-200 w-full p-4 mt-8 rounded-xl">
      <ToastContainer />
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
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
          <select
            className="border border-gray-300 p-2 rounded-lg text-gray-700 bg-white shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          >
            <option value="order_id">Order ID</option>
            <option value="name_of_buyer">Bought By</option>
            <option value="total_price">Price</option>
            <option value="order_status">Status</option>
          </select>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-lg text-gray-700 bg-white shadow-sm focus:ring focus:ring-blue-200 focus:outline-none w-full sm:w-auto"
            placeholder={`Search by ${searchField.replace("_", " ")}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-black text-[#ef6426] p-2 rounded-lg shadow-md hover:bg-gray-700 transition duration-200 w-full sm:w-auto"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="bg-[#ef6426] text-black p-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-200 w-full sm:w-auto"
            onClick={handleShowAll}
          >
            Show All
          </button>
          <button
            className="bg-[#ef6426] text-white p-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200 w-full sm:w-auto"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
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
                        <span className="truncate">...</span>
                        <BiCopy
                          className="cursor-pointer text-gray-500 hover:text-gray-700"
                          onClick={() => handleCopyToClipboard(item.order_id)}
                        />
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

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition duration-200 w-full sm:w-auto"
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
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition duration-200 w-full sm:w-auto"
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
