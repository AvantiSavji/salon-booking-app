import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  format,
  parse,
  startOfWeek,
  getDay
} from "date-fns";

import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

function AdminCalendar() {

  const [events, setEvents] = useState([]);

  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    try {

      const res = await axios.get(
        "https://glamstudio-ezax.onrender.com/api/bookings",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const calendarEvents = res.data.map((booking) => {

        const startDateTime = new Date(
          `${booking.date} ${booking.time}`
        );

        return {
          title: `${booking.user?.name} - ${booking.services[0].name}`,
          start: startDateTime,
          end: new Date(startDateTime.getTime() + 60 * 60 * 1000),
          status: booking.status
        };

      });

      setEvents(calendarEvents);

    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const eventStyleGetter = (event) => {

    let backgroundColor = "#ec4899";

    if (event.status === "Confirmed")
      backgroundColor = "#22c55e";

    if (event.status === "Pending")
      backgroundColor = "#facc15";

    if (event.status === "Cancelled")
      backgroundColor = "#ef4444";

    return {
      style: {
        backgroundColor,
        borderRadius: "6px",
        border: "none",
        color: "white"
      }
    };
  };

  return (
    <div className="min-h-screen bg-pink-50 p-10">

      <h2 className="text-3xl font-bold mb-6">
        Booking Calendar
      </h2>

      <div className="bg-white rounded-xl shadow p-6">

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          eventPropGetter={eventStyleGetter}
        />

      </div>

    </div>
  );
}

export default AdminCalendar;