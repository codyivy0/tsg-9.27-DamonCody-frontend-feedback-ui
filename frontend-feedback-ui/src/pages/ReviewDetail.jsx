import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFeedbackById } from "../services/apiService";

export default function ReviewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
        const data = await getFeedbackById(id);
        setReview(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReview();
    }
  }, [id]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-2xl ${
          index < rating ? "text-yellow-400" : "text-gray-500"
        }`}
      >
        ★
      </span>
    ));
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown date";
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <div className="text-white text-lg">Loading review...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-red-900 text-red-200 border border-red-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Error Loading Review</h2>
          <p>{error}</p>
          <button
            onClick={() => navigate("/reviews")}
            className="mt-4 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Reviews
          </button>
        </div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-2">
            Review Not Found
          </h2>
          <p className="text-gray-400 mb-4">
            The review you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/reviews")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Reviews
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Review Details</h1>
          <p className="text-gray-400">Review ID: {review.id}</p>
        </div>
        <button
          onClick={() => navigate("/reviews")}
          className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          ← Back to Reviews
        </button>
      </div>

      {/* Review Card */}
      <div className="bg-slate-800 border border-slate-600 rounded-lg overflow-hidden">
        {/* Main Info Section */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Member ID */}
            <div>
              <div className="block text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">
                Member ID
              </div>
              <p className="text-2xl font-bold text-white">{review.memberId}</p>
            </div>

            {/* Provider Name */}
            <div>
              <div className="block text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">
                Provider Name
              </div>
              <p className="text-2xl font-bold text-white">
                {review.providerName}
              </p>
            </div>
          </div>

          {/* Rating Section */}
          <div className="mb-8">
            <div className="block text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
              Rating
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {renderStars(review.rating)}
              </div>
              <span className="text-3xl font-bold text-white">
                {review.rating}/5
              </span>
            </div>
          </div>

          {/* Timestamp */}
          {review.submittedAt && (
            <div className="mb-8">
              <div className="block text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">
                Submitted
              </div>
              <p className="text-lg text-gray-300">
                {formatDate(review.submittedAt)}
              </p>
            </div>
          )}
        </div>

        {/* Comment Section */}
        {review.comment && (
          <div className="border-t border-slate-600 bg-slate-700/50 p-8">
            <div className="block text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
              Comment
            </div>
            <div className="bg-slate-800 border border-slate-600 rounded-lg p-6">
              <p className="text-white text-lg leading-relaxed whitespace-pre-wrap">
                {review.comment}
              </p>
            </div>
          </div>
        )}

        {!review.comment && (
          <div className="border-t border-slate-600 bg-slate-700/50 p-8">
            <div className="block text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
              Comment
            </div>
            <p className="text-gray-500 italic">No comment provided</p>
          </div>
        )}
      </div>
    </div>
  );
}
