import React, { useState } from "react";
import Property from "./Property.jsx";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    product_description: "",
    product_capacity: "",
    price_range: {
      smallest_price: 0,
      highest_price: 0,
    },
    product_alternative_use: "",
    product_category_id: "",
    product_properties: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      price_range: {
        ...formData.price_range,
        [name]: parseInt(value),
      },
    });
  };

  const handlePropertyChange = (index, property) => {
    const updatedProperties = [...formData.product_properties];
    updatedProperties[index] = property;
    setFormData({ ...formData, product_properties: updatedProperties });
  };

  const addProperty = () => {
    setFormData({
      ...formData,
      product_properties: [
        ...formData.product_properties,
        { product_color: { name: "", color_code: "#000000" }, product_dimension: [] },
      ],
    });
  };

  const submitForm = () => {
    console.log(formData); // Log form data object

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

  return (
    <div className="py-20 sm:py-28 px-4 sm:px-24 bg-gray-200">
      <label htmlFor="product_name" className="block mb-2">
        Product Name:
      </label>
      <input
        type="text"
        id="product_name"
        name="product_name"
        value={formData.product_name}
        onChange={handleInputChange}
        className="border rounded-md px-3 py-2 mb-4 w-full"
      />

      <label htmlFor="product_description" className="block mb-2">
        Product Description:
      </label>
      <textarea
        id="product_description"
        name="product_description"
        rows="4"
        cols="50"
        value={formData.product_description}
        onChange={handleInputChange}
        className="border rounded-md px-3 py-2 mb-4 w-full"
      ></textarea>

      <label htmlFor="product_capacity" className="block mb-2">
        Product Capacity:
      </label>
      <input
        type="text"
        id="product_capacity"
        name="product_capacity"
        value={formData.product_capacity}
        onChange={handleInputChange}
        className="border rounded-md px-3 py-2 mb-4 w-full"
      />

      <label htmlFor="smallest_price" className="block mb-2">
        Smallest Price:
      </label>
      <input
        type="number"
        id="smallest_price"
        name="smallest_price"
        value={formData.price_range.smallest_price}
        onChange={handlePriceRangeChange}
        className="border rounded-md px-3 py-2 mb-4 w-full"
      />

      <label htmlFor="highest_price" className="block mb-2">
        Highest Price:
      </label>
      <input
        type="number"
        id="highest_price"
        name="highest_price"
        value={formData.price_range.highest_price}
        onChange={handlePriceRangeChange}
        className="border rounded-md px-3 py-2 mb-4 w-full"
      />

      <label htmlFor="product_alternative_use" className="block mb-2">
        Product Alternative Use:
      </label>
      <input
        type="text"
        id="product_alternative_use"
        name="product_alternative_use"
        value={formData.product_alternative_use}
        onChange={handleInputChange}
        className="border rounded-md px-3 py-2 mb-4 w-full"
      />

      <label htmlFor="product_category_id" className="block mb-2">
        Product Category ID:
      </label>
      <input
        type="text"
        id="product_category_id"
        name="product_category_id"
        value={formData.product_category_id}
        onChange={handleInputChange}
        className="border rounded-md px-3 py-2 mb-4 w-full"
      />

      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Product Properties:
      </h3>
      {formData.product_properties.map((property, index) => (
        <Property
          key={index}
          index={index}
          property={property}
          onPropertyChange={handlePropertyChange}
        />
      ))}
      <button
        type="button"
        onClick={addProperty}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
      >
        Add Property
      </button>

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
