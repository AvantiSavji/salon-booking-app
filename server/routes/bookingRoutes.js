import express from "express";
import {
  createBooking,
  getAllBookings,
  getMyBookings,
  updateBookingStatus,
  getBookingStats,
  cancelBooking,
  getBookedSlots
} from "../controllers/bookingController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/", protect, adminOnly, getAllBookings);
router.get("/my", protect, getMyBookings);
router.get("/stats", protect, adminOnly, getBookingStats);
router.get("/slots/:date", protect, getBookedSlots);
router.put("/:id/status", protect, adminOnly, updateBookingStatus);
router.put("/:id/cancel", protect, cancelBooking);

export default router;