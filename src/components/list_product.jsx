import React, { useState, useEffect } from "react";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(
        "https://pbwkbq0l-4000.uks1.devtunnels.ms/nylonhub/v1/products/getallproducts",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const ProductCard = ({ product }) => {
    const [showMore, setShowMore] = useState({});

    const handleShowMore = (colorName) => {
      setShowMore((prevState) => ({
        ...prevState,
        [colorName]: !prevState[colorName],
      }));
    };

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {product.product_name}
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            {product.product_description}
          </p>
          <img
            src={product.product_image_url?.[0]}
            alt="Product Image"
            className="mt-4 w-full h-48 object-cover rounded-md"
          />
          <p className="text-lg text-gray-800 mt-4">
            ₦{product.price_range?.smallest_price} - ₦
            {product.price_range?.highest_price}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {product.product_alternative_use}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Category ID: {product.product_category_id}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Total in Stock: {product.total_product_in_stock}
          </p>

          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-900">
              Product Properties:
            </h3>
            {product.product_properties?.map((property, index) => (
              <div key={index} className="mt-2">
                <p className="text-sm text-gray-600 flex items-center">
                  <strong className="text-blue-500">Color:</strong>{" "}
                  <span
                    className="inline-block px-2 py-1 rounded-lg text-white ml-2"
                    style={{
                      backgroundColor: property.product_color.color_code,
                    }}
                  >
                    {property.product_color.name} (
                    {property.product_dimension.length})
                  </span>
                </p>
                <ul className="mt-2 space-y-2">
                  {property.product_dimension
                    ?.slice(
                      0,
                      showMore[property.product_color.name]
                        ? property.product_dimension.length
                        : 2
                    )
                    .map((dimension, idx) => (
                      <li
                        key={idx}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <strong className="text-gray-700">Size:</strong>
                          <span className="text-gray-600">
                            {dimension.size}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <strong className="text-gray-700">Price:</strong>
                          <span className="text-gray-600">
                            ₦{dimension.price}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <strong className="text-gray-700">In Stock:</strong>
                          <span className="text-gray-600">
                            {dimension.product_in_stock}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <strong className="text-gray-700">Capacity:</strong>
                          <span className="text-gray-600">
                            {dimension.product_capacity}
                          </span>
                        </div>
                      </li>
                    ))}
                </ul>
                {property.product_dimension.length > 2 && (
                  <button
                    onClick={() => handleShowMore(property.product_color.name)}
                    className="text-blue-600 mt-2 focus:outline-none"
                  >
                    {showMore[property.product_color.name]
                      ? "Show Less"
                      : "Show More"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="py-28 px-4 sm:px-24 bg-[#f0f2f5] min-h-screen">
      {isLoading ? (
        <p className="text-center text-xl text-gray-700">Loading...</p>
      ) : (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">
            List of Products
          </h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of{" "}
              {Math.ceil(products.length / productsPerPage)}
            </span>
            <button
              onClick={nextPage}
              disabled={
                currentPage === Math.ceil(products.length / productsPerPage)
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProduct;
