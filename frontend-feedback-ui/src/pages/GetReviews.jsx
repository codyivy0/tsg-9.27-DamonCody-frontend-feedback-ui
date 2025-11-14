import { useState, useEffect } from "react"
import { getFeedbackByMemberId } from "../services/apiService";

export default function GetReviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const data = await getFeedbackByMemberId('');
            console.log(data);
            setReviews (data);
            
    };

    fetchReviews();
},  []);

return (
    <div>
    <p className='text-stone-50 flex items-center justify-center'>Number of reviews: {reviews.length}</p>

    {reviews.map((review) => (
    <div key={review.id} className='flex gap-8 items-center justify-center'>
    <p>{review.memberId}</p>
    <p>{review.providerName}</p>
    <p>Rating: {review.rating}/5</p>
    <p>{review.comment}</p>
    </div>
))}
</div>

);
}