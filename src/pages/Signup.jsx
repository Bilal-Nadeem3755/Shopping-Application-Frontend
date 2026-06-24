import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", form);
      setMsg("Check your email for verification link 📧");
    } catch (err) {
      setMsg(err.response?.data?.detail);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div
        className="
    w-95
    p-8
    rounded-3xl
    text-center

    bg-white/10
    backdrop-blur-xl

    border border-white/20
    shadow-2xl
  "
      >
        <h2 className="text-3xl font-bold text-white mb-6">Create Account</h2>

        <form onSubmit={handleSignup}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="
    w-full mb-4 p-3 rounded-xl

    bg-white/10
    border border-white/20

    text-white
    placeholder:text-gray-300

    outline-none
    focus:border-purple-400
    focus:ring-2
    focus:ring-purple-500/30
  "
          />

          <input
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="
    w-full mb-4 p-3 rounded-xl

    bg-white/10
    border border-white/20

    text-white
    placeholder:text-gray-300

    outline-none
    focus:border-purple-400
    focus:ring-2
    focus:ring-purple-500/30
  "
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="
    w-full mb-4 p-3 rounded-xl

    bg-white/10
    border border-white/20

    text-white
    placeholder:text-gray-300

    outline-none
    focus:border-purple-400
    focus:ring-2
    focus:ring-purple-500/30
  "
          />

          <button
            className="
    w-full py-3 rounded-xl
    bg-linear-to-r from-blue-500 to-purple-500
    text-white font-semibold

    hover:scale-105
    hover:shadow-lg
    hover:shadow-purple-500/40

    transition-all duration-300
  "
          >
            Signup
          </button>
        </form>

        <p className="mt-4 text-gray-300 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-300 hover:text-white font-semibold"
          >
            Login
          </Link>
        </p>
        <p className="text-green-400 mt-4">{msg}</p>
      </div>
    </div>
  );
}

export default Signup;
