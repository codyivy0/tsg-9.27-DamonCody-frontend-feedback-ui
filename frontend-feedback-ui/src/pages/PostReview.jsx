import { useState } from 'react';
import { submitFeedback } from '../services/apiService';
 
export default function PostReview() {
  // Step 1: Set up state for form fields
  const [formData, setFormData] = useState({
    memberId: '',
    providerName: '',
    rating: '',
    comment: ''
  });
  // Step 2: Set up state for UI feedback
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
 
  // Step 3: Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
 
  // Step 4: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);
 
    try {
      // Prepare data for API
      const data = {
        memberId: formData.memberId.trim(),
        providerName: formData.providerName.trim(),
        rating: parseInt(formData.rating),
        comment: formData.comment.trim() || null
      };
 
      // Call API
      const response = await submitFeedback(data);
      // Success!
      setMessage({ 
        type: 'success', 
        text: `Feedback submitted! ID: ${response.id}` 
      });
      // Clear form
      setFormData({ memberId: '', providerName: '', rating: '', comment: '' });
    } catch (error) {
      // Error!
      setMessage({ 
        type: 'error', 
        text: error.message 
      });
    } finally {
      setLoading(false);
    }
  };
 
  return (
<div className="min-w-[500px]">
<h2 className="text-3xl font-bold text-white mb-6">
        Submit Provider Feedback
</h2>
 
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Member ID Field */}
<div>
<label className="block text-sm font-medium text-white mb-2">
            Member ID *
</label>
<input
            type="text"
            name="memberId"
            value={formData.memberId}
            onChange={handleChange}
            required
            maxLength={36}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., m-123456"
          />
</div>
 
        {/* Provider Name Field */}
<div>
<label className="block text-sm font-medium text-white mb-2">
            Provider Name *
</label>
<input
            type="text"
            name="providerName"
            value={formData.providerName}
            onChange={handleChange}
            required
            maxLength={80}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Dr. Smith"
          />
</div>
 
        {/* Rating Field */}
<div>
<label className="block text-sm font-medium text-white mb-2">
            Rating *
</label>
<select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
>
<option value="">Select rating</option>
<option value="1">1 - Poor</option>
<option value="2">2 - Fair</option>
<option value="3">3 - Good</option>
<option value="4">4 - Very Good</option>
<option value="5">5 - Excellent</option>
</select>
</div>
 
        {/* Comment Field */}
<div>
<label className="block text-sm font-medium text-white mb-2">
            Comment (Optional)
<span className="text-gray-400 text-xs ml-2">
              {formData.comment.length}/200
</span>
</label>
<textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            maxLength={200}
            rows={4}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Share your experience..."
          />
</div>
 
        {/* Submit Button */}
<button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
>
          {loading ? 'Submitting...' : 'Submit Feedback'}
</button>
</form>
 
      {/* Success/Error Messages */}
      {message.text && (
<div className={`mt-6 p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-900 text-green-200 border border-green-700' 
            : 'bg-red-900 text-red-200 border border-red-700'
        }`}>
          {message.text}
</div>
      )}
</div>
  );
}