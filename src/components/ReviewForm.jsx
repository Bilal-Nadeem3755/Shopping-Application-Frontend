import { useState } from "react";
import { FaStar } from "react-icons/fa";
import API from "../utils/api";

function ReviewForm({ productId, onDone }) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/reviews/",
        {
          product_id: productId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Review submitted successfully");

      onDone?.();
    } catch (err) {
      console.log(err);

      alert(
        err?.response?.data?.detail ||
          "Failed to submit review"
      );
    }
  };

  return (
    <div className="w-full">
      {/* Stars */}
      <div className="flex gap-2 mb-5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            className="transition-all duration-200 hover:scale-125"
          >
            <FaStar
              size={32}
              className={
                star <= (hover || rating)
                  ? "text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                  : "text-gray-600"
              }
            />
          </button>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        rows={4}
        className="
          w-full
          rounded-2xl
          bg-black/20
          border
          border-white/10
          p-4
          text-white
          placeholder:text-gray-500
          focus:outline-none
          focus:border-cyan-400
          resize-none
        "
      />

      {/* Button */}
      <button
        onClick={submitReview}
        className="
          w-full
          mt-4
          py-3
          rounded-2xl
          font-semibold
          text-white

          bg-linear-to-r
          from-cyan-500
          via-blue-500
          to-purple-500

          hover:scale-[1.02]
          hover:shadow-lg
          hover:shadow-purple-500/30

          transition-all
          duration-300
        "
      >
        Submit Review
      </button>
    </div>
  );
}

export default ReviewForm;