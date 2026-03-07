import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials";
import Auth from "./pages/Auth";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import MyBookings from "./pages/MyBookings";
import AdminCalendar from "./pages/AdminCalendar";
import Success from "./pages/Success";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/success" element={<Success />} />

        {/* Protected Booking Route (Login Required) */}
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        {/* Admin Only Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
          }
        />

        <Route
        path="/admin-calendar"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminCalendar />
          </ProtectedRoute>
        }
      />
      </Routes>

      <Footer />
    </>
  );
}

export default App;