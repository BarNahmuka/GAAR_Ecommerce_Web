import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  createRoutesFromElements,useLocation,
} from "react-router-dom";
import Products from "./pages/Products";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import "./App.css";
import Register from "./pages/Register";
import ProductDetail from './pages/ProductDetail';
import Edit from './pages/Edit';
import Cart from './pages/Cart';
import New from "./pages/New";
import MyOrders from "./pages/MyOrders";
import UserDetails from "./pages/UserDetails";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SuccessPage from "./pages/SuccessPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductsByCategory from "./pages/ProductsByCategory";

const AppLayout = () => {
  const location = useLocation(); 

  return (
    <div key={location.pathname}> 
      <Navbar />
      <Outlet /> 
      <Footer />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
     <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/new" element= {<New/>} />
      <Route path="/edit/:productId" element= {<Edit/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/:userId/myOrders" element={<MyOrders />} />
      <Route path="/user/:userId" element={<UserDetails />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/resetPassword/:token" element={<ResetPassword />} />
      <Route path="/successPayments/:userId" element={<SuccessPage />} />
      <Route path="/productsByCategory/:category" element={<ProductsByCategory />} />
      </Route>
      ));

function App() {
  return <RouterProvider router={router}/>;
} 

export default App;