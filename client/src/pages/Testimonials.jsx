import avatar1 from "../assets/testimonials/avatar1.jpg";
import avatar2 from "../assets/testimonials/avatar2.jpg";
import avatar3 from "../assets/testimonials/avatar3.jpg";
import avatar4 from "../assets/testimonials/avatar4.jpg";
import avatar5 from "../assets/testimonials/avatar5.avif";
import avatar6 from "../assets/testimonials/avatar6.jpg";

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      review:
        "Absolutely loved my bridal look! The makeup lasted all day and made me feel so confident.",
      avatar: avatar1,
    },
    {
      id: 2,
      name: "Neha Patel",
      rating: 5,
      review:
        "Professional, punctual, and incredibly talented. My wedding hairstyle was perfect!",
      avatar: avatar2,
    },
    {
      id: 3,
      name: "Riya Mehta",
      rating: 4,
      review:
        "Amazing experience. The facial treatment left my skin glowing for weeks.",
      avatar: avatar3,
    },
    {
      id: 4,
      name: "Anjali Verma",
      rating: 5,
      review:
        "The team is very friendly and uses high-quality products. Highly recommended!",
      avatar: avatar4,
    },
    {
      id: 5,
      name: "Sneha Kulkarni",
      rating: 4,
      review:
        "Very professional service and great attention to detail. Loved the results!",
      avatar: avatar5,
    },
    {
      id: 6,
      name: "Kavya Desai",
      rating: 5,
      review:
        "Best bridal makeup artist in town! Everyone complimented my look.",
      avatar: avatar6,
    },
  ];

  return (
    <section className="min-h-screen bg-pink-50 px-10 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-gray-600">
            Real experiences from our happy clients.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              {/* Top Section: Avatar + Name */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-pink-500"
                />

                <div>
                  <h4 className="font-semibold text-gray-800">
                    {item.name}
                  </h4>

                  <div className="flex">
                    {[...Array(item.rating)].map((_, index) => (
                      <span
                        key={index}
                        className="text-yellow-400 text-sm"
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Review */}
              <p className="text-gray-600 text-sm leading-relaxed">
                “{item.review}”
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;