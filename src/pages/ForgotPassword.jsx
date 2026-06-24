import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.detail);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
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
        <h2 className="text-3xl font-bold text-white mb-6">Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 rounded-xl

    bg-white/10
    border border-white/20

    text-white
    placeholder:text-gray-300

    outline-none
    focus:border-purple-400
    focus:ring-2
    focus:ring-purple-500/30"
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
            Send Verification Link
          </button>
          <p className="pt-2.5 text-lg pb-1">OR</p>

          <Link
            to="/login"
            className="text-purple-300 hover:text-white font-semibold"
          >
            login
          </Link>
        </form>

        <p className="mt-3 text-green-600">{msg}</p>
      </div>
    </div>
  );
}

export default ForgotPassword;
