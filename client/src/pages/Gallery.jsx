import { useState } from "react";
import bridal1 from "../assets/services/bridal1.jpg";
import hairstyle1 from "../assets/services/hairstyle1.jpg"
import skin from "../assets/services/skin.webp"
import bridal2 from "../assets/services/bridal2.webp";
import curl from "../assets/services/curl.jpg";
import skin1 from "../assets/services/skin1.jpg"

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: 1,
      category: "Bridal",
      title: "Royal Bridal Look",
      src: bridal1
    },
    {
      id: 2,
      category: "Hairstyle",
      title: "Elegant Wedding Bun",
      src: hairstyle1
    },
    {
      id: 3,
      category: "Facial",
      title: "Glowing Skin Treatment",
      src: skin
    },
    {
      id: 4,
      category: "Bridal",
      title: "Traditional Indian Bride",
      src: bridal2
    },
    {
      id: 5,
      category: "Hairstyle",
      title: "Soft Curl Styling",
      src: curl
    },
    {
      id: 6,
      category: "Facial",
      title: "Luxury Skin Care",
      src: skin1
    }
  ];

  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <section className="min-h-screen bg-pink-50 px-10 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Gallery
        </h2>

        {/* Category Filters */}
        <div className="flex justify-center gap-6 mb-10 flex-wrap">
          {["All", "Bridal", "Hairstyle", "Facial"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full transition ${
                selectedCategory === category
                  ? "bg-pink-500 text-white"
                  : "bg-white text-gray-700 shadow"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-2xl cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Caption Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition duration-300">
                <h3 className="text-white text-lg font-semibold">
                  {image.title}
                </h3>
                <p className="text-pink-300 text-sm">
                  {image.category}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="rounded-2xl"
            />

            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-semibold">
                {selectedImage.title}
              </h3>
              <p className="text-pink-300">
                {selectedImage.category}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white text-2xl font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;