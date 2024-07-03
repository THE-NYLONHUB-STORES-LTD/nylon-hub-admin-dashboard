import React from "react";
import { FaTrash } from "react-icons/fa";

const Cart = ({
  cart,
  formatter,
  handleRemoveFromCart,
  handleClearCart,
  handleCheckout,
}) => {
  const totalPrice = cart.reduce((sum, item) => sum + item.totalCost, 0);

  return (
    <div className="flex flex-col w-full md:w-1/2 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        cart.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-center p-2 border-b"
          >
            <img
              src={item.product_image_url[0]}
              alt={item.product_name}
              className="w-16 h-16 object-cover rounded-md mb-2 md:mb-0"
            />
            <div className="flex-1 ml-4 text-center md:text-left">
              <h3 className="text-lg font-bold">{item.product_name}</h3>
              <p>
                {item.quantity} x {formatter.format(item.totalCost)}
              </p>
              <p>Color: {item.selectedColor}</p>
              <p>Size: {item.selectedSize}</p>
              <div className="flex items-center gap-x-2 justify-center md:justify-start mt-2 md:mt-0">
                <button
                  className="bg-[#ef6426] text-white p-2 rounded-full"
                  onClick={() => handleRemoveFromCart(item._id)}
                >
                  <FaTrash size={15} />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      {cart.length > 0 && (
        <>
          <button
            onClick={handleClearCart}
            className="bg-[#ef6426] text-white p-2 rounded w-full mt-4"
          >
            Clear Cart
          </button>
          <p className="text-lg font-bold mt-4">
            Total: {formatter.format(totalPrice)}
          </p>
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white p-2 rounded w-full mt-4"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
