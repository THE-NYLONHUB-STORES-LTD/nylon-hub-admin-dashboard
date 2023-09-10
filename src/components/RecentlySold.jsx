import React from "react";
import { FaHamburger } from "react-icons/fa";

const RecentlySold = () => {
  // Sample data for recently sold products
  const recentlySoldData = [
    {
      product: {
        name: "Product 1",
        image: "https://via.placeholder.com/50", // Replace with your image URL
      },
      buyer: "Buyer A",
      price: "₦20,000",
    },
    {
      product: {
        name: "Product 2",
        image: "https://via.placeholder.com/50", // Replace with your image URL
      },
      buyer: "Buyer B",
      price: "₦30,000",
    },
    {
      product: {
        name: "Product 3",
        image: "https://via.placeholder.com/50",
      },
      buyer: "Buyer C",
      price: "₦25,000",
    },
  ];

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
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-[#344767] text-left pr-4 text-sm">Product</th>
              <th className="text-[#344767] text-left text-sm">Bought By</th>
              <th className="text-[#344767] text-left text-sm">Price (₦)</th>
              {/* Stock Left column removed */}
            </tr>
          </thead>
          <tbody>
            {recentlySoldData.map((item, index) => (
              <>
                <tr key={index}>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-8 h-8 rounded-full"
                      />
                      {item.product.name}
                    </div>
                  </td>
                  <td className="py-2">{item.buyer}</td>
                  <td className="py-2">{item.price}</td>
                  {/* Stock Left column removed */}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentlySold;
