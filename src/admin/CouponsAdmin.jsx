import { useState } from "react";
import API from "../utils/api";

function CouponsAdmin() {
  const [form, setForm] = useState({
    code: "",
    discount_type: "percentage",
    discount_value: 0,
    max_usage: 1,
    expiry_date: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/coupons/admin/create",
        {
          ...form,
          discount_value: Number(form.discount_value),
          max_usage: Number(form.max_usage),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res.data);

      alert("Coupon Created Successfully ✅");

      // reset form
      setForm({
        code: "",
        discount_type: "percentage",
        discount_value: 0,
        max_usage: 1,
        expiry_date: "",
      });
    } catch (err) {
      console.log(err.response?.data);

      alert(err.response?.data?.detail || "Failed to create coupon");
    }
  };

  return (
    <div
      className="md:ml-48 max-w-xl mx-auto p-6  rounded-xl  bg-white/10
    backdrop-blur-xl
    
    border border-white/20
    shadow-2xl"
    >
      <h1
        className=" text-4xl pb-5
font-extrabold

bg-linear-to-r
from-cyan-400
to-purple-400

bg-clip-text
text-transparent"
      >
        Create Coupon
      </h1>

      {/* CODE */}
      <input
        type="text"
        name="code"
        placeholder="Coupon Code"
        value={form.code}
        onChange={handleChange}
        className="w-full
mb-4
p-3

rounded-xl

bg-white/10
border border-white/10

text-white
placeholder:text-gray-400

outline-none

focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30"
      />

      {/* TYPE */}
      <select
        name="discount_type"
        value={form.discount_type}
        onChange={handleChange}
        className="w-full
mb-4
p-3

rounded-xl

bg-white/10
border border-white/10

text-white
placeholder:text-gray-400

outline-none

focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30"
      >
        <option value="percentage">Percentage</option>

        <option value="fixed">Fixed</option>
      </select>

      {/* VALUE */}
      <input
        type="number"
        name="discount_value"
        placeholder="Discount Value"
        value={form.discount_value}
        onChange={handleChange}
        className="w-full
mb-4
p-3

rounded-xl

bg-white/10
border border-white/10

text-white
placeholder:text-gray-400

outline-none

focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30"
      />

      {/* MAX USAGE */}
      <input
        type="number"
        name="max_usage"
        placeholder="Max Usage"
        value={form.max_usage}
        onChange={handleChange}
        className="w-full
mb-4
p-3

rounded-xl

bg-white/10
border border-white/10

text-white
placeholder:text-gray-400

outline-none

focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30"
      />

      {/* EXPIRY */}
      <input
        type="datetime-local"
        name="expiry_date"
        value={form.expiry_date}
        placeholder="Expiry Date"
        onChange={handleChange}
        className="w-full
mb-4
p-3

rounded-xl

bg-white/10
border border-white/10

text-white
placeholder:text-gray-400

outline-none

focus:border-cyan-400
focus:ring-2
focus:ring-cyan-500/30"
      />

      <button
        onClick={handleSubmit}
        className="w-full
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
  duration-300"
      >
        Create Coupon
      </button>
    </div>
  );
}

export default CouponsAdmin;
