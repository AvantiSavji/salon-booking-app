import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Booking() {
  const location = useLocation();
  const preSelected = location.state?.selectedService;

  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedServices, setSelectedServices] = useState(preSelected ? [preSelected] : []);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [address, setAddress] = useState({
    building: "",
    area: "",
    city: "",
    district: "",
    pincode: "",
  });

  const serviceOptions = [
    { name: "Bridal Makeup", price: 15000 },
    { name: "Hairstyling", price: 3000 },
    { name: "Facials", price: 2000 },
    { name: "Manicure & Pedicure", price: 1500 },
    { name: "Waxing", price: 800 },
    { name: "Threading", price: 300 },
  ];

  const timeSlots = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM", "07:00 PM"];

  const totalPrice = selectedServices.reduce((total, serviceName) => {
    const service = serviceOptions.find((item) => item.name === serviceName);
    return total + (service ? service.price : 0);
  }, 0);

  const today = new Date().toISOString().split("T")[0];
  const isFormComplete = selectedServices.length > 0 && selectedDate && selectedTime && address.building && address.city && address.pincode;

  /* ================= FETCH BOOKED SLOTS ================= */
  const fetchBookedSlots = async (date) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/bookings/slots/${date}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookedSlots(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (serviceName) => {
    if (selectedServices.includes(serviceName)) {
      setSelectedServices(selectedServices.filter((item) => item !== serviceName));
    } else {
      setSelectedServices([...selectedServices, serviceName]);
    }
  };

  /* ================= PAYMENT ================= */
const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      // 1. Prepare the data
      const servicesToSend = selectedServices.map((serviceName) => ({
        name: serviceOptions.find((item) => item.name === serviceName).name,
        price: serviceOptions.find((item) => item.name === serviceName).price,
      }));

      const bookingData = {
        services: servicesToSend,
        date: selectedDate,
        time: selectedTime,
        address,
        totalPrice,
      };

      // 2. Save the booking to MongoDB FIRST
      // This ensures you have a record even if they close the browser
      const bookingResponse = await axios.post(
        "http://localhost:5000/api/bookings",
        bookingData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Booking saved:", bookingResponse.data);

      // 3. Get the Stripe URL
      const paymentResponse = await axios.post(
        "http://localhost:5000/api/payments/create-checkout-session",
        { amount: totalPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 4. Redirect to Stripe
      if (paymentResponse.data && paymentResponse.data.url) {
        window.location.href = paymentResponse.data.url;
      } else {
        throw new Error("No checkout URL received");
      }

    } catch (error) {
      console.error("Process failed:", error);
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-pink-50 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Book Your Glam Session</h2>

        {/* SERVICES */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Select Services</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {serviceOptions.map((service) => (
              <label
                key={service.name}
                className={`flex justify-between items-center border rounded-xl p-4 cursor-pointer transition ${
                  selectedServices.includes(service.name) ? "border-pink-500 bg-pink-50" : "hover:border-pink-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service.name)}
                    onChange={() => handleCheckboxChange(service.name)}
                    className="accent-pink-500"
                  />
                  <span>{service.name}</span>
                </div>
                <span className="text-pink-600 font-medium">₹{service.price.toLocaleString()}</span>
              </label>
            ))}
          </div>
        </div>

        {/* DATE & TIME */}
        <input
          type="date"
          min={today}
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            fetchBookedSlots(e.target.value);
          }}
          className="w-full border p-3 rounded-xl mb-8"
        />

        <div className="flex flex-wrap gap-3 mb-10">
          {timeSlots.map((time) => {
            const isBooked = bookedSlots.includes(time);
            return (
              <button
                key={time}
                type="button"
                disabled={isBooked}
                onClick={() => setSelectedTime(time)}
                className={`px-5 py-2 rounded-full border transition ${
                  isBooked ? "bg-gray-200 text-gray-400 cursor-not-allowed" : selectedTime === time ? "bg-pink-500 text-white" : "hover:bg-pink-100"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>

        {/* ADDRESS */}
        <div className="mb-10 space-y-4">
          <input type="text" placeholder="Building / Flat Number" value={address.building} onChange={(e) => setAddress({ ...address, building: e.target.value })} className="w-full border p-3 rounded-xl" />
          <input type="text" placeholder="Area / Locality" value={address.area} onChange={(e) => setAddress({ ...address, area: e.target.value })} className="w-full border p-3 rounded-xl" />
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="border p-3 rounded-xl" />
            <input type="text" placeholder="District" value={address.district} onChange={(e) => setAddress({ ...address, district: e.target.value })} className="border p-3 rounded-xl" />
          </div>
          <input type="text" placeholder="Pin Code" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} className="w-full border p-3 rounded-xl" />
        </div>

        <div className="text-right text-lg font-semibold mb-6">
          Total: <span className="text-pink-600 ml-2">₹{totalPrice.toLocaleString()}</span>
        </div>

        <button
          disabled={!isFormComplete}
          onClick={handlePayment}
          className={`w-full py-3 rounded-full transition ${!isFormComplete ? "bg-gray-300 cursor-not-allowed" : "bg-pink-500 text-white hover:bg-pink-600"}`}
        >
          Confirm & Pay
        </button>
      </div>
    </div>
  );
}

export default Booking;