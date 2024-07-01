import React from "react";
import Dimension from "./Dimension.jsx";

const Property = ({ index, property, onPropertyChange }) => {
  const handleColorChange = (e) => {
    const { name, value } = e.target;
    const updatedProperty = {
      ...property,
      product_color: { ...property.product_color, name: value },
    };
    onPropertyChange(index, updatedProperty);
  };

  const handleDimensionChange = (dimensionIndex, dimension) => {
    const updatedDimensions = [...property.product_dimension];
    updatedDimensions[dimensionIndex] = dimension;
    const updatedProperty = {
      ...property,
      product_dimension: updatedDimensions,
    };
    onPropertyChange(index, updatedProperty);
  };

  const addDimension = () => {
    const updatedDimensions = [
      ...property.product_dimension,
      { size: "", price: 0, product_in_stock: 0, product_capacity: "" },
    ];
    const updatedProperty = {
      ...property,
      product_dimension: updatedDimensions,
    };
    onPropertyChange(index, updatedProperty);
  };

  return (
    <div className="mb-4">
      <label htmlFor={`color${index}`} className="block mb-2">
        Color:
      </label>
      <input
        type="text"
        id={`color${index}`}
        name="color"
        value={property.product_color.name}
        onChange={handleColorChange}
        className="border rounded-md px-3 py-2 mb-2 w-full"
      />
      <div id={`dimensions${index}`} className="mb-2">
        {property.product_dimension.map((dimension, dimensionIndex) => (
          <Dimension
            key={dimensionIndex}
            propertyIndex={index}
            dimensionIndex={dimensionIndex}
            dimension={dimension}
            onDimensionChange={handleDimensionChange}
          />
        ))}
        <button
          type="button"
          onClick={addDimension}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        >
          Add Dimension
        </button>
      </div>
    </div>
  );
};

export default Property;
