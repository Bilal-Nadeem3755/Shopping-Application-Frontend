import { createContext, useState, useEffect } from "react";
import API from "../utils/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  // LOAD from localStorage
  const [cart, setCart] = useState(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) return [];

    const saved = localStorage.getItem(`cart_${userId}`);

    return saved ? JSON.parse(saved) : [];
  });

  // FETCH CART FROM BACKEND
  useEffect(() => {
    const fetchCart = async () => {
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
        console.error("Failed to fetch cart:", err.response?.data || err);
      }
    };

    fetchCart();
  }, []);

  // ADD TO CART
  const addToCart = (product) => {
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

  // INCREASE QUANTITY
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  // DECREASE QUANTITY
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, qty: item.qty - 1 } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  // CLEAR CART
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

export default CartContext;