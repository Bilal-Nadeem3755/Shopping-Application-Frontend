
import { useEffect, useState } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <h1
          className="
            text-4xl
            font-bold
            mb-8
            bg-linear-to-r
            from-cyan-400
            to-purple-400
            bg-clip-text
            text-transparent
          "
        >
          My Profile
        </h1>

        <div
          className="
            text-center
            py-20
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
          "
        >
          <p className="text-gray-400 text-lg">
            Please Login First
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        max-w-5xl
        mx-auto
        px-4
        py-6
        md:p-6
      "
    >
      <h1
        className="
          text-4xl
          font-bold
          mb-8
          bg-linear-to-r
          from-cyan-400
          to-purple-400
          bg-clip-text
          text-transparent
        "
      >
        My Profile
      </h1>

      <div
        className="
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
          shadow-xl
          hover:border-cyan-500/30
          transition-all
          duration-300
        "
      >
        <div
          className="
            flex
            flex-col
            md:flex-row
            gap-6
            items-center
            md:items-start
          "
        >
          {/* Avatar */}
          <div
            className="
              w-28
              h-28
              rounded-full
              bg-linear-to-br
              from-cyan-500
              to-purple-500
              flex
              items-center
              justify-center
              text-4xl
              font-bold
              text-white
              shadow-lg
            "
          >
            {user.name?.charAt(0).toUpperCase()}
          </div>

          {/* User Info */}
          <div className="flex-1 w-full">
            <h2
              className="
                text-center
                md:text-left
                text-2xl
                md:text-3xl
                font-bold
                text-white
              "
            >
              {user.name}
            </h2>

            <p
              className="
                text-center
                md:text-left
                text-gray-400
                mt-2
                break-all
              "
            >
              {user.email}
            </p>

            <div
              className="
                mt-6
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
              "
            >
              <div className="bg-black/20 rounded-2xl p-4">
                <p className="text-gray-400 text-sm">
                  Full Name
                </p>

                <p
                  className="
                    text-white
                    font-semibold
                    mt-1
                    text-sm
                    md:text-base
                    wrap-break-words
                  "
                >
                  {user.name}
                </p>
              </div>

              <div className="bg-black/20 rounded-2xl p-4">
                <p className="text-gray-400 text-sm">
                  Email Address
                </p>

                <p
                  className="
                    text-white
                    font-semibold
                    mt-1
                    text-sm
                    md:text-base
                    break-all
                  "
                >
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div
          className="
            mt-8
            flex
            flex-col
            sm:flex-row
            gap-4
          "
        >
          <Link
            to="/orders"
            className="
              w-full
              sm:w-auto
              px-8
              py-4
              rounded-2xl
              bg-linear-to-r
              from-cyan-500
              to-purple-500
              text-white
              font-semibold
              text-center
              hover:scale-105
              hover:shadow-lg
              hover:shadow-purple-500/30
              transition-all
              duration-300
            "
          >
            My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;