import { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/api";
const CartContext = createContext();

export function CartProvider({ children }) {
  // ✅ LOAD from localStorage (initial)
  const [cart, setCart] = useState(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) return [];

    const saved = localStorage.getItem(`cart_${userId}`);

    return saved ? JSON.parse(saved) : [];
  });

  // SAVE to Mongo DB (every change)
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // ADD TO CART
  const addToCart = (product) => {
    console.log("ADDING:", product);
    setCart((prev) => {
      const exist = prev.find((item) => item._id === product._id);

      if (exist) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };
  // REMOVE ITEM
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };
  // INCREASE QTY
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  // DECREASE QTY
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, qty: item.qty - 1 } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  //Clear Cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
