import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../stripe";
import PaymentForm from "../components/PaymentForm";
import API from "../utils/api";

function Checkout() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Fetch Cart

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
  useEffect(() => {
    fetchCart();
  }, []);

  // ================= FORM =================
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    street: "",
    postal_code: "",
    country: "",
  });

  // ================= PAYMENT METHOD =================
  const [method, setMethod] = useState("cod");

  // ================= COUPON =================
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  // ================= TOTAL =================
  const subtotal = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  const finalTotal =
    discount < 100
      ? subtotal - (subtotal * discount) / 100
      : subtotal - discount;

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= APPLY COUPON =================
  const handleApplyCoupon = async () => {
    try {
      const res = await API.post("/coupons/validate", {
        code: coupon,
        cart_total: finalTotal,
      });

      setDiscount(res.data.discount_amount);
      setCouponMsg("Coupon Applied ✅");
    } catch (err) {
      console.log(err.response?.data);

      setCouponMsg(err.response?.data?.detail || "Invalid Coupon");
    }
  };

  // ================= COD ORDER =================
  const handleCOD = async () => {
    // VALIDATION
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.city ||
      !form.street ||
      !form.postal_code ||
      !form.country
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      // ================= ORDER DATA =================
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
        payment_method: "cod",
      };

      console.log("ORDER DATA:", orderData);
      console.log("CHECKOUT CART:", cart);

      // ================= API REQUEST =================
      const res = await API.post("/orders/place", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("ORDER RESPONSE:", res.data);

      // ================= CLEAR CART =================
      await API.delete("/cart/clear", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ================= SUCCESS PAGE =================
      navigate(`/success/${res.data.order_id}`);
    } catch (err) {
      console.log(err.response?.data || err);

      alert(err.response?.data?.detail || "Order failed");
    }

    // navigate(`/success/${res.data.order_id}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      {/* ================= LEFT SIDE ================= */}
      <div
        className="
bg-white/10
backdrop-blur-xl
border border-white/10
rounded-3xl
shadow-2xl
p-6
"
      >
        <h2
          className="
  text-2xl
  font-bold
  text-white
  mb-6
"
        >
          Shipping Details
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="
w-full
mb-3
p-3
rounded-xl

bg-white/5
border border-white/20

text-white
placeholder:text-gray-400

outline-none
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30

transition-all
"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="
w-full
mb-3
p-3
rounded-xl

bg-white/5
border border-white/20

text-white
placeholder:text-gray-400

outline-none
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30

transition-all
"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="
w-full
mb-3
p-3
rounded-xl

bg-white/5
border border-white/20

text-white
placeholder:text-gray-400

outline-none
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30

transition-all
"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="
w-full
mb-3
p-3
rounded-xl

bg-white/5
border border-white/20

text-white
placeholder:text-gray-400

outline-none
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30

transition-all
"
        />

        <input
          type="text"
          name="street"
          placeholder="Street"
          value={form.street}
          onChange={handleChange}
          className="
w-full
mb-3
p-3
rounded-xl

bg-white/5
border border-white/20

text-white
placeholder:text-gray-400

outline-none
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30

transition-all
"
        />

        <input
          type="text"
          name="postal_code"
          placeholder="Postal Code"
          value={form.postal_code}
          onChange={handleChange}
          className="
w-full
mb-3
p-3
rounded-xl

bg-white/5
border border-white/20

text-white
placeholder:text-gray-400

outline-none
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30

transition-all
"
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className="
w-full
mb-3
p-3
rounded-xl

bg-white/5
border border-white/20

text-white
placeholder:text-gray-400

outline-none
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30

transition-all
"
        />

        {/* ================= PAYMENT METHOD ================= */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Payment Method</h3>

          <div className="flex gap-3">
            <button
              onClick={() => setMethod("cod")}
              className={`px-5 py-3 rounded-xl font-medium transition-all

${
  method === "cod"
    ? "bg-linear-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
    : "bg-white/10 text-gray-300 border border-white/10"
}`}
            >
              Cash on Delivery
            </button>

            <button
              onClick={() => setMethod("card")}
              className={`px-5 py-3 rounded-xl font-medium transition-all

${
  method === "card"
    ? "bg-linear-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
    : "bg-white/10 text-gray-300 border border-white/10"
}`}
            >
              Card Payment
            </button>
          </div>
        </div>

        {/* ================= COD BUTTON ================= */}
        <div className="mt-6 min-h-20">
          {method === "cod" ? (
            <button
              onClick={handleCOD}
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
      "
            >
              Place Order (COD)
            </button>
          ) : (
            <Elements stripe={stripePromise}>
              <PaymentForm
                total={finalTotal}
                cart={cart}
                form={form}
                coupon={coupon}
              />
            </Elements>
          )}
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div
        className="
bg-white/10
backdrop-blur-xl
border border-white/10
rounded-3xl
shadow-2xl
p-6
"
      >
        <h2 className="
  text-2xl
  font-bold
  text-white
  mb-6
">Order Summary</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.cart_id} className="flex gap-3 border-b py-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-bold text-white font-xl">{item.name}</h3>

                <p className="text-sm text-gray-200">{item.description}</p>

                <p className="text-gray-300">
                  ${item.price} × {item.quantity}
                </p>
              </div>
            </div>
          ))
        )}

        {/* ================= PRICING ================= */}
        <h2 className="text-right mt-4 pb-2">Subtotal: ${subtotal}</h2>

        {discount > 0 && (
          <h2 className="text-right text-green-600">
            Discount: -$
            {discount < 100 ? (subtotal * discount) / 100 : discount}
          </h2>
        )}

        <h2 className="text-right font-bold text-lg">Total: ${finalTotal}</h2>

        {/* ================= COUPON ================= */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Apply Coupon</h3>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="
w-full
mb-3
p-3
rounded-xl

bg-white/5
border border-white/20

text-white
placeholder:text-gray-400

outline-none
focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30

transition-all
"
            />

            <button
              onClick={handleApplyCoupon}
             className="
        w-32
        h-12
        py-1

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
              Apply
            </button>
          </div>

          {couponMsg && (
            <p className="text-sm mt-2 text-green-600">{couponMsg}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
