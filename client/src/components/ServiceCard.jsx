import { useNavigate } from "react-router-dom";

export default function ServiceCard({ title, description, price, image }) {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate("/booking", {
      state: { selectedService: title }
    });
  };

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition duration-300">
      
      <img 
        src={image} 
        alt={title}
        className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
      />

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800">
          {title}
        </h3>

        <p className="text-gray-600 mt-2">
          {description}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-pink-600 font-bold">{price}</span>

          <button
            onClick={handleBook}
            className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition"
          >
            Book
          </button>
        </div>
      </div>

    </div>
  );
}