import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";



function Navbar() {
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navLinkClass =
    "relative hover:text-pink-500 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-pink-500 after:transition-all after:duration-300 hover:after:w-full";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold text-pink-600"
        >
          Glam Studio
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className={navLinkClass}>Home</Link>
          <Link to="/services" className={navLinkClass}>Services</Link>
          <Link to="/gallery" className={navLinkClass}>Gallery</Link>
          <Link to="/about" className={navLinkClass}>About</Link>
          <Link to="/testimonials" className={navLinkClass}>Testimonials</Link>

          {user ? (
            <>
              <span className="text-pink-600 font-semibold">
                Hi, {user.name}
              </span>

              <Link to="/my-bookings" className={navLinkClass}>
              My Bookings
            </Link>

              {user.role === "admin" && (
                <Link to="/admin" className={navLinkClass}>
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className={navLinkClass}>
              Sign In
            </Link>
          )}

        <Link
          to={token ? "/booking" : "/login"}
          className="bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600 transition"
        >
          Book Now
        </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden flex flex-col gap-4 mt-4 text-gray-700 font-medium transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/services" onClick={() => setIsOpen(false)}>Services</Link>
        <Link to="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
        <Link to="/testimonials" onClick={() => setIsOpen(false)}>Testimonials</Link>

      {user ? (
        <>
          <span className="text-pink-600 font-semibold">
            Hi, {user.name}
          </span>

          <Link to="/my-bookings" className={navLinkClass}>
            My Bookings
          </Link>

          {user.role === "admin" && (
            <Link to="/admin" className={navLinkClass}>
              Admin
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 transition"
          >
            Logout
          </button>
        </>
      ) : (
        <Link to="/auth" className={navLinkClass}>
          Sign In
        </Link>
      )}

        <Link
          to="/booking"
          onClick={() => setIsOpen(false)}
          className="bg-pink-500 text-white px-5 py-2 rounded-full text-center"
        >
          Book Now
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;