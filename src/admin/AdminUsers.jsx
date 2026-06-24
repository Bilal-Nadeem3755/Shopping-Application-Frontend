import { useEffect, useState } from "react";
import API from "../utils/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users/all-users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const makeAdmin = async (userId) => {
    try {
      await API.put(`/admin/make-admin/${userId}`);

      alert("User promoted successfully");

      fetchUsers();
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.detail);
    }
  };
  const removeAdmin = async (userId) => {
    try {
      await API.put(`/admin/remove-admin/${userId}`);

      alert("User promoted successfully");

      fetchUsers();
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.detail);
    }
  };

  return (
    <div className="pr-auto md:pr-64">
  <h1
    className="
      text-3xl
      md:text-4xl
      font-bold
      mb-8

      bg-linear-to-r
      from-cyan-400
      to-purple-400

      bg-clip-text
      text-transparent
    "
  >
    Users Management
  </h1>

  <div className="space-y-5">
    {users.map((user) => (
      <div
        key={user._id}
        className="
          bg-white/5
          backdrop-blur-xl

          border
          border-white/10

          rounded-3xl

          p-5
          md:p-6

          shadow-lg

          hover:border-purple-400/30
          hover:shadow-purple-500/10

          transition-all
          duration-300

          flex
          flex-col
          md:flex-row

          md:items-center
          md:justify-between

          gap-5
        "
      >
        {/* User Info */}
        <div>
          <h3 className="text-xl font-bold text-white">
            {user.name}
          </h3>

          <p className="text-gray-400 mt-1">
            {user.email}
          </p>

          <div className="mt-3">
            <span
              className={`
                px-4
                py-2
                rounded-full

                text-sm
                font-semibold

                ${
                  user.role === "admin"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-400/30"
                    : "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                }
              `}
            >
              {user.role === "admin" ? " Admin" : " User"}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div>
          {user.role !== "admin" ? (
            <button
              onClick={() => makeAdmin(user._id)}
              className="
                w-full
                md:w-auto

                px-6
                py-3

                rounded-2xl

                bg-linear-to-r
                from-cyan-500
                to-purple-500

                text-white
                font-semibold

                hover:scale-105
                hover:shadow-lg
                hover:shadow-purple-500/30

                transition-all
                duration-300
              "
            >
              Make Admin
            </button>
          ) : (
            <button
              onClick={() => removeAdmin(user._id)}
              className="
                w-full
                md:w-auto

                px-6
                py-3

                rounded-2xl

                bg-linear-to-r
                from-red-500
                to-pink-500

                text-white
                font-semibold

                hover:scale-105
                hover:shadow-lg
                hover:shadow-red-500/30

                transition-all
                duration-300
              "
            >
              Remove Admin
            </button>
          )}
        </div>
      </div>
    ))}
  </div>

  {users.length === 0 && (
    <div
      className="
        text-center
        py-16

        bg-white/5
        backdrop-blur-xl

        rounded-3xl
        border
        border-white/10
      "
    >
      <p className="text-gray-400 text-lg">
        No Users Found
      </p>
    </div>
  )}
</div>
)}

export default AdminUsers;