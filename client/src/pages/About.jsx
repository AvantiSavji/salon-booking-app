import { Link } from "react-router-dom";
import studioImage from "../assets/about/studio.webp";

function About() {
  return (
    <section className="bg-pink-50 min-h-screen px-10 py-16">
      
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800">
            About Glam Studio
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Transforming beauty into confidence with professional artistry,
            passion, and years of experience.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">

          <div className="h-96 rounded-3xl overflow-hidden shadow-lg">
            <img
              src={studioImage}
              alt="Glam Studio"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Story
            </h3>
            <p className="text-gray-600 mb-4">
              Glam Studio was founded with a simple mission: to enhance natural
              beauty and make every client feel confident and unforgettable.
            </p>
            <p className="text-gray-600">
              With expertise in bridal makeup, hairstyling, and luxury skincare,
              we combine creativity with precision to deliver stunning results
              tailored to every individual.
            </p>
          </div>

        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 text-center mb-20">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h4 className="text-3xl font-bold text-pink-500">5+</h4>
            <p className="text-gray-600 mt-2">Years Experience</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h4 className="text-3xl font-bold text-pink-500">500+</h4>
            <p className="text-gray-600 mt-2">Happy Clients</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h4 className="text-3xl font-bold text-pink-500">100+</h4>
            <p className="text-gray-600 mt-2">Bridal Projects</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h4 className="text-3xl font-bold text-pink-500">4.9★</h4>
            <p className="text-gray-600 mt-2">Client Rating</p>
          </div>
        </div>

        {/* Unique Features */}
        <div className="mb-20">
          <h3 className="text-3xl font-semibold text-center text-gray-800 mb-12">
            Why Choose Us
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <h4 className="text-xl font-semibold text-pink-500 mb-3">
                Personalized Consultation
              </h4>
              <p className="text-gray-600">
                Every client receives a customized beauty plan tailored to
                their skin tone, preferences, and event type.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <h4 className="text-xl font-semibold text-pink-500 mb-3">
                Premium Products
              </h4>
              <p className="text-gray-600">
                We use only high-end, skin-safe products that ensure a flawless
                and long-lasting finish.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
              <h4 className="text-xl font-semibold text-pink-500 mb-3">
                On-Time Service
              </h4>
              <p className="text-gray-600">
                Professional scheduling and punctual service so you can relax
                and enjoy your special day.
              </p>
            </div>

          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Ready to experience the transformation?
          </h3>

          <Link
            to="/booking"
            className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition"
          >
            Book Your Appointment
          </Link>
        </div>

      </div>
    </section>
  );
}

export default About;