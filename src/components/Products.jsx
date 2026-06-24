import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import API from "../utils/api";
import Footer from "./Footer";

function Products({ search }) {
  const [products, setProducts] = useState([]);
  const [addedId, setAddedId] = useState(null);

  // FETCH PRODUCTS FROM BACKEND
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // SEARCH FILTER
  const filtered = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  // ADD TO CART
  const addProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        `/cart/add/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res.data);

      setAddedId(productId);

      setTimeout(() => {
        setAddedId(null);
      }, 2000);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <>
      <p
        className="
    text-4xl
    pl-9
    pt-6
    font-bold
    bg-linear-to-r
    from-cyan-400
    to-purple-400
    bg-clip-text
    text-transparent
  "
      >
        Discover
      </p>

      <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 ">
        {filtered.map((item) => (
          <div
            key={item._id}
            className="
    relative
    bg-white/10
    backdrop-blur-xl
    border border-white/10
    rounded-2xl
    overflow-hidden
    shadow-xl
  "
          >
            <Link to={`/product/${item._id}`}>
              <img
                src={item.image}
                className="
        h-48
        w-full
        object-cover
        transition-transform
        duration-500
        hover:scale-110
      "
              />

              {/* CONTENT WRAPPER */}
              <div className="p-4">
                <h3 className="font-semibold text-white text-lg">
                  {item.name}
                </h3>

                <p className="text-cyan-400 font-bold text-xl mt-2">
                  ${item.price}
                </p>

                <p className="text-sm text-gray-300">Stock: {item.stock}</p>

                <p className="text-yellow-400 text-sm">
                  ⭐ {item.average_rating || 0}({item.review_count || 0}{" "}
                  reviews)
                </p>
              </div>
            </Link>

            {/* BUTTON WRAPPER */}
            <div className="px-4 pb-4">
              <button
                onClick={() => addProduct(item._id)}
                disabled={item.stock === 0}
                className={`w-full py-2 rounded-xl text-white font-medium transition-all duration-300
      ${
        item.stock === 0
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-linear-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 cursor-pointer"
      }`}
              >
                {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>

              {addedId === item._id && (
                <div
                  className="
      absolute
      bottom-16
      left-1/2
      -translate-x-1/2

      bg-green-500
      text-white
      px-3
      py-1
      rounded-lg
      text-sm
      shadow-lg
    "
                >
                  Added ✓
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Products;
