import { useEffect, useState } from "react";
import API from "../utils/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    total_orders: 0,
    total_products: 0,
    total_users: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="pl-1 pr-1 md:pr-64">
      <div className="mb-8">
       <h1
className="
text-5xl
font-extrabold

bg-linear-to-r
from-cyan-400
to-purple-400

bg-clip-text
text-transparent
"
>
Admin Dashboard
</h1>

        <p className="text-gray-500 mt-2">
          Manage products, orders, users, reviews and returns.
        </p>
      </div>

      <div className="from-cyan-600
via-blue-700
to-purple-700 rounded-3xl
shadow-2xl text-white p-8 mb-8 ">
        <h2 className="text-3xl font-bold">Welcome Admin</h2>

        <p className="mt-2 text--100">
          Monitor orders, products, users and store activity.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Orders */}
        <div className="
bg-white/10
backdrop-blur-xl

border
border-white/10

rounded-3xl
p-6

shadow-xl

hover:scale-105
hover:shadow-purple-500/20

transition-all
duration-300
">
          <h3 className="text-lg font-medium">Total Orders</h3>

          <p className="text-5xl font-bold mt-4">{stats.total_orders}</p>
        </div>

        {/* Products */}
        <div className="
bg-white/10
backdrop-blur-xl

border
border-white/10

rounded-3xl
p-6

shadow-xl

hover:scale-105
hover:shadow-purple-500/20

transition-all
duration-300
">
          <h3 className="text-lg font-medium">Total Products</h3>

          <p className="text-5xl font-bold mt-4">{stats.total_products}</p>
        </div>

        {/* Users */}
        <div className="
bg-white/10
backdrop-blur-xl

border
border-white/10

rounded-3xl
p-6

shadow-xl

hover:scale-105
hover:shadow-purple-500/20

transition-all
duration-300
">
          <h3 className="text-lg font-medium">Total Users</h3>

          <p className="text-5xl font-bold mt-4">{stats.total_users}</p>
        </div>
      </div>

    
    </div>
  );
}

export default AdminDashboard;
