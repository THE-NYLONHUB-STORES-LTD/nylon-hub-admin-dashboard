import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerDetails from "./CustomerDetails";
import ProductSelection from "./ProductSelection";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const generateOrderId = (customerName, businessName = "NYLONHUB") => {
  const customerInitials = customerName
    ? customerName.slice(0, 2).toUpperCase()
    : "BU";
  const businessInitials = businessName.slice(0, 2).toUpperCase();

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const currentDate = `${year}${month}${day}`;

  const orderId = `${customerInitials}${businessInitials}${currentDate}`;

  return orderId;
};

const InHouseApplication = () => {
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    paymentMethod: "cash",
    orderId: generateOrderId("", "NYLONHUB"),
    ref: {}, // Initialize an empty ref object
  });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [dimension, setDimension] = useState([]);
  const [itemDetails, setItemDetails] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
        const data = await response.json();
        if (data && data.data && Array.isArray(data.data)) {
          setProducts(data.data);
          setFilteredProducts(data.data);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  useEffect(() => {
    const totalCostPerItem = () => {
      if (itemDetails) {
        const newCost = itemDetails.price * quantity;
        setTotalCost(newCost);
      }
    };
    totalCostPerItem();
  }, [quantity, itemDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prevState) => ({
      ...prevState,
      [name]: value,
      orderId:
        name === "name"
          ? generateOrderId(value, "NYLONHUB")
          : prevState.orderId,
    }));
  };

  const handleReset = () => {
    setShowModal(true);
  };

  const confirmReset = () => {
    setCustomerDetails({
      name: "",
      email: "",
      mobile: "",
      address: "",
      paymentMethod: "cash",
      orderId: generateOrderId("", "NYLONHUB"),
    });
    setSearchTerm("");
    setSelectedProduct(null);
    setCart([]);
    setShowModal(false);
  };

  const cancelReset = () => {
    setShowModal(false);
  };

  const handleProductSelect = async (productId) => {
    try {
      const response = await axios.get(
        `https://pbwkbq0l-4000.uks1.devtunnels.ms/nylonhub/v1/products/${productId}`
      );
      setSelectedProduct(response.data.data);
      setQuantity(1);
      setSelectedColor(null);
      setSelectedId(null);
      setSelectedColorId(null);
      setDimension([]);
      setItemDetails({});
      setTotalCost(0);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleSelect = (id) => {
    setSelectedId(id);
    retrieveDetails(id);
  };

  const handleColorSelect = (id) => {
    setSelectedColorId(id);
    findDimension(id);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < itemDetails.product_in_stock) {
      setQuantity(quantity + 1);
    } else {
      toast.warn("Cannot exceed the available stock!", {
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
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value <= itemDetails.product_in_stock) {
      setQuantity(value);
    } else {
      toast.warn("Cannot exceed the available stock!", {
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
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    const itemInCart = cart.find(
      (item) =>
        item._id === selectedProduct._id &&
        item.selectedSize === itemDetails.size &&
        item.selectedColor === selectedColor
    );

    const formattedProperties = {
      color: selectedColor,
      size: itemDetails.size,
      capacity: itemDetails.product_capacity,
      price: itemDetails.price,
      quantity: quantity,
    };

    if (itemInCart) {
      toast.warn("Item is already in cart with selected size and color!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setCart([
        ...cart,
        {
          _id: selectedProduct._id,
          product_name: selectedProduct.product_name,
          totalCost,
          quantity,
          product_image_url: selectedProduct.product_image_url,
          product_description: selectedProduct.product_description,
          selectedColor,
          selectedSize: itemDetails.size,
          selected_properties: [[formattedProperties]], // Include the selected properties
        },
      ]);
      toast.success("Item added to cart!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleUpdateCart = () => {
    const updatedCart = cart.map((item) =>
      item._id === selectedProduct._id &&
      item.selectedColor === selectedColor &&
      item.selectedSize === itemDetails.size
        ? { ...item, quantity, totalCost }
        : item
    );
    setCart(updatedCart);
    toast.success("Cart updated!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const findDimension = (id) => {
    const selectedProperty = selectedProduct.product_properties.find(
      (x) => x._id === id
    );
    setDimension(selectedProperty?.product_dimension || []);
  };

  const retrieveDetails = (id) => {
    const selectedDimension = dimension.find((x) => x._id === id);
    setItemDetails(selectedDimension);
  };

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  const handleClearCart = () => {
    setCart([]);
    toast.success("Cart cleared!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleCartQuantityChange = (productId, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId
          ? { ...item, quantity: item.quantity + amount }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    toast.success("Item removed from cart!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const validateCustomerDetails = () => {
    const { name, email, mobile, address } = customerDetails;
    if (!name)
      toast.error("Name is required", {
        position: "top-right",
        autoClose: 2000,
      });
    if (!email)
      toast.error("Email is required", {
        position: "top-right",
        autoClose: 2000,
      });
    if (!mobile)
      toast.error("Mobile number is required", {
        position: "top-right",
        autoClose: 2000,
      });
    if (!address)
      toast.error("Address is required", {
        position: "top-right",
        autoClose: 2000,
      });
    return name && email && mobile && address;
  };

  const generateInvoice = async (checkoutData) => {
    const {
      name_of_buyer,
      email_of_buyer,
      phone_number_of_buyer,
      address_of_buyer,
      items,
      total_price,
      order_id,
      payment_type,
    } = checkoutData;

    const doc = new jsPDF();

    // Set document properties
    doc.setProperties({
      title: `Invoice_${order_id}`,
      subject: "Invoice",
      author: "THE NYLON HUB",
      keywords: "generated, javascript, web 2.0, ajax",
      creator: "TNH SALES TEAM",
    });

    // Add header
    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.text("INVOICE", 105, 20, null, null, "center");

    // Add company info
    doc.setFontSize(10);
    doc.text("THE NYLON HUB LTD", 20, 30);
    doc.text("29, OJUWOYE STREET", 20, 35);
    doc.text("MUSHIN, LAGOS STATE", 20, 40);
    doc.text("Phone: (555) 555-5555", 20, 45);
    doc.text("Email: info@company.com", 20, 50);

    // Add customer info
    doc.setFontSize(12);
    doc.text("Bill To:", 20, 60);
    doc.setFontSize(10);
    doc.text(`Name: ${name_of_buyer}`, 20, 65);
    doc.text(`Email: ${email_of_buyer}`, 20, 70);
    doc.text(`Phone: ${phone_number_of_buyer}`, 20, 75);
    doc.text(`Address: ${address_of_buyer}`, 20, 80);

    // Add invoice details
    doc.setFontSize(12);
    doc.text(`Order ID: ${order_id}`, 20, 90);
    doc.text(`Payment Method: ${payment_type}`, 20, 95);
    doc.text(`Total Price: ${formatter.format(total_price)}`, 20, 100);

    // Add table headers
    doc.setFontSize(10);
    doc.text("Item", 20, 110);
    doc.text("Color", 70, 110);
    doc.text("Size", 100, 110);
    doc.text("Capacity", 130, 110);
    doc.text("Price", 160, 110);
    doc.text("Quantity", 180, 110);

    // Add table content
    let y = 120;
    items.forEach((item, index) => {
      doc.text(`${item.product_name}`, 20, y);
      item.selected_properties.forEach((propertiesArray) => {
        propertiesArray.forEach((property) => {
          doc.text(`${property.color}`, 70, y);
          doc.text(`${property.size}`, 100, y);
          doc.text(`${property.capacity}`, 130, y);
          doc.text(`${formatter.format(property.price)}`, 160, y);
          doc.text(`${property.quantity}`, 180, y);
          y += 10;
        });
      });
    });

    // Add footer
    doc.setFontSize(10);
    doc.text("Thank you for your business!", 105, y + 20, null, null, "center");

    // Save the PDF
    doc.save(`Invoice_${order_id}.pdf`);
  };

  const handleCheckout = async () => {
    if (!validateCustomerDetails()) {
      return;
    }

    setLoading(true);

    const checkoutData = {
      name_of_buyer: customerDetails.name,
      email_of_buyer: customerDetails.email,
      phone_number_of_buyer: customerDetails.mobile,
      address_of_buyer: customerDetails.address,
      items: cart.map((item) => ({
        _id: item._id,
        product_name: item.product_name,
        selected_properties: item.selected_properties.map((propertiesArray) =>
          propertiesArray.map((property) => ({
            color: property.color,
            size: property.size,
            capacity: property.capacity,
            price: property.price,
            quantity: property.quantity,
          }))
        ),
      })),
      total_price: cart.reduce((acc, item) => acc + item.totalCost, 0),
      source: "inhouse",
      order_id: customerDetails.orderId,
      payment_type: customerDetails.paymentMethod,
      ref:
        customerDetails.paymentMethod === "transfer" ? customerDetails.ref : {},
    };

    try {
      const response = await axios.post(
        "https://pbwkbq0l-4000.uks1.devtunnels.ms/nylonhub/v1/products/cart",
        checkoutData
      );
      if (response.status === 200) {
        toast.success("Checkout successful!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        // Generate invoice PDF
        await generateInvoice(checkoutData);

        // Reset form after successful checkout
        setCustomerDetails({
          name: "",
          email: "",
          mobile: "",
          address: "",
          paymentMethod: "cash",
          orderId: generateOrderId("", "NYLONHUB"),
          ref: {},
        });
        setCart([]);
        setSelectedProduct(null);
        setSearchTerm("");
        setQuantity(1);
        setTotalCost(0);
        setDimension([]);
        setItemDetails({});
        setSelectedColor(null);
        setSelectedId(null);
        setSelectedColorId(null);
      } else {
        toast.error("Checkout failed. Please try again.", {
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
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout failed. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      <CustomerDetails
        customerDetails={customerDetails}
        handleInputChange={handleInputChange}
        handleReset={handleReset}
      />
      <ProductSelection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredProducts={filteredProducts}
        handleProductSelect={handleProductSelect}
      />
      {selectedProduct && (
        <ProductDetails
          selectedProduct={selectedProduct}
          itemDetails={itemDetails}
          dimension={dimension}
          selectedColorId={selectedColorId}
          selectedId={selectedId}
          handleColorSelect={handleColorSelect}
          handleSelect={handleSelect}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
          handleQuantityChange={handleQuantityChange}
          quantity={quantity}
          totalCost={totalCost}
          formatter={formatter}
          handleAddToCart={handleAddToCart}
          handleUpdateCart={handleUpdateCart}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          cart={cart}
          setSelectedId={setSelectedId}
          retrieveDetails={retrieveDetails}
          setQuantity={setQuantity}
        />
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              Are you sure you want to reset?
            </h3>
            <div className="flex justify-end">
              <button
                onClick={cancelReset}
                className="bg-gray-300 text-black p-2 rounded mr-2"
              >
                No
              </button>
              <button
                onClick={confirmReset}
                className="bg-red-500 text-white p-2 rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              Processing your order, please wait...
            </h3>
          </div>
        </div>
      )}
      <Cart
        cart={cart}
        formatter={formatter}
        handleCartQuantityChange={handleCartQuantityChange}
        handleRemoveFromCart={handleRemoveFromCart}
        handleClearCart={handleClearCart}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};

export default InHouseApplication;
