import { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH BOOKINGS ================= */

  const fetchBookings = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://glamstudio-ezax.onrender.com/api/bookings/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(response.data || []);
      setLoading(false);

    } catch (error) {

      console.log(error.response);
      setLoading(false);

    }

  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* ================= CANCEL BOOKING ================= */

  const handleCancel = async (bookingId) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `https://glamstudio-ezax.onrender.com/api/bookings/${bookingId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking cancelled successfully");

      fetchBookings();

    } catch (error) {

      alert(error.response?.data?.message || "Cancellation failed");

    }

  };

  /* ================= STATUS COLORS ================= */

  const getStatusColor = (status) => {

    if (status === "Pending")
      return "bg-yellow-100 text-yellow-700";

    if (status === "Confirmed")
      return "bg-green-100 text-green-700";

    if (status === "Cancelled")
      return "bg-red-100 text-red-700";

    return "bg-gray-100";

  };

  /* ================= LOADING ================= */

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading bookings...</p>
      </div>
    );

  }

  /* ================= UI ================= */

  return (

    <div className="min-h-screen bg-pink-50 py-16 px-6">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          My Bookings
        </h2>

        {bookings.length === 0 ? (

          <div className="bg-white p-8 rounded-xl shadow text-center">
            <p className="text-gray-500">
              You haven't made any bookings yet.
            </p>
          </div>

        ) : (

          <div className="space-y-6">

            {bookings.map((booking) => (

              <div
                key={booking._id}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
              >

                {/* HEADER */}

                <div className="flex justify-between items-center mb-4">

                  <div>

                    <p className="font-semibold text-gray-800">
                      {booking.date} at {booking.time}
                    </p>

                    <p className="text-sm text-gray-500">
                      Booking ID: {booking._id.slice(-6)}
                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>

                </div>

                {/* SERVICES */}

                <div className="mb-3">

                  <p className="text-gray-700 font-medium mb-1">
                    Services
                  </p>

                  <ul className="list-disc list-inside text-gray-600">

                    {booking.services?.map((service, index) => (

                      <li key={index}>
                        {service.name} – ₹{service.price}
                      </li>

                    ))}

                  </ul>

                </div>

                {/* ADDRESS */}

                <div className="mb-3">

                  <p className="text-gray-700 font-medium mb-1">
                    Address
                  </p>

                  <p className="text-gray-600 text-sm">

                    {booking.address?.building},{" "}
                    {booking.address?.area},{" "}
                    {booking.address?.city},{" "}
                    {booking.address?.district} –{" "}
                    {booking.address?.pincode}

                  </p>

                </div>

                {/* PRICE */}

                <div className="flex justify-between items-center mt-4">

                  <div className="font-semibold text-pink-600">
                    Total: ₹{booking.totalPrice}
                  </div>

                  {booking.status === "Pending" && (

                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Cancel Booking
                    </button>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default MyBookings;