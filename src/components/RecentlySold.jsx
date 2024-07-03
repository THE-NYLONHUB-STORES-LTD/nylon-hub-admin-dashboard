import React, { useState, useEffect } from "react";
import {
  FaHamburger,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecentlySold = () => {
  const [recentlySoldData, setRecentlySoldData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [statusFilter, searchQuery, searchField]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(
        "https://pbwkbq0l-4000.uks1.devtunnels.ms/nylonhub/v1/products/getcarts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRecentlySoldData(data);
        setFilteredData(data);
      } else {
        toast.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Error fetching recently sold data");
    }
    setIsLoading(false);
  };

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

    if (searchField === "name_of_buyer" || searchField === "total_price") {
      const filtered = recentlySoldData.filter((item) =>
        item[searchField].toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
      setCurrentPage(1);
      if (filtered.length === 0) {
        toast.info("No results found");
      }
    } else {
      toast.warn("Please select a valid search parameter");
    }
  };

  const handleShowAll = () => {
    setFilteredData(recentlySoldData);
    setSearchQuery("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    fetchData();
  };

  const filterData = () => {
    let filtered = recentlySoldData;

    if (statusFilter) {
      filtered = filtered.filter((item) => item.order_status === statusFilter);
    }

    if (searchQuery && searchField) {
      filtered = filtered.filter((item) =>
        item[searchField].toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

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
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
          <select
            className="border border-gray-300 p-2 rounded-lg text-gray-700 bg-white shadow-sm focus:ring focus:ring-blue-200 focus:outline-none w-full sm:w-auto"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          >
            <option value="">Choose Search Parameter</option>
            <option value="name_of_buyer">Bought By</option>
            <option value="total_price">Price</option>
          </select>
          {searchField && (
            <>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg text-gray-700 bg-white shadow-sm focus:ring focus:ring-blue-200 focus:outline-none w-full sm:w-auto"
                placeholder="Enter search query"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="bg-black text-[#ef6426] p-2 rounded-lg shadow-md hover:bg-gray-700 w-full sm:w-auto"
                onClick={handleSearch}
              >
                Search
              </button>
            </>
          )}
          <select
            className="border border-gray-300 p-2 rounded-lg text-gray-700 bg-white shadow-sm focus:ring focus:ring-blue-200 focus:outline-none w-full sm:w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Confirmed</option>
          </select>
          <button
            className="bg-[#ef6426] text-black p-2 rounded-lg shadow-md hover:bg-gray-600 w-full sm:w-auto"
            onClick={handleShowAll}
          >
            Show All
          </button>
          <button
            className="bg-green-500 text-white p-2 rounded-lg shadow-md hover:bg-green-700 w-full sm:w-auto"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left">Order ID</th>
                  <th className="py-2 px-4 text-left">Bought By</th>
                  <th className="py-2 px-4 text-left">Price (₦)</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">
                      <div className="flex items-center">
                        <LuShoppingBag className="mr-2" />
                        {item.order_id}
                      </div>
                    </td>
                    <td className="py-2 px-4">{item.name_of_buyer}</td>
                    <td className="py-2 px-4">{item.total_price}</td>
                    <td className="py-2 px-4">
                      <div className="rounded-lg flex items-center justify-center">
                        {getStatusIcon(item.order_status)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400"
                onClick={nextPage}
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
