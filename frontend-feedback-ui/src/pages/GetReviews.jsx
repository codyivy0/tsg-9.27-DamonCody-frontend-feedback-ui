import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { getAllFeedback } from "../services/apiService";
import ReviewCard from "../components/ReviewCard";

export default function GetReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getAllFeedback();
                console.log('Fetched reviews:', data);
                setReviews(data);
            } catch (err) {
                console.error('Error fetching reviews:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const handleReviewClick = (review) => {
        // Navigate to the review detail page
        navigate(`/reviews/${review.id}`);
    };

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center py-12">
                <div className="text-white text-lg">Loading reviews...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full">
                <div className="bg-red-900 text-red-200 border border-red-700 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-2">Error Loading Reviews</h2>
                    <p className="mb-4">{error}</p>
                    <button
                        onClick={() => globalThis.location.reload()}
                        className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                    Provider Reviews
                </h2>
                <p className="text-gray-400">
                    Found {reviews.length} review{reviews.length === 1 ? '' : 's'}
                </p>
            </div>

            {/* Table Header */}
            {reviews.length > 0 && (
                <div className="w-full bg-slate-700 border border-slate-600 rounded-t-lg px-6 py-3 mb-2">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex-1">
                            <span className="text-xs text-gray-300 font-medium uppercase tracking-wide">Member ID</span>
                        </div>
                        <div className="flex-2 mx-8">
                            <span className="text-xs text-gray-300 font-medium uppercase tracking-wide">Provider</span>
                        </div>
                        <div className="flex-1 text-right">
                            <span className="text-xs text-gray-300 font-medium uppercase tracking-wide">Rating</span>
                        </div>
                        <div className="ml-6 w-4">
                            {/* Space for arrow */}
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews List */}
            {reviews.length > 0 ? (
                <div className="space-y-1">
                    {reviews.map((review, index) => (
                        <div key={review.id} className={index === reviews.length - 1 ? "rounded-b-lg overflow-hidden" : ""}>
                            <ReviewCard 
                                review={review}
                                onClick={handleReviewClick}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full text-center py-12 bg-slate-800 border border-slate-600 rounded-lg">
                    <p className="text-gray-400 text-lg">
                        No reviews found
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        Try submitting some feedback first
                    </p>
                </div>
            )}
        </div>
    );
}