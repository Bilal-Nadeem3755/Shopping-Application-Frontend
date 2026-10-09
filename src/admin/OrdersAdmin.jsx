
import { useEffect, useState } from "react";
import API from "../utils/api";

function OrdersAdmin() {
  const [orders, setOrders] = useState([]);

  const statusColors = {
    processing: "bg-yellow-500/20 text-yellow-300",
    packed: "bg-blue-500/20 text-blue-300",
    shipped: "bg-cyan-500/20 text-cyan-300",
    delivered: "bg-green-500/20 text-green-300",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/all");
        setOrders(res.data);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    fetchOrders();
  }, []);

  const refreshOrders = async () => {
    try {
      const res = await API.get("/orders/all");
      setOrders(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.put(
        `/orders/admin/update-status/${id}?new_status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);
      await refreshOrders();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="pr-auto md:pr-64">
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
        Manage Orders
      </h1>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order._id}
            className="
              bg-white/5
              backdrop-blur-xl
              border
              border-white/10
              rounded-3xl
              p-5
              shadow-xl
              hover:border-cyan-500/30
              transition-all
              duration-300
            "
          >
            {/* Top Section */}
            <div
              className="
                flex
                flex-col
                md:flex-row
                md:justify-between
                gap-4
              "
            >
              <div>
                <h3 className="text-white font-bold text-lg">
                  Order #{order._id.slice(-6)}
                </h3>

                <p className="text-gray-400 text-sm break-all">
                  {order._id}
                </p>
              </div>

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusColors[order.status] ||
                    "bg-gray-500/20 text-gray-300"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {/* Details */}
            <div
              className="
                grid
                sm:grid-cols-2
                lg:grid-cols-4
                gap-4
                mt-5
              "
            >
              <div>
                <p className="text-gray-500 text-sm">Customer</p>
                <p className="text-white">
                  {order.name || "Unknown"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Total</p>
                <p className="text-cyan-400 font-bold">
                  ${order.total_amount}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Items</p>
                <p className="text-white">
                  {order.items?.length || 0}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Payment</p>
                <p className="text-white">
                  {order.payment_method || "N/A"}
                </p>
              </div>
            </div>

            {/* Status Update */}
            <div className="mt-6">
              <label className="text-gray-400 text-sm block mb-2">
                Update Status
              </label>

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => handleUpdate(order._id, "processing")}
                  className="px-3 py-2 rounded-lg bg-yellow-500 text-white"
                >
                  Processing
                </button>

                <button
                  onClick={() => handleUpdate(order._id, "packed")}
                  className="px-3 py-2 rounded-lg bg-blue-500 text-white"
                >
                  Packed
                </button>

                <button
                  onClick={() => handleUpdate(order._id, "shipped")}
                  className="px-3 py-2 rounded-lg bg-cyan-500 text-white"
                >
                  Shipped
                </button>

                <button
                  onClick={() => handleUpdate(order._id, "delivered")}
                  className="px-3 py-2 rounded-lg bg-green-500 text-white"
                >
                  Delivered
                </button>
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersAdmin;