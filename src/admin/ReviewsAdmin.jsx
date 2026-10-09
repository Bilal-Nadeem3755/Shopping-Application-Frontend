import { useEffect, useState } from "react";
import API from "../utils/api";

function ReviewsAdmin() {
  const [reviews, setReviews] = useState([]);

  // Fetch pending reviews when the component mounts.
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await API.get("/reviews/pending");
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch pending reviews:", err);
      }
    };

    loadReviews();
  }, []);

  // Refresh reviews after approving or rejecting one.
  const refreshReviews = async () => {
    try {
      const res = await API.get("/reviews/pending");
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to refresh pending reviews:", err);
    }
  };

  const approveReview = async (id) => {
    try {
      await API.put(`/reviews/${id}/approve`);
      await refreshReviews();
    } catch (err) {
      console.error("Failed to approve review:", err);
    }
  };

  const rejectReview = async (id) => {
    try {
      await API.put(`/reviews/${id}/reject`);
      await refreshReviews();
    } catch (err) {
      console.error("Failed to reject review:", err);
    }
  };

  return (
    <div className="pr-auto md:pr-64">
      {/* Heading */}
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
        Review Moderation
      </h1>

      {/* Empty State */}
      {reviews.length === 0 ? (
        <div
          className="
            text-center
            py-16
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
          "
        >
          <p className="text-gray-400 text-lg">
            No Pending Reviews Found
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="
                bg-white/5
                backdrop-blur-xl
                border
                border-white/10
                rounded-3xl
                p-6
                shadow-xl
                hover:border-cyan-500/30
                hover:shadow-cyan-500/10
                transition-all
                duration-300
              "
            >
              {/* Review Header */}
              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-4
                  mb-4
                "
              >
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    Review #{r._id.slice(-6)}
                  </h3>

                  <p className="text-gray-500 text-sm break-all">
                    {r._id}
                  </p>
                </div>

                <span
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-yellow-500/20
                    text-yellow-300
                    text-sm
                    font-medium
                  "
                >
                  Pending Review
                </span>
              </div>

              {/* Review Content */}
              <div
                className="
                  bg-black/20
                  rounded-2xl
                  p-4
                  border
                  border-white/5
                "
              >
                <p className="text-gray-200 leading-7">
                  {r.comment}
                </p>
              </div>

              {/* Actions */}
              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-3
                  mt-5
                "
              >
                <button
                  type="button"
                  onClick={() => approveReview(r._id)}
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
                  ✓ Approve Review
                </button>

                <button
                  type="button"
                  onClick={() => rejectReview(r._id)}
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
                  ✕ Reject Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewsAdmin;