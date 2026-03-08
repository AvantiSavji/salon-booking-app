import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Admin() {

  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);

  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [expandedBooking, setExpandedBooking] = useState(null);

  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
      "https://glamstudio-ezax.onrender.com/api/bookings",        
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setBookings(res.data);

    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchStats = async () => {
    try {

      const res = await axios.get(
        "https://glamstudio-ezax.onrender.com/api/bookings/stats",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setStats(res.data);

    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchStats();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {

    try {

      await axios.put(
        `https://glamstudio-ezax.onrender.com/api/bookings/${bookingId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchBookings();
      fetchStats();

    } catch (error) {
      console.log(error.response);
    }
  };

  const resetFilters = () => {
    setStatusFilter("All");
    setDateFilter("");
    setSearchTerm("");
  };

  const filteredBookings = bookings.filter((booking) => {

    const statusMatch =
      statusFilter === "All" || booking.status === statusFilter;

    const dateMatch =
      !dateFilter || booking.date === dateFilter;

    const nameMatch =
      booking.user?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    return statusMatch && dateMatch && nameMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white py-16 px-6">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Admin Dashboard
        </h2>

        {/* Stats */}

        {stats && (
          <div className="grid md:grid-cols-4 gap-6 mb-10">

            <div className="bg-white shadow rounded-xl p-6">
              <p className="text-gray-500 text-sm">Total Bookings</p>
              <h3 className="text-2xl font-bold">{stats.totalBookings}</h3>
            </div>

            <div className="bg-yellow-50 shadow rounded-xl p-6">
              <p className="text-gray-500 text-sm">Pending</p>
              <h3 className="text-2xl font-bold text-yellow-600">
                {stats.pendingBookings}
              </h3>
            </div>

            <div className="bg-green-50 shadow rounded-xl p-6">
              <p className="text-gray-500 text-sm">Confirmed</p>
              <h3 className="text-2xl font-bold text-green-600">
                {stats.confirmedBookings}
              </h3>
            </div>

            <div className="bg-pink-50 shadow rounded-xl p-6">
              <p className="text-gray-500 text-sm">Revenue</p>
              <h3 className="text-2xl font-bold text-pink-600">
                ₹{stats.totalRevenue.toLocaleString()}
              </h3>
            </div>

          </div>
        )}

        {/* Filters */}

        <div className="bg-white shadow rounded-xl p-6 mb-10 flex flex-wrap gap-4">

          <input
            type="text"
            placeholder="Search customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          />

          <button
            onClick={resetFilters}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Reset
          </button>

          
        <Link
        to="/admin-calendar"
        className="bg-pink-500 text-white px-4 py-2 rounded-lg"
      >
        Calendar View
      </Link>

        </div>

        {/* Booking Cards */}

        {filteredBookings.map((booking) => (

          <div
            key={booking._id}
            className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-100"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="font-semibold text-gray-800">
                  {booking.date} at {booking.time}
                </p>

                <p className="text-gray-500 text-sm">
                  Customer: {booking.user?.name}
                </p>

              </div>

              <button
                onClick={() =>
                  setExpandedBooking(
                    expandedBooking === booking._id
                      ? null
                      : booking._id
                  )
                }
                className="text-pink-600 font-medium"
              >
                {expandedBooking === booking._id
                  ? "Hide Details"
                  : "View Details"}
              </button>

            </div>

            {expandedBooking === booking._id && (

              <div className="mt-6 border-t pt-4 grid md:grid-cols-2 gap-6">

                <div>

                  <p className="font-semibold mb-2">
                    Services
                  </p>

                  {booking.services.map((service, index) => (
                    <p key={index}>
                      {service.name} – ₹{service.price}
                    </p>
                  ))}

                  <p className="mt-3 font-semibold text-pink-600">
                    Total: ₹{booking.totalPrice}
                  </p>

                </div>

                <div>

                  <p className="font-semibold mb-2">
                    Address
                  </p>

                  <p>
                    {booking.address.building}
                  </p>

                  <p>
                    {booking.address.area}
                  </p>

                  <p>
                    {booking.address.city},{" "}
                    {booking.address.district}
                  </p>

                  <p>
                    {booking.address.pincode}
                  </p>

                </div>

              </div>

            )}

            <div className="mt-6 flex items-center gap-3">

              <span className="font-medium">
                Status:
              </span>

              <select
                value={booking.status}
                onChange={(e) =>
                  handleStatusChange(
                    booking._id,
                    e.target.value
                  )
                }
                className="border px-3 py-1 rounded-lg"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}

export default Admin;