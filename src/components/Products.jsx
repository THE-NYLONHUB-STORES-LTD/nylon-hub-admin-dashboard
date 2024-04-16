import React, { useState, useEffect } from "react";

const Products = () => {
  // State to store the fetched products
  const [products, setProducts] = useState([]);
  // State to track loading state
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch products asynchronously
  const fetchProducts = async () => {
    try {
      // Retrieve JWT token from local storage
      const token = localStorage.getItem("jwt");

      // Fetch products with JWT token in headers
      const response = await fetch(
        "https://3gl1qmkg-4000.uks1.devtunnels.ms/nylonhub/v1/products/getallproducts",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      // Parse response JSON
      const data = await response.json();

      // Set the fetched products in state
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      // Set loading state to false when fetching is done
      setIsLoading(false);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="py-28 px-4 sm:px-24 bg-[#f0f2f5]">
        <h2 className="text-[#344767] font-medium text-xl sm:text-2xl">
          Products
        </h2>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Show loading message if isLoading is true */}
        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Render products */}
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-medium text-gray-900">
                    {product.product_name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Description: {product.product_description}
                  </p>
                  <img
                    src={product.product_image_url[0]}
                    alt="Product Image"
                    className="mt-4 rounded-md"
                  />
                  <p className="text-sm text-gray-600 mt-4">
                    Price Range: ₦{product.price_range.smallest_price} - ₦
                    {product.price_range.highest_price}
                  </p>
                  <hr className="my-4 border-gray-300" />
                  <p className="text-sm text-gray-600">
                    Alternative Use: {product.product_alternative_use}
                  </p>
                  <hr className="my-4 border-gray-300" />
                  <p className="text-sm text-gray-600">
                    Category ID: {product.product_category_id}
                  </p>
                  <hr className="my-4 border-gray-300" />
                  <p className="text-sm text-gray-600">
                    Total Products in Stock: {product.total_product_in_stock}
                  </p>
                  <hr className="my-4 border-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mt-6">
                    Product Properties:
                  </h3>
                  <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    {/* Render product properties */}
                    {product.product_properties.map((property) =>
                      property.product_dimension.map((dimension) => (
                        <li
                          key={dimension._id}
                          className="text-sm text-gray-600"
                        >
                          <strong className="font-medium">Color:</strong>{" "}
                          {property.product_color.name}
                          <br />
                          <strong className="font-medium">Size:</strong>{" "}
                          {dimension.size}
                          <br />
                          <strong className="font-medium">Price:</strong>{" "}
                          {dimension.price}
                          <br />
                          <strong className="font-medium">
                            In Stock:
                          </strong>{" "}
                          {dimension.product_in_stock}
                          <br />
                          <strong className="font-medium">
                            Capacity:
                          </strong>{" "}
                          {dimension.product_capacity}
                          <hr className="my-4 border-gray-300" />
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
