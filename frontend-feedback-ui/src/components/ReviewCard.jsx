export default function ReviewCard({ review, onClick }) {
  // Create star rating display
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-yellow-400' : 'text-gray-500'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div 
      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-6 py-4 cursor-pointer transition-all duration-200 hover:bg-slate-700 hover:border-slate-500 hover:shadow-lg"
      onClick={() => onClick && onClick(review)}
    >
      <div className="flex items-center justify-between w-full">
        {/* Member ID - Left */}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Member ID</span>
          <span className="text-white font-semibold truncate">{review.memberId}</span>
        </div>
        
        {/* Provider Name - Center */}
        <div className="flex flex-col min-w-0 flex-grow mx-8">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Provider</span>
          <span className="text-white font-semibold truncate">{review.providerName}</span>
        </div>
        
        {/* Rating - Right */}
        <div className="flex flex-col items-end min-w-0 flex-1">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Rating</span>
          <div className="flex items-center space-x-1">
            {renderStars(review.rating)}
            <span className="text-white ml-2 font-medium">
              {review.rating}/5
            </span>
          </div>
        </div>
        
        {/* Click indicator - Far Right */}
        <div className="ml-6">
          <span className="text-xs text-gray-500">
            →
          </span>
        </div>
      </div>
    </div>
  );
}