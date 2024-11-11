import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { FcViewDetails } from "react-icons/fc";
import { AiFillProduct } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { IoMdAddCircle } from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Register",
    path: "/register",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Login",
    path: "/login",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
];

export const SidebarDataLoggedIn = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Products",
    path: "/products",
    icon: <AiFillProduct />,
    cName: "nav-text",
  },
  {
    title: "My Cart",
    path: "/cart",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "My Orders",
    path: "/:userId/myOrders",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
  {
    title: "User Details",
    path: "/user/:userId",
    icon: <TbListDetails />,
    cName: "nav-text",
  },
];

export const SidebarDataAdmin = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Products",
    path: "/products",
    icon: <AiFillProduct />,
    cName: "nav-text",
  },
  {
    title: "Add Product",
    path: "/new",
    icon: <IoMdAddCircle />,
    cName: "nav-text",
  },
];