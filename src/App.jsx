import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero-Section";
import Products from "./components/Products";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import TopLoader from "./components/Progress-Bar";
import { useState } from "react";
import ProductDetail from "./components/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers.jsx";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import AdminRoute from "./routes/AdminRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./admin/AdminLayout.jsx";
import ProductsAdmin from "./admin/ProductsAdmin";
import OrdersAdmin from "./admin/OrdersAdmin";
import ReturnsAdmin from "./admin/ReturnsAdmin";
import ReviewsAdmin from "./admin/ReviewsAdmin";
import CouponsAdmin from "./admin/CouponsAdmin";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-purple-900 text-white">
        <Navbar search={search} setSearch={setSearch} />
        <TopLoader />

        <Routes>
          {/* ================= PUBLIC ================= */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Products search={search} />
              </>
            }
          />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success/:id" element={<Success />} />

          {/* ================= USER PROTECTED ================= */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* ================= AUTH ================= */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="orders" element={<OrdersAdmin />} />
            <Route path="returns" element={<ReturnsAdmin />} />
            <Route path="reviews" element={<ReviewsAdmin />} />
            <Route path="coupons" element={<CouponsAdmin />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
