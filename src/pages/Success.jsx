import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import API from "../utils/api";

function Success() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrder = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get(`/orders/${id}`);
      setOrder(res.data);
    } catch (err) {
      console.error("Failed to load order:", err);
      setError(
        err.response?.data?.detail ||
          "Order details could not be loaded. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-white text-xl font-bold">
        Loading your order...
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-white">
          Unable to Load Order
        </h1>

        <p className="text-gray-300 mt-4">
          {error || "Order details are currently unavailable."}
        </p>

        <button
          onClick={fetchOrder}
          className="mt-6 px-6 py-3 rounded-xl bg-cyan-600 text-white font-semibold"
        >
          Try Again
        </button>

        <div>
          <Link to="/orders" className="inline-block mt-4 text-cyan-300">
            View My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
        <div className="text-7xl">✅</div>

        <h1 className="text-4xl font-bold text-white mt-4">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-300 mt-3 text-lg">
          Thank you,
          <span className="font-bold text-cyan-400">
            {" "}
            {order.name || "Customer"}
          </span>
        </p>

        <p className="text-gray-400 mt-2">
          Your order details are shown below.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Order ID</p>
            <p className="text-white font-semibold break-all">{id}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">Total Amount</p>
            <p className="text-cyan-400 text-2xl font-bold">
              ${Number(order.total_amount).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-6">
            Ordered Items
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {(order.items || []).map((item, index) => (
              <div
                key={item.id ?? `${item.name}-${index}`}
                className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4"
              >
                <img
                  src={item.image}
                  alt={item.name || "Ordered product"}
                  className="w-24 h-24 rounded-xl object-cover"
                />

                <div className="text-left flex-1">
                  <h3 className="text-white font-semibold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-cyan-400 font-bold">
                    ${Number(item.price).toFixed(2)}
                  </p>

                  <p className="text-gray-300">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link
          to="/"
          className="inline-block mt-10 px-10 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:scale-105 transition-all duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default Success;