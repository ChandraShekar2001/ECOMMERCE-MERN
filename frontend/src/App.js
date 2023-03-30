import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/User";

import Navbar from "./Components/Navbar/Nav";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Home from "./Components/Home/Home";
import Footer from "./Components/Home/Afooter";
import Profile from "./Components/User/Profile";
import MyOrders from "./Components/Orders/MyOrders";
import UpdatePassword from "./Components/User/UpdatePassword";
import Products from "./Components/Products/Products";
// import Product from "./Components/Products/Product";
import Cart from "./Components/Products/Cart"
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";
import Shipping from "./Components/Orders/Shipping";
import OrderConfirm from "./Components/Orders/OrderConfirm";
import OrderSuccess from "./Components/Orders/OrderSuccess";
import Payment from "./Components/Orders/Payment";

import AdminSideBar from "./Components/Admin/AdminSideBar";
import Dashboard from "./Components/Admin/Dashboard";
import ProductList from "./Components/Admin/ProductList";
import NewProduct from "./Components/Admin/NewProduct";
import OrderList from "./Components/Admin/OrderList";
import UsersList from "./Components/Admin/UsersList";
import ProductReview from "./Components/Admin/ProductReview";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const role = user && user.role;
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          exact
          path="/"
          element={isAuthenticated ? <Home /> : <Login />}
        />
        <Route exact path="/signup" element={<Signup />} />
        <Route
          exact
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Login />}
        />
        <Route
          exact
          path="/myorders"
          element={isAuthenticated ? <MyOrders /> : <Login />}
        />
        <Route
          exact
          path="/updatepassword"
          element={isAuthenticated ? <UpdatePassword /> : <Login />}
        />
        <Route
          exact
          path="/products/:category"
          element={isAuthenticated ? <Products /> : <Login />}
        />
        {/* <Route
          exact
          path="/product/:id"
          element={isAuthenticated ? <Product /> : <Login />}
        /> */}
        <Route
          exact
          path="/cart"
          element={isAuthenticated ? <Cart /> : <Login />}
        />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route 
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
          />
          <Route exact path="/shipping" element={<Shipping />} />
          <Route exact path="/order/confirm" element={<OrderConfirm />} />
          <Route exact path="/success" element={<OrderSuccess />} />
          <Route
          exact
          path="/process/payment"
          element={
            <Payment />
          }
        />
        <Route path="/admin/*" element={<AdminSideBar />}>
          <Route path="" element={<Dashboard />} />
          <Route path="dashboard" element={role === "admin" && <Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="product" element={<NewProduct />} />
          <Route path="users" element={<UsersList />} />
          <Route path="reviews" element={<ProductReview />} />

        </Route>
      </Routes>
      
      {isAuthenticated && <Footer />}
    </>
  );
}

export default App;
