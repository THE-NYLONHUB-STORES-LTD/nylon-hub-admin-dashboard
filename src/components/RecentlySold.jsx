import React, { useState, useEffect } from "react";
import { FaHamburger } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";

const RecentlySold = () => {
  const [recentlySoldData, setRecentlySoldData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await fetch(
          "https://3gl1qmkg-4000.uks1.devtunnels.ms/nylonhub/v1/products/getcarts",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json(); // Parse the response JSON
        setRecentlySoldData(data); // Set the fetched data
      } catch (error) {
        console.error("Error fetching recently sold data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white shadow-lg shadow-slate-200 w-full p-4 mt-8 rounded-xl">
      <div className=" ">
        <div className=" flex justify-between items-center ">
          <h2 className="text-[#344767] font-medium text-md sm:text-lg">
            Recently Sold
          </h2>
          <FaHamburger />
        </div>

        <hr className=" mt-4" />
      </div>

      <div className="my-4">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-[#344767] text-left pr-4 text-sm">
                  Order ID
                </th>
                <th className="text-[#344767] text-left text-sm">Bought By</th>
                <th className="text-[#344767] text-left text-sm">Price (₦)</th>
                <th className="text-[#344767] text-left text-sm">Status</th>
                {/* Stock Left column removed */}
              </tr>
            </thead>
            <tbody>
              {recentlySoldData.map((item, index) => (
                <tr key={index}>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <LuShoppingBag />
                      {item.order_id}
                    </div>
                  </td>
                  <td className="py-2">{item.name_of_buyer}</td>
                  <td className="py-2">{item.total_price}</td>
                  <td className="py-2">{item.order_status}</td>
                  {/* Stock Left column removed */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecentlySold;
