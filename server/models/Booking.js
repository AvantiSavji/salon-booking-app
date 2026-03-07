import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    services: [
      {
        name: String,
        price: Number,
      },
    ],
    date: String,
    time: String,
    address: {
      building: String,
      area: String,
      city: String,
      district: String,
      pincode: String,
    },
    totalPrice: Number,
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);