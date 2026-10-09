import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";

function Cart() {
  const [cart, setCart] = useState([]);
  const [removeProductId, setRemoveProductId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // FETCH CART
  useEffect(() => {
    let cancelled = false;

    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const res = await API.get("/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!cancelled) {
          setCart(res.data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to fetch cart:", err.response?.data || err);
        }
      }
    };

    fetchCart();

    return () => {
      cancelled = true;
    };
  }, []);

  // REFRESH CART AFTER AN ACTION
  const refreshCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data);
    } catch (err) {
      console.error("Failed to refresh cart:", err.response?.data || err);
    }
  };

  // REMOVE PRODUCT
  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await refreshCart();
    } catch (err) {
      console.error("Failed to remove product:", err.response?.data || err);
    }
  };

  // INCREASE QUANTITY
  const increaseQty = async (item) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/cart/update/${item.product_id}?quantity=${item.quantity + 1}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await refreshCart();
    } catch (err) {
      console.error("Failed to increase quantity:", err.response?.data || err);
    }
  };

  // DECREASE QUANTITY
  const decreaseQty = async (item) => {
    if (item.quantity <= 1) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/cart/update/${item.product_id}?quantity=${item.quantity - 1}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await refreshCart();
    } catch (err) {
      console.error("Failed to decrease quantity:", err.response?.data || err);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * Number(item.price),
    0,
  );

  // CLEAR CART
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.delete("/cart/clear", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart([]);
      setShowConfirm(false);
    } catch (err) {
      console.error("Failed to clear cart:", err.response?.data || err);
      alert("Failed to clear cart");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* HEADING */}
      <h1
        className="
          text-4xl
          font-bold
          mb-8
          bg-linear-to-r
          from-cyan-400
          to-purple-400
          bg-clip-text
          text-transparent
        "
      >
        My Cart
      </h1>

      {/* EMPTY STATE */}
      {cart.length === 0 ? (
        <div
          className="
            text-center
            py-16
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
          "
        >
          <p className="text-gray-400 text-lg">Nothing in the cart</p>
        </div>
      ) : (
        cart.map((item) => (
          <div
            key={item.cart_id}
            className="
              bg-white/5
              backdrop-blur-xl
              border
              border-white/10
              rounded-3xl
              p-5
              mb-5
              shadow-xl
              hover:border-cyan-500/30
              transition-all
              duration-300
              flex
              flex-col
              md:flex-row
              gap-5
            "
          >
            {/* IMAGE */}
            <div
              className="
                w-32
                h-32
                rounded-2xl
                overflow-hidden
                border
                border-cyan-500/30
                bg-white
                shrink-0
              "
            >
              <img
                src={item.image}
                alt={item.name || "Product"}
                className="w-full h-full object-contain"
              />
            </div>

            {/* DETAILS */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{item.name}</h2>

              <p className="text-gray-400 mt-2">{item.description}</p>

              <p className="text-cyan-400 text-xl font-bold mt-3">
                ${item.price}
              </p>

              <p className="text-purple-300 font-semibold mt-2">
                Total: ${(Number(item.price) * item.quantity).toFixed(2)}
              </p>
            </div>

            {/* QUANTITY CONTROLS */}
            <div
              className="
                flex
                items-center
                justify-center
                w-full
                sm:w-fit
                rounded-2xl
                bg-black/30
                border
                border-white/10
                overflow-hidden
                h-12
              "
            >
              <button
                type="button"
                onClick={() => decreaseQty(item)}
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity"
                className="
                  w-12
                  h-12
                  text-red-400
                  text-xl
                  font-bold
                  hover:bg-red-500/20
                  disabled:opacity-40
                  transition-all
                "
              >
                −
              </button>

              <span className="w-12 text-center text-white font-bold">
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={() => increaseQty(item)}
                aria-label="Increase quantity"
                className="
                  w-12
                  h-12
                  text-green-400
                  text-xl
                  font-bold
                  hover:bg-green-500/20
                  transition-all
                "
              >
                +
              </button>
            </div>

            {/* REMOVE BUTTON */}
            <button
              type="button"
              onClick={() => setRemoveProductId(item.product_id)}
              className="
                h-fit
                px-6
                py-3
                rounded-2xl
                bg-red-500/10
                border
                border-red-500/30
                text-red-400
                font-semibold
                hover:bg-red-500/20
                hover:border-red-500/60
                hover:scale-105
                transition-all
                duration-300
              "
            >
              Remove
            </button>
          </div>
        ))
      )}

      {/* CART TOTAL */}
      {cart.length > 0 && (
        <div className="bg-black/20 rounded-3xl p-6 mt-6 text-right">
          <p className="text-gray-400">Cart Total</p>
          <h2 className="text-3xl font-bold text-cyan-400">
            ${total.toFixed(2)}
          </h2>
        </div>
      )}

      {/* CART ACTIONS */}
      {cart.length > 0 && (
        <div className="flex justify-between items-center mt-4 gap-4">
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="
              bg-red-500
              text-white
              px-4
              py-2
              rounded-xl
              hover:bg-red-600
              hover:scale-105
              hover:shadow-lg
              hover:shadow-red-500/40
              transition-all
              duration-300
            "
          >
            Clear Cart
          </button>

          <Link to="/checkout">
            <button
              type="button"
              className="
                py-3
                rounded-xl
                bg-linear-to-r
                from-blue-500
                to-purple-500
                text-white
                font-semibold
                pl-7
                pr-7
                hover:scale-105
                hover:shadow-lg
                hover:shadow-purple-500/40
                transition-all
                duration-300
              "
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}

      {/* CLEAR CART CONFIRMATION */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="
              bg-slate-900
              border
              border-white/10
              rounded-3xl
              p-8
              shadow-2xl
              text-center
              max-w-sm
              w-full
            "
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Are you sure?
            </h2>

            <p className="text-gray-400 mb-6">
              This will remove all items from cart.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mt-6">
              <button
                type="button"
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Yes
              </button>

              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="bg-gray-400 px-4 py-2 rounded cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REMOVE PRODUCT CONFIRMATION */}
      {removeProductId !== null && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="
              w-full
              max-w-md
              bg-slate-900
              border
              border-white/10
              rounded-3xl
              p-8
              shadow-2xl
            "
          >
            <h2 className="text-2xl font-bold text-white mb-3">
              Remove Product
            </h2>

            <p className="text-gray-400 mb-6">
              Are you sure you want to remove this item from cart?
            </p>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setRemoveProductId(null)}
                className="
                  px-5
                  py-3
                  rounded-xl
                  bg-white/10
                  text-white
                  hover:bg-white/20
                  transition-all
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={async () => {
                  await removeItem(removeProductId);
                  setRemoveProductId(null);
                }}
                className="
                  px-5
                  py-3
                  rounded-xl
                  bg-red-500
                  text-white
                  hover:bg-red-600
                  transition-all
                "
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;