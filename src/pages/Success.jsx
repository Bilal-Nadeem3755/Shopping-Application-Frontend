
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/api";

function Success() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchOrder = async () => {
      try {
        const res = await API.get(`/orders/${id}`);

        if (isMounted) {
          setOrder(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrder();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (!order) {
    return (
      <h4 className="text-center mt-20 text-white text-xl font-bold">
        Loading...
      </h4>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Success Card */}
      <div
        className="
          bg-white/10
          backdrop-blur-xl
          border border-white/10
          rounded-3xl
          p-8
          shadow-2xl
          text-center
        "
      >
        {/* Success Icon */}
        <div className="text-7xl">✅</div>

        <h1 className="text-4xl font-bold text-white mt-4">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-300 mt-3 text-lg">
          Thank you,
          <span className="font-bold text-cyan-400">
            {" "}
            {order.name}
          </span>
        </p>

        <p className="text-gray-400 mt-2">
          Your order has been confirmed and will be delivered soon.
        </p>

        {/* Order Info */}
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div
            className="
              bg-white/5
              border border-white/10
              rounded-2xl
              p-5
            "
          >
            <p className="text-gray-400 text-sm">Order ID</p>
            <p className="text-white font-semibold break-all">
              {id}
            </p>
          </div>

          <div
            className="
              bg-white/5
              border border-white/10
              rounded-2xl
              p-5
            "
          >
            <p className="text-gray-400 text-sm">Total Amount</p>
            <p className="text-cyan-400 text-2xl font-bold">
              ${order.total_amount}
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-6">
            Ordered Items
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {order.items.map((item, index) => (
              <div
                key={item.id ?? `${item.name}-${index}`}
                className="
                  flex
                  items-center
                  gap-4
                  bg-white/5
                  border border-white/10
                  rounded-2xl
                  p-4
                  hover:bg-white/10
                  transition-all
                  duration-300
                "
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
                    ${item.price}
                  </p>

                  <p className="text-gray-300">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <Link
          to="/"
          className="
            inline-block
            mt-10
            px-10
            py-3
            rounded-xl
            bg-linear-to-r
            from-cyan-500
            to-purple-500
            text-white
            font-semibold
            hover:scale-105
            hover:shadow-lg
            hover:shadow-purple-500/40
            transition-all
            duration-300
          "
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default Success;