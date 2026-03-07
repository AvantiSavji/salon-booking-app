import { Link } from "react-router-dom";
import hero from "../assets/hero.png";

function Home() {
  return (
    <section className="min-h-screen bg-pink-50 flex items-center px-10">
      {/* Grid Container */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div>
          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            Enhancing Your Natural Beauty
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Professional bridal and party makeup services designed to make you
            feel confident, radiant, and unforgettable.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/booking"
              className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition"
            >
              Book Now
            </Link>

            <Link
              to="/services"
              className="border border-pink-500 text-pink-500 px-6 py-3 rounded-full hover:bg-pink-100 transition"
            >
              View Services
            </Link>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="relative rounded-3xl overflow-hidden h-[420px] shadow-xl">
          <img
            src={hero}
            alt="Glam Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/40 to-transparent"></div>
        </div> 
        {/* Closed the Right Side div */}

      </div> 
      {/* Closed the Grid Container div */}
    </section>
  );
}

export default Home;