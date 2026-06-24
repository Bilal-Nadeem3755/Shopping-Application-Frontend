import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../utils/api";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(`/auth/reset-password/${token}`, {
        new_password: password,
      });

      setMsg("Password updated");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMsg(err.response?.data?.detail);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-95
    p-8
    rounded-3xl
    text-center

    bg-white/10
    backdrop-blur-xl

    border border-white/20
    shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
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

          <button className="w-full py-3 rounded-xl
    bg-linear-to-r from-blue-500 to-purple-500
    text-white font-semibold

    hover:scale-105
    hover:shadow-lg
    hover:shadow-purple-500/40

    transition-all duration-300">
            Reset
          </button>
        </form>

        <p className="text-green-400 mt-4">{msg}</p>
      </div>
    </div>
  );
}

export default ResetPassword;