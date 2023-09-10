import { FaHome, FaShoppingCart, FaListAlt, FaBell, FaCog, FaUser } from "react-icons/fa";

export const menuLinks = [
  {
    path: "/",
    label: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/products",
    label: "Products",
    icon: <FaShoppingCart />,
  },
  {
    path: "/orders",
    label: "Orders",
    icon: <FaListAlt />,
  },
  {
    path: "/notification",
    label: "Notification",
    icon: <FaBell />,
  },
  {
    path: "/settings",
    label: "Settings",
    icon: <FaCog />,
  },
  {
    path: "/customers",
    label: "Customers",
    icon: <FaUser />,
  },
];
