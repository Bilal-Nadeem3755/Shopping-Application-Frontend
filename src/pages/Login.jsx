import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();

  // ✅ FORM STATE ADD
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  // ✅ HANDLE CHANGE ADD
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("username", form.username);
      formData.append("password", form.password);

      const res = await API.post("/auth/login", formData);

      const token = res.data.access_token;

      localStorage.setItem("token", res.data.access_token);

      const decoded = jwtDecode(token);
      const role = decoded.role;

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.detail);
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
        <h2 className="text-3xl font-bold text-white mb-6">Login</h2>

        <form onSubmit={handleLogin}>
          <input
            name="username"
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
            Login
          </button>
        </form>

        <div className="mt-4 text-sm">
          <Link to="/forgot-password" className="text-gray-300">
            Forgot Password?
          </Link>
        </div>
        <h3>OR</h3>

        <p className="text-gray-300 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-gray-300">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
