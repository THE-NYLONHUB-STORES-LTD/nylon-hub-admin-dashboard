import React from "react";

const Dimension = ({
  propertyIndex,
  dimensionIndex,
  dimension,
  onDimensionChange,
}) => {
  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    const updatedDimension = { ...dimension, [name]: value };
    onDimensionChange(dimensionIndex, updatedDimension);
  };

  return (
    <div>
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
        onChange={handleDimensionChange}
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
        onChange={handleDimensionChange}
        className="border rounded-md px-3 py-2 mb-2 w-full"
      />
      <label
        htmlFor={`product_in_stock${propertyIndex}_${dimensionIndex}`}
        className="block mb-2"
      >
        Stock:
      </label>
      <input
        type="number"
        id={`product_in_stock${propertyIndex}_${dimensionIndex}`}
        name="product_in_stock"
        value={dimension.product_in_stock}
        onChange={handleDimensionChange}
        className="border rounded-md px-3 py-2 mb-2 w-full"
      />
      <label
        htmlFor={`product_capacity${propertyIndex}_${dimensionIndex}`}
        className="block mb-2"
      >
        Capacity:
      </label>
      <input
        type="text"
        id={`product_capacity${propertyIndex}_${dimensionIndex}`}
        name="product_capacity"
        value={dimension.product_capacity}
        onChange={handleDimensionChange}
        className="border rounded-md px-3 py-2 mb-2 w-full"
      />
    </div>
  );
};

export default Dimension;
