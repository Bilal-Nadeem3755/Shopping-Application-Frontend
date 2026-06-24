import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { jwtDecode } from "jwt-decode";

function Navbar({ search, setSearch }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate("/");
      setOpen(false); // mobile menu close
    }
  };
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  let role = null;

  if (token) {
    const decoded = jwtDecode(token);
    role = decoded.role;
  }

  {
    role === "admin" && <Link to="/admin">Admin Panel</Link>;
  }

  return (
    <nav
      className="
    sticky top-0 z-50

    bg-black/20
    backdrop-blur-xl

    border-b border-white/10

    px-4 py-3
  "
    >
      {/* Top Row */}
      <div className="flex items-center justify-between gap-2">
        {/* Logo */}
        <Link to="/">
          <img
  src="https://lzd-img-global.slatic.net/us/domino/3b870cb043c7f8a9741cbf66329e294e.png"
  className="
    h-8
    md:h-10

    hover:scale-105
    transition-transform
  "
/>
        </Link>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          className="
    mx-2
    px-4
    py-2

    rounded-xl

    bg-white/10
    backdrop-blur-md

    border border-white/20

    text-white
    placeholder:text-gray-300

    outline-none

    focus:border-cyan-400
    focus:ring-2
    focus:ring-cyan-400/20

    w-full
    max-w-xl
  "
        />
        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">
          <Link
            to="/"
            className="
  text-gray-200
  hover:text-cyan-400
  transition-colors
"
          >
            Home
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="
  text-gray-200
  hover:text-cyan-400
  transition-colors
"
              >
                Profile
              </Link>

              <Link
                to="/orders"
                className="
  text-gray-200
  hover:text-cyan-400
  transition-colors
"
              >
                Orders
              </Link>

              {role === "admin" && (
                <Link
                  to="/admin"
                  className="
  text-gray-200
  hover:text-cyan-400
  transition-colors
"
                >
                  Admin Panel
                </Link>
              )}

              <button
  onClick={handleLogout}
  className="
    text-gray-200
    hover:text-red-400
    transition-colors
    cursor-pointer
  "
>
  Logout
</button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="
  text-gray-200
  hover:text-cyan-400
  transition-colors
"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="
  text-gray-200
  hover:text-cyan-400
  transition-colors
"
              >
                Login
              </Link>
            </>
          )}

          <Link
            to="/cart"
            className="
  text-gray-200
  hover:text-cyan-400
  transition-colors
relative"
          >
            Cart
            {totalItems > 0 && (
              <span
  className="
    absolute
    -top-2
    -right-3

    min-w-4.5
    h-4.5

    flex
    items-center
    justify-center

    rounded-full

    bg-red-500

    text-[11px]
    text-white

    font-bold
  "
>
  {totalItems}
</span>
            )}
          </Link>
        </div>

        {/* Mobile Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-lg">
          ☰
        </button>
      </div>

      {/* ✅ FIXED Mobile Menu */}
      {open && (
        <div className="
  flex flex-col gap-3 mt-3

  bg-black/30
  backdrop-blur-xl

  border border-white/10

  text-white

  p-4
  rounded-2xl
">
          <Link
            to="/"
            className="
  text-gray-200
  hover:text-cyan-400
  transition-colors
"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="
  text-gray-200
  hover:text-cyan-400
  transition-colors
"
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>

              <Link
                to="/orders"
                className="
  text-gray-200
  hover:text-cyan-400
  transition-colors
"
                onClick={() => setOpen(false)}
              >
                Orders
              </Link>

              {role === "admin" && (
                <Link
                  to="/admin"
                  className="
  text-gray-200
  hover:text-cyan-400
  transition-colors
"
                  onClick={() => setOpen(false)}
                >
                  Admin Panel
                </Link>
              )}

             
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="
  text-gray-200
  hover:text-cyan-400
  transition-colors
"
                onClick={() => setOpen(false)}
              >
                Signup
              </Link>

              <Link
                to="/login"
                className="
  text-gray-200
  hover:text-cyan-400
  transition-colors
"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            </>
          )}

          <Link
            to="/cart"
            className="
  text-gray-200
  hover:text-cyan-400
  transition-colors
"
            onClick={() => setOpen(false)}
          >
            Cart
          </Link>
          <button
  onClick={handleLogout}
  className="
    text-gray-200
    hover:text-red-400
    transition-colors
    cursor-pointer
    text-left
  "
>
  Logout
</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
