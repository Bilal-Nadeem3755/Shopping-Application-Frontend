import { useEffect, useState } from "react";
import ReviewForm from "../components/ReviewForm";
import API from "../utils/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  // Fetch orders
  useEffect(() => {
    let cancelled = false;

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const res = await API.get("/orders/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!cancelled) {
          setOrders(res.data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to fetch orders:", err.response?.data || err);
        }
      }
    };

    fetchOrders();

    return () => {
      cancelled = true;
    };
  }, []);

  // Refresh orders after a return request
  const refreshOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await API.get("/orders/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (err) {
      console.error("Failed to refresh orders:", err.response?.data || err);
    }
  };

  // Return request
  const handleReturn = async (orderId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await API.post(
        `/returns/${orderId}?reason=Product not as expected`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Return request submitted");
      await refreshOrders();
    } catch (err) {
      console.error("Failed to submit return:", err.response?.data || err);
      alert(err.response?.data?.detail || "Failed to submit return request");
    }
  };

  // Mark review given
  const markReview = (orderId) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order._id === orderId
          ? { ...order, reviewGiven: true }
          : order,
      ),
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
        My Orders
      </h1>

      {orders.length === 0 && (
        <div className="text-center py-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
          <p className="text-gray-400 text-lg">No Orders Found</p>
        </div>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mb-6 shadow-xl hover:border-cyan-500/30 transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-5">
            <div>
              <h2 className="font-bold text-white text-lg">
                Order #{order._id.slice(-6)}
              </h2>

              <p className="text-gray-500 text-sm break-all">
                {order._id}
              </p>
            </div>

            <span
              className={`text-center md:h-fit px-3 py-1 rounded-full text-sm font-medium ${
                order.status === "processing"
                  ? "bg-yellow-500/20 text-yellow-300"
                  : order.status === "packed"
                    ? "bg-blue-500/20 text-blue-300"
                    : order.status === "shipped"
                      ? "bg-cyan-500/20 text-cyan-300"
                      : "bg-green-500/20 text-green-300"
              }`}
            >
              {order.status}
            </span>
          </div>

          <div className="border-t border-white/10 mb-8" />

          {/* Products */}
          {order.items.map((item, index) => (
            <div
              key={item.product_id || index}
              className="grid lg:grid-cols-[1fr_1.2fr] gap-4 bg-black/20 rounded-3xl p-5 mb-5"
            >
              {/* Product Info */}
              <div className="flex gap-5 items-center">
                <div className="w-30 h-30 rounded-2xl overflow-hidden border border-cyan-500/30 bg-white shrink-0">
                  <img
                    src={item.image}
                    alt={item.name || "Product"}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">
                    {item.name}
                  </h3>

                  <p className="text-cyan-400 text-xl font-bold mt-2">
                    ${Number(item.price).toFixed(2)}
                  </p>

                  <p className="text-gray-400 mt-2">
                    Qty: {item.quantity}
                  </p>

                  <p className="text-purple-300 font-semibold mt-2">
                    Item Total: $
                    {(Number(item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Review Section */}
              {order.status === "delivered" && (
                <div className="border border-purple-500/30 rounded-[28px] p-6 bg-linear-to-br from-white/5 to-white/2 backdrop-blur-xl shadow-lg shadow-purple-500/10">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                      <span className="text-3xl text-purple-400">★</span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        Write a Review
                      </h3>

                      <p className="text-gray-400">
                        Share your experience with this product
                      </p>
                    </div>
                  </div>

                  <ReviewForm
                    productId={item.product_id}
                    onDone={() => markReview(order._id)}
                  />
                </div>
              )}
            </div>
          ))}

          {/* Order Summary */}
          <div className="grid md:grid-cols-3 gap-5 bg-black/30 rounded-3xl p-6 mt-5">
            <div>
              <p className="text-gray-400 text-sm">Ordered On</p>

              <p className="text-white font-semibold mt-1">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Total Amount</p>

              <p className="text-cyan-400 font-bold mt-1">
                ${Number(order.total_amount).toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Status</p>

              <p className="text-green-400 font-semibold mt-1 capitalize">
                {order.status}
              </p>
            </div>
          </div>

          {/* Return Request */}
          {order.status === "delivered" && !order.returnRequested && (
            <button
              type="button"
              onClick={() => handleReturn(order._id)}
              className="mt-6 px-8 py-4 rounded-2xl bg-linear-to-r from-red-500 to-pink-500 text-white font-semibold text-lg hover:scale-105 transition-all duration-300"
            >
              Request Return
            </button>
          )}

          {/* Return Status */}
          {order.returnStatus === "pending" && (
            <div className="mt-4 inline-block px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-300">
              Return Pending
            </div>
          )}

          {order.returnStatus === "approved" && (
            <div className="mt-4 inline-block px-4 py-2 rounded-full bg-green-500/20 text-green-300">
              Refund Processed ✅
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Orders;