import React, { useState, useEffect } from "react";
import Property from "./Property.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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
    product_specification: {
      shape: "",
      model_number: "",
      feature: "",
      form: "",
      thickness: "",
      applicable_space: "",
      use: "",
      material: "",
      pattern: "",
      type: "",
      fresh_wrap: "",
      reusable_food_storage: "",
      thickened: "",
    },
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://pbwkbq0l-4000.uks1.devtunnels.ms/nylonhub/v1/get_category"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories. Please try again.");
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.product_specification) {
      setFormData({
        ...formData,
        product_specification: {
          ...formData.product_specification,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
        {
          product_color: { name: "", color_code: "#000000" },
          product_dimension: [],
        },
      ],
    });
  };

  const handleFileChange = (e) => {
    setUploadedImage(e.target.files[0]);
  };

  const validateForm = () => {
    if (!formData.product_name) return "Product name is required.";
    if (!formData.product_description)
      return "Product description is required.";
    if (!formData.product_capacity) return "Product capacity is required.";
    if (formData.price_range.smallest_price <= 0)
      return "Smallest price must be greater than 0.";
    if (formData.price_range.highest_price <= 0)
      return "Highest price must be greater than 0.";
    if (!formData.product_alternative_use)
      return "Product alternative use is required.";
    if (!formData.product_category_id) return "Product category is required.";
    if (!uploadedImage) return "Product image is required.";
    const spec = formData.product_specification;
    if (!spec.shape) return "Product specification shape is required.";
    if (!spec.model_number)
      return "Product specification model number is required.";
    if (!spec.feature) return "Product specification feature is required.";
    if (!spec.form) return "Product specification form is required.";
    if (!spec.thickness) return "Product specification thickness is required.";
    if (!spec.applicable_space)
      return "Product specification applicable space is required.";
    if (!spec.use) return "Product specification use is required.";
    if (!spec.material) return "Product specification material is required.";
    if (!spec.pattern) return "Product specification pattern is required.";
    if (!spec.type) return "Product specification type is required.";
    if (!spec.fresh_wrap)
      return "Product specification fresh wrap is required.";
    if (!spec.reusable_food_storage)
      return "Product specification reusable food storage is required.";
    if (!spec.thickened) return "Product specification thickened is required.";
    return null;
  };

  const submitForm = async () => {
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const token = localStorage.getItem("jwt");
    const url =
      "https://pbwkbq0l-4000.uks1.devtunnels.ms/nylonhub/v1/add_products";

    const form = new FormData();
    form.append("uploaded_product_image", uploadedImage);
    form.append("product_data", JSON.stringify(formData));

    console.log("Form data being sent:", formData);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error || "Network response was not ok");
      }

      const data = await response.json();
      console.log("Response received:", data);
      toast.success("Product created successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Product</h2>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="product_name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={formData.product_name}
            onChange={handleInputChange}
            className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="product_description"
            className="block text-sm font-medium text-gray-700"
          >
            Product Description
          </label>
          <textarea
            id="product_description"
            name="product_description"
            rows="4"
            value={formData.product_description}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="product_capacity"
            className="block text-sm font-medium text-gray-700"
          >
            Product Capacity
          </label>
          <input
            type="text"
            id="product_capacity"
            name="product_capacity"
            value={formData.product_capacity}
            onChange={handleInputChange}
            className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="smallest_price"
              className="block text-sm font-medium text-gray-700"
            >
              Smallest Price
            </label>
            <input
              type="number"
              id="smallest_price"
              name="smallest_price"
              value={formData.price_range.smallest_price}
              onChange={handlePriceRangeChange}
              className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="highest_price"
              className="block text-sm font-medium text-gray-700"
            >
              Highest Price
            </label>
            <input
              type="number"
              id="highest_price"
              name="highest_price"
              value={formData.price_range.highest_price}
              onChange={handlePriceRangeChange}
              className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="product_alternative_use"
            className="block text-sm font-medium text-gray-700"
          >
            Product Alternative Use
          </label>
          <input
            type="text"
            id="product_alternative_use"
            name="product_alternative_use"
            value={formData.product_alternative_use}
            onChange={handleInputChange}
            className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="product_category_id"
            className="block text-sm font-medium text-gray-700"
          >
            Product Category
          </label>
          <select
            id="product_category_id"
            name="product_category_id"
            value={formData.product_category_id}
            onChange={handleInputChange}
            className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name_of_category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="uploaded_product_image"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Product Image
          </label>
          <input
            type="file"
            id="uploaded_product_image"
            name="uploaded_product_image"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Product Specifications
        </h3>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="shape"
              className="block text-sm font-medium text-gray-700"
            >
              Shape
            </label>
            <input
              type="text"
              id="shape"
              name="shape"
              value={formData.product_specification.shape}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="model_number"
              className="block text-sm font-medium text-gray-700"
            >
              Model Number
            </label>
            <input
              type="text"
              id="model_number"
              name="model_number"
              value={formData.product_specification.model_number}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="feature"
              className="block text-sm font-medium text-gray-700"
            >
              Feature
            </label>
            <input
              type="text"
              id="feature"
              name="feature"
              value={formData.product_specification.feature}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="form"
              className="block text-sm font-medium text-gray-700"
            >
              Form
            </label>
            <input
              type="text"
              id="form"
              name="form"
              value={formData.product_specification.form}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="thickness"
              className="block text-sm font-medium text-gray-700"
            >
              Thickness
            </label>
            <input
              type="text"
              id="thickness"
              name="thickness"
              value={formData.product_specification.thickness}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="applicable_space"
              className="block text-sm font-medium text-gray-700"
            >
              Applicable Space
            </label>
            <input
              type="text"
              id="applicable_space"
              name="applicable_space"
              value={formData.product_specification.applicable_space}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="use"
              className="block text-sm font-medium text-gray-700"
            >
              Use
            </label>
            <input
              type="text"
              id="use"
              name="use"
              value={formData.product_specification.use}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="material"
              className="block text-sm font-medium text-gray-700"
            >
              Material
            </label>
            <input
              type="text"
              id="material"
              name="material"
              value={formData.product_specification.material}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="pattern"
              className="block text-sm font-medium text-gray-700"
            >
              Pattern
            </label>
            <input
              type="text"
              id="pattern"
              name="pattern"
              value={formData.product_specification.pattern}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.product_specification.type}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="fresh_wrap"
              className="block text-sm font-medium text-gray-700"
            >
              Fresh Wrap
            </label>
            <input
              type="text"
              id="fresh_wrap"
              name="fresh_wrap"
              value={formData.product_specification.fresh_wrap}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="reusable_food_storage"
              className="block text-sm font-medium text-gray-700"
            >
              Reusable Food Storage
            </label>
            <input
              type="text"
              id="reusable_food_storage"
              name="reusable_food_storage"
              value={formData.product_specification.reusable_food_storage}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="thickened"
              className="block text-sm font-medium text-gray-700"
            >
              Thickened
            </label>
            <input
              type="text"
              id="thickened"
              name="thickened"
              value={formData.product_specification.thickened}
              onChange={handleInputChange}
              className="mt-1 block w-full h-12 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Product Properties
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
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Property
          </button>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={submitForm}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
