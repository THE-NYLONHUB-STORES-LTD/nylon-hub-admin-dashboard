import React from 'react';

const ProductSelection = ({ searchTerm, setSearchTerm, filteredProducts, handleProductSelect }) => {
  return (
    <div className="flex flex-col w-full md:w-1/2 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Select Product</h2>
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-2 p-2 border rounded w-full"
      />
      <select
        className="mb-2 p-2 border rounded w-full"
        onChange={(e) => handleProductSelect(e.target.value)}
      >
        <option value="">Select a product</option>
        {Array.isArray(filteredProducts) ? (
          filteredProducts.map((product) => (
            <option key={product._id} value={product._id}>
              {product.product_name}
            </option>
          ))
        ) : (
          <option>No products available</option>
        )}
      </select>
    </div>
  );
};

export default ProductSelection;
