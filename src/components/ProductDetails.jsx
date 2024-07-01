import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductDetails = ({
  selectedProduct,
  itemDetails,
  dimension,
  selectedColorId,
  selectedId,
  handleColorSelect,
  handleSelect,
  decreaseQuantity,
  increaseQuantity,
  handleQuantityChange,
  quantity,
  totalCost,
  formatter,
  handleAddToCart,
  handleUpdateCart,
  selectedColor,
  setSelectedColor,
  cart,
  setSelectedId,
  retrieveDetails,
  setQuantity,
}) => {
  const isOutOfStock =
    selectedProduct.total_product_in_stock < 5 ||
    (itemDetails?.product_in_stock <= 2 &&
      selectedProduct.total_product_in_stock > 5);

  const handleSelectSize = (id) => {
    setSelectedId(id);
    retrieveDetails(id);
    setQuantity(0);
    toast.info("Please select the quantity for this size.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const isUpdateButtonDisabled = !cart.some(
    (item) =>
      item._id === selectedProduct._id &&
      item.selectedColor === selectedColor &&
      item.selectedSize === itemDetails.size
  );

  return (
    <div className="flex flex-col w-full bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-4">
        {selectedProduct.product_name}
      </h2>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={7000}
        emulateTouch={true}
        swipeable={true}
        showArrows={true}
        showStatus={false}
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          const defStyle = {
            marginLeft: 20,
            color: "#000000",
            cursor: "pointer",
            fontSize: "20px",
          };
          const style = isSelected
            ? { ...defStyle, color: "#F28705" }
            : { ...defStyle };
          return (
            <span
              style={style}
              onClick={onClickHandler}
              onKeyDown={onClickHandler}
              value={index}
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`${label} ${index + 1}`}
            >
              {"•"}
            </span>
          );
        }}
        className="productCarousel max-w-[800px] w-full rounded-lg shadow-md"
      >
        {selectedProduct.product_image_url &&
          selectedProduct.product_image_url.map((x, index) => (
            <div key={index} className="sm:h-[500px] h-[350px] object-cover">
              <img
                className="w-full h-full object-cover rounded-md"
                src={x}
                alt=""
              />
            </div>
          ))}
      </Carousel>
      <p className="mt-4 text-gray-600">
        {selectedProduct.product_description}
      </p>
      <p className="mt-2 text-lg text-blue-600">
        Price: {formatter.format(selectedProduct.price_range.smallest_price)} -{" "}
        {formatter.format(selectedProduct.price_range.highest_price)}
      </p>
      {itemDetails?.price && (
        <p className="mt-2 text-lg text-green-600">
          Selected Size Price: {formatter.format(itemDetails.price)}
        </p>
      )}
      <p className={`mt-2 ${isOutOfStock ? "text-red-500" : "text-green-500"}`}>
        {isOutOfStock ? "Out of stock" : "In Stock"}
      </p>
      <div className="mt-4">
        <p className="text-gray-800 font-semibold">Colors</p>
        <div className="flex flex-row flex-wrap mt-2">
          {selectedProduct.product_properties &&
            selectedProduct.product_properties.map((x) => (
              <div
                key={x._id}
                className={`rounded-md items-center flex justify-center py-3 cursor-pointer transition-transform transform hover:scale-105 ${
                  selectedColorId === x._id ? "border-2 border-black" : "border"
                }`}
                onClick={() => {
                  handleColorSelect(x._id);
                  setSelectedColor(x.product_color.name);
                }}
              >
                <p className="w-20 text-center">{x.product_color.name}</p>
              </div>
            ))}
        </div>

        <div className="mt-4">
          {dimension.length > 0 && (
            <div className="flex flex-col">
              <hr className="border-gray-300 mt-4" />
              <p className="mt-2 text-gray-800 font-semibold">Sizes</p>
              <div className="flex flex-row flex-wrap mt-2 gap-2 justify-center items-center">
                {dimension.map((x) => (
                  <div
                    key={x._id}
                    className={`rounded-md items-center flex justify-center py-3 cursor-pointer transition-transform transform hover:scale-105 ${
                      selectedId === x._id ? "border-2 border-black" : "border"
                    }`}
                    onClick={() => handleSelectSize(x._id)}
                  >
                    <p className="w-20 text-center my-2">{x.size}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <hr className="border-gray-300 mt-4" />
      <h2 className="uppercase text-sm text-gray-800 my-2">Quantity</h2>
      <div className="flex gap-x-4 items-center">
        <div className="items-center gap-x-3 flex">
          <button
            className="disabled:text-gray-300 bg-gray-200 h-8 w-8 flex items-center justify-center rounded-full"
            onClick={decreaseQuantity}
            disabled={quantity === 1}
          >
            <FaMinus size={15} />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            className="flex items-center outline-none p-2 justify-center text-center font-bold text-lg rounded-full bg-gray-200 h-10 w-16"
          />
          <button
            onClick={increaseQuantity}
            className="bg-gray-200 h-8 w-8 flex items-center justify-center rounded-full"
          >
            <FaPlus color="#667085" size={15} />
          </button>
        </div>

        <p className="text-sm text-orange-400 font-extrabold">
          {itemDetails?.product_in_stock}{" "}
          <span className="text-black">left in stock</span>
        </p>
      </div>
      <div className="flex items-center gap-x-3 my-4">
        <button
          className={`bg-[#ef6426] w-32 text-sm text-white px-5 py-3 rounded-full ${
            !selectedColor && selectedProduct.product_properties.length > 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          } hover:bg-nylon-hb-orange`}
          disabled={
            !selectedColor && selectedProduct.product_properties.length > 0
          }
          onClick={() => {
            if (
              selectedColor ||
              selectedProduct.product_properties.length === 0
            ) {
              handleAddToCart();
            } else {
              toast.warn("Please select a color before proceeding!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }
          }}
        >
          Add to cart
        </button>
        <button
          className={`bg-gray-500 w-32 text-sm text-white px-5 py-3 rounded-full ${
            isUpdateButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
          } hover:bg-gray-700`}
          disabled={isUpdateButtonDisabled}
          onClick={handleUpdateCart}
        >
          Update Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
