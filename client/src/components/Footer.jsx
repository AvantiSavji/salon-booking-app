import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-10">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-pink-500 mb-4">
            Glam Studio
          </h2>
          <p className="text-sm text-gray-400">
            Professional bridal and beauty services designed to make you feel
            confident, radiant, and unforgettable.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <div className="flex flex-col gap-2">
            <Link to="/" className="hover:text-pink-400">Home</Link>
            <Link to="/services" className="hover:text-pink-400">Services</Link>
            <Link to="/gallery" className="hover:text-pink-400">Gallery</Link>
            <Link to="/booking" className="hover:text-pink-400">Book Now</Link>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>
          <p className="text-sm">📍 Pune, Maharashtra</p>
          <p className="text-sm">📞 +91 98765 43210</p>
          <p className="text-sm">✉️ glamstudio@email.com</p>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Glam Studio. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;