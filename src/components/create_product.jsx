import React, { useState } from "react";

const CreateProduct = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productCapacity: "",
    smallestPrice: 0,
    highestPrice: 0,
    productAlternativeUse: "",
    productCategoryId: "",
    productProperties: [],
  });

  // Function to handle changes in form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to submit the form
  const submitForm = () => {
    console.log(formData); // Log form data object

    // Send POST request...
    const url =
      "https://pbwkbq0l-4000.uks1.devtunnels.ms/nylonhub/v1/add_products";
    const token = localStorage.getItem("jwt");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response received:", data);
        // Handle response data as needed
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors
      });
  };

  // Function to add property fields based on the number input
  const updateProperties = (numProperties) => {
    const newProperties = Array.from({ length: numProperties }, (_, index) => ({
      color: "",
      dimensions: [{ size: "", price: 0, stock: 0, capacity: "" }],
    }));
    setFormData({ ...formData, productProperties: newProperties });
  };

  // Function to add a new dimension to a property
  const addDimension = (propertyIndex) => {
    const newProperties = [...formData.productProperties];
    newProperties[propertyIndex].dimensions.push({
      size: "",
      price: 0,
      stock: 0,
      capacity: "",
    });
    setFormData({ ...formData, productProperties: newProperties });
  };

  return (
    <div className="py-20 sm:py-28 px-4 sm:px-24 bg-gray-200">
      {/* Form inputs */}
      <label htmlFor="productName" className="block mb-2">
        Product Name:
      </label>
      <input
        type="text"
        id="productName"
        name="productName"
        value={formData.productName}
        onChange={handleInputChange}
        className="border rounded-md px-3 py-2 mb-4 w-full"
      />

      <label htmlFor="productDescription" className="block mb-2">
        Product Description:
      </label>
      <textarea
        id="productDescription"
        name="productDescription"
        rows="4"
        cols="50"
        value={formData.productDescription}
        onChange={handleInputChange}
        className="border rounded-md px-3 py-2 mb-4 w-full"
      ></textarea>

      <label htmlFor="productCapacity" className="block mb-2">
        Product Capacity:
      </label>
      <input
        type="text"
        id="productCapacity"
        name="productCapacity"
        value={formData.productCapacity}
        onChange={handleInputChange}
        className="border rounded-md px-3 py-2 mb-4 w-full"
      />

      <label htmlFor="smallestPrice" className="block mb-2">
        Smallest Price:
      </label>
      <input
        type="number"
        id="smallestPrice"
        name="smallestPrice"
        value={formData.smallestPrice}
        onChange={handleInputChange}
        className="border rounded-md px-3 py-2 mb-4 w-full"
      />

      <label htmlFor="highestPrice" className="block mb-2">
        Highest Price:
      </label>
      <input
        type="number"
        id="highestPrice"
        name="highestPrice"
        value={formData.highestPrice}
        onChange={handleInputChange}
        className="border rounded-md px-3 py-2 mb-4 w-full"
      />

      <label htmlFor="productAlternativeUse" className="block mb-2">
        Product Alternative Use:
      </label>
      <input
        type="text"
        id="productAlternativeUse"
        name="productAlternativeUse"
        value={formData.productAlternativeUse}
        onChange={handleInputChange}
        className="border rounded-md px-3 py-2 mb-4 w-full"
      />

      <label htmlFor="productCategoryId" className="block mb-2">
        Product Category ID:
      </label>
      <input
        type="text"
        id="productCategoryId"
        name="productCategoryId"
        value={formData.productCategoryId}
        onChange={handleInputChange}
        className="border rounded-md px-3 py-2 mb-4 w-full"
      />

      {/* Number of properties input */}
      <label htmlFor="numProperties" className="block mb-2">
        Number of Product Properties:
      </label>
      <input
        type="number"
        id="numProperties"
        name="numProperties"
        value={formData.productProperties.length}
        onChange={(e) => updateProperties(parseInt(e.target.value, 10))}
        className="border rounded-md px-3 py-2 mb-4 w-full"
      />
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Product Properties:
      </h3>
      {formData.productProperties.map((property, propertyIndex) => (
        <div key={propertyIndex} className="mb-4">
          <label htmlFor={`color${propertyIndex}`} className="block mb-2">
            Color:
          </label>
          <input
            type="text"
            id={`color${propertyIndex}`}
            name="color"
            value={property.color}
            onChange={(e) => {
              const newProperties = [...formData.productProperties];
              newProperties[propertyIndex].color = e.target.value;
              setFormData({ ...formData, productProperties: newProperties });
            }}
            className="border rounded-md px-3 py-2 mb-2 w-full"
          />
          <div id={`dimensions${propertyIndex}`} className="mb-2">
            {property.dimensions.map((dimension, dimensionIndex) => (
              <div key={dimensionIndex}>
                <label
                  htmlFor={`size${propertyIndex}_${dimensionIndex}`}
                  className="block mb-2"
                >
                  Size:
                </label>
                <input
                  type="text"
                  id={`size${propertyIndex}_${dimensionIndex}`}
                  name="size"
                  value={dimension.size}
                  onChange={(e) => {
                    const newProperties = [...formData.productProperties];
                    newProperties[propertyIndex].dimensions[
                      dimensionIndex
                    ].size = e.target.value;
                    setFormData({
                      ...formData,
                      productProperties: newProperties,
                    });
                  }}
                  className="border rounded-md px-3 py-2 mb-2 w-full"
                />
                <label
                  htmlFor={`price${propertyIndex}_${dimensionIndex}`}
                  className="block mb-2"
                >
                  Price:
                </label>
                <input
                  type="number"
                  id={`price${propertyIndex}_${dimensionIndex}`}
                  name="price"
                  value={dimension.price}
                  onChange={(e) => {
                    const newProperties = [...formData.productProperties];
                    newProperties[propertyIndex].dimensions[
                      dimensionIndex
                    ].price = e.target.value;
                    setFormData({
                      ...formData,
                      productProperties: newProperties,
                    });
                  }}
                  className="border rounded-md px-3 py-2 mb-2 w-full"
                />
                <label
                  htmlFor={`stock${propertyIndex}_${dimensionIndex}`}
                  className="block mb-2"
                >
                  Stock:
                </label>
                <input
                  type="number"
                  id={`stock${propertyIndex}_${dimensionIndex}`}
                  name="stock"
                  value={dimension.stock}
                  onChange={(e) => {
                    const newProperties = [...formData.productProperties];
                    newProperties[propertyIndex].dimensions[
                      dimensionIndex
                    ].stock = e.target.value;
                    setFormData({
                      ...formData,
                      productProperties: newProperties,
                    });
                  }}
                  className="border rounded-md px-3 py-2 mb-2 w-full"
                />
                <label
                  htmlFor={`capacity${propertyIndex}_${dimensionIndex}`}
                  className="block mb-2"
                >
                  Capacity:
                </label>
                <input
                  type="text"
                  id={`capacity${propertyIndex}_${dimensionIndex}`}
                  name="capacity"
                  value={dimension.capacity}
                  onChange={(e) => {
                    const newProperties = [...formData.productProperties];
                    newProperties[propertyIndex].dimensions[
                      dimensionIndex
                    ].capacity = e.target.value;
                    setFormData({
                      ...formData,
                      productProperties: newProperties,
                    });
                  }}
                  className="border rounded-md px-3 py-2 mb-2 w-full"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addDimension(propertyIndex)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            >
              Add Dimension
            </button>
          </div>
        </div>
      ))}
      {/* Submit button */}
      <button
        type="button"
        onClick={submitForm}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
      >
        Submit
      </button>
    </div>
  );
};

export default CreateProduct;
