import React from "react";

const CustomerDetails = ({
  customerDetails,
  handleInputChange,
  handleReset,
}) => {
  return (
    <div className="flex flex-col w-full md:w-1/2 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Customer Details</h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={customerDetails.name}
        onChange={handleInputChange}
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={customerDetails.email}
        onChange={handleInputChange}
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="text"
        name="mobile"
        placeholder="Mobile Number"
        value={customerDetails.mobile}
        onChange={handleInputChange}
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={customerDetails.address}
        onChange={handleInputChange}
        className="mb-2 p-2 border rounded w-full"
      />
      <select
        name="paymentMethod"
        value={customerDetails.paymentMethod}
        onChange={handleInputChange}
        className="mb-2 p-2 border rounded w-full"
      >
        <option value="cash">Cash</option>
        <option value="transfer">Transfer</option>
      </select>
      <label className="mb-2 pl-2">Order ID</label>
      <input
        type="text"
        name="orderId"
        placeholder="Order ID"
        value={customerDetails.orderId}
        readOnly
        className="mb-2 p-2 border rounded w-full"
      />
      <button
        onClick={handleReset}
        className="bg-[#ef6426] text-white p-2 rounded w-full"
      >
        Reset
      </button>
    </div>
  );
};

export default CustomerDetails;
