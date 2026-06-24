import { useEffect, useState } from "react";
import API from "../utils/api";

function ReturnsAdmin() {
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      const res = await API.get("/returns");
      setReturns(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const approveReturn = async (id) => {
    try {
      await API.put(`/returns/admin/approve/${id}`);
      fetchReturns();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectReturn = async (id) => {
    try {
      await API.put(`/returns/admin/reject/${id}`);
      fetchReturns();
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-300 border border-green-400/30";

      case "rejected":
        return "bg-red-500/20 text-red-300 border border-red-400/30";

      default:
        return "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30";
    }
  };

  return (
    <div className="md:pr-64">
      {/* PAGE TITLE */}
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
        Return Requests
      </h1>

      {/* EMPTY STATE */}
      {returns.length === 0 ? (
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
            No Return Requests Found
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {returns.map((r) => (
            <div
              key={r._id}
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
              "
            >
              {/* Reason */}
              <div className="mb-4">
                <h3 className="text-sm text-gray-400 mb-1">
                  Return Reason
                </h3>

                <p className="text-white text-base md:text-lg">
                  {r.reason}
                </p>
              </div>

              {/* Status */}
              <div className="mb-5">
                <span
                  className={`
                    inline-block
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-semibold
                    ${getStatusStyle(r.status)}
                  `}
                >
                  {r.status}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => approveReturn(r._id)}
                  className="
                    px-5
                    py-3

                    rounded-xl

                    bg-green-500

                    text-white
                    font-medium

                    hover:scale-105
                    hover:shadow-lg
                    hover:shadow-green-500/30

                    transition-all
                    duration-300
                  "
                >
                  ✓ Approve
                </button>

                <button
                  onClick={() => rejectReturn(r._id)}
                  className="
                    px-5
                    py-3

                    rounded-xl

                    bg-red-500

                    text-white
                    font-medium

                    hover:scale-105
                    hover:shadow-lg
                    hover:shadow-red-500/30

                    transition-all
                    duration-300
                  "
                >
                  ✕ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReturnsAdmin;

export const getReturns = () =>
  API.get("/returns").then((res) => res.data);

export const approveReturn = (id) =>
  API.put(`/returns/${id}/approve`);

export const rejectReturn = (id) =>
  API.put(`/returns/${id}/reject`);