import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

function PaymentForm({ total, cart, form, coupon }) {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    try {
      setLoading(true);

      // Fake payment delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const token = localStorage.getItem("token");

      const orderData = {
        name: form.name,
        email: form.email,
        phone: form.phone,

        address: {
          full_name: form.name,
          phone: form.phone,
          city: form.city,
          street: form.street,
          postal_code: form.postal_code,
          country: form.country,
        },

        items: cart.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),

        coupon_code: coupon || null,
        payment_method: "card",
      };

      const res = await API.post("/orders/place", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const stripeRes = await API.post(
        `/stripe/checkout/${res.data.order_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      window.location.href = stripeRes.data.checkout_url;
    } catch (err) {
      console.log(err.response?.data || err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <button
          disabled={!stripe || loading}
          className="
          w-full
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

          disabled:opacity-50
          disabled:cursor-not-allowed
        "
        >
          {loading ? "Processing..." : `Pay $${total}`}
        </button>

        {success && (
          <p className="text-green-400 mt-3 text-center">Payment Successful</p>
        )}
      </form>
    </div>
  );
}
export default PaymentForm;
