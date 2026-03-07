import ServiceCard from "../components/ServiceCard";
import bridal from "../assets/services/bridal.jpg";
import hairstyle from "../assets/services/hairstyle.png";
import facial from "../assets/services/facial.jpg";
import manicure from "../assets/services/manicure.jpg";
import waxing from "../assets/services/waxing.jpg";
import threading from "../assets/services/threading.jpg";

function Services() {

const services = [
  {
    title: "Bridal Makeup",
    description: "Complete bridal HD and long-lasting glow.",
    price: "₹15,000",
    image: bridal
  },
  {
    title: "Hairstyling",
    description: "Elegant hairstyles for weddings and events.",
    price: "₹3,000",
    image: hairstyle
  },
  {
    title: "Facials",
    description: "Professional skin treatments for radiant skin.",
    price: "₹2,000",
    image: facial
  },
  {
    title: "Manicure & Pedicure",
    description: "Luxury nail care and polish.",
    price: "₹1,500",
    image: manicure
  },
  {
    title: "Waxing",
    description: "Smooth and flawless skin treatment.",
    price: "₹800",
    image: waxing
  },
  {
    title: "Threading",
    description: "Perfect eyebrow shaping.",
    price: "₹300",
    image: threading
  }
];
  return (
    <section className="min-h-screen bg-pink-50 px-10 py-16">
      <div className="max-w-6xl mx-auto">
        
        <h2 className="text-4xl font-bold text-center text-gray-800">
          Our Services
        </h2>

        <p className="text-center text-gray-600 mt-4 mb-12">
          Beauty services crafted to enhance your confidence.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              price={service.price}
              image={service.image}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;