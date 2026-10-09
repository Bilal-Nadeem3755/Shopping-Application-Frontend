import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../utils/api";

function ProductDetail() {
  const { id } = useParams();
  const [added, setAdded] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        `/cart/add/${product._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error("Failed to add product to cart:", err.response?.data || err);
    }
  };

  if (!product) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div
        className="
          grid
          lg:grid-cols-2
          gap-8
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-6
          shadow-2xl
        "
      >
        <img
          src={product.image}
          alt={product.name || product.title || "Product"}
          className="
            w-full
            h-112.5
            object-cover
            rounded-2xl
            shadow-xl
            hover:scale-[1.02]
            transition-all
            duration-500
          "
        />

        <div>
          <h1 className="text-4xl font-bold text-white">
            {product.name || product.title || "Product Details"}
          </h1>

          <p
            className="
              text-5xl
              font-bold
              bg-linear-to-r
              from-cyan-400
              to-purple-400
              bg-clip-text
              text-transparent
              mt-4
            "
          >
            ${product.price}
          </p>

          <p className="mt-6 text-gray-300 leading-7">
            {product.description}
          </p>

          <div className="mt-5">
            <span
              className="
                px-4
                py-2
                rounded-full
                bg-green-500/20
                border
                border-green-400/30
                text-green-300
                text-sm
              "
            >
              In Stock: {product.stock}
            </span>
          </div>

          <p className="text-yellow-400 text-lg mt-5">
            ⭐ {product.average_rating || 0} (
            {product.review_count || 0} reviews)
          </p>

          <button
            type="button"
            onClick={handleAdd}
            className="
              mt-8
              w-full
              md:w-auto
              px-10
              py-4
              rounded-2xl
              bg-linear-to-r
              from-cyan-500
              to-purple-500
              text-white
              font-semibold
              hover:scale-105
              hover:shadow-xl
              hover:shadow-purple-500/30
              transition-all
              duration-300
            "
          >
            Add To Cart
          </button>

          {added && (
            <p className="text-green-400 mt-4 font-medium">
              ✓ Added To Cart Successfully
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;