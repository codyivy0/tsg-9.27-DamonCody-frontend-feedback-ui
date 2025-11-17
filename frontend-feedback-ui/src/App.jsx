import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import GetReviews from "./pages/GetReviews";
import PostReview from "./pages/PostReview";
import ReviewDetail from "./pages/ReviewDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/submit-review" replace />} />

          <Route path="submit-review" element={<PostReview />} />

          <Route path="reviews" element={<GetReviews />} />

          <Route path="reviews/:id" element={<ReviewDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
