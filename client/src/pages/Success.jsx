import { useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

function Success() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  useEffect(() => {

    if (!sessionId) {
      navigate("/");
    }

  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">

      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md">

        <div className="text-green-500 text-6xl mb-4">
          ✓
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Payment Successful
        </h2>

        <p className="text-gray-600 mb-6">
          Your booking has been confirmed.  
          Thank you for choosing Glam Studio 💄
        </p>

        <Link
          to="/my-bookings"
          className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition"
        >
          View My Bookings
        </Link>

      </div>

    </div>
  );
}

export default Success;