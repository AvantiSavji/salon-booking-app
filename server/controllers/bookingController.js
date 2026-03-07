import User from "../models/User.js";
import Booking from "../models/Booking.js";

/* ================= CREATE BOOKING ================= */

export const createBooking = async (req, res) => {
  try {

    const { date, time, services, address, totalPrice } = req.body;

    // Check if slot already booked
    const existingBooking = await Booking.findOne({
      date,
      time,
      status: { $ne: "Cancelled" }
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This time slot is already booked."
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      services,
      date,
      time,
      address,
      totalPrice,
      status: "Pending"
    });

    res.status(201).json(booking);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Booking failed" });
  }
};
/* ================= GET BOOKED SLOTS ================= */

export const getBookedSlots = async (req, res) => {
  try {

    const { date } = req.params;

    const bookings = await Booking.find({
      date,
      status: { $ne: "Cancelled" }
    });

    const bookedTimes = bookings.map(b => b.time);

    res.json(bookedTimes);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch slots" });
  }
};


/* ================= ADMIN: GET ALL BOOKINGS ================= */

export const getAllBookings = async (req, res) => {
  try {

    const bookings = await Booking.find()
      .populate("user", "name email");

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};


export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: "Status updated", booking });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id });
  res.json(bookings);
};

export const getBookingStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();

    const pendingBookings = await Booking.countDocuments({
      status: "Pending",
    });

    const confirmedBookings = await Booking.countDocuments({
      status: "Confirmed",
    });

    const revenueData = await Booking.aggregate([
      { $match: { status: "Confirmed" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    res.json({
      totalBookings,
      pendingBookings,
      confirmedBookings,
      totalRevenue,
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 🔒 Ensure booking belongs to logged-in user
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ❌ Only allow cancellation if Pending
    if (booking.status !== "Pending") {
      return res.status(400).json({
        message: "Only pending bookings can be cancelled",
      });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully" });

  } catch (error) {
    res.status(500).json({ message: "Cancellation failed" });
  }
};

