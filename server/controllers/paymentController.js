import Stripe from "stripe";

export const createCheckoutSession = async (req, res) => {
  try {
    // 1. Validation
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not defined");
    }

    // 2. Initialization
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { amount } = req.body;

    // 3. Create Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Salon Booking",
            },
            unit_amount: amount * 100, // Amount in paise
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/booking",
    });

    // 4. Send the URL back to the frontend
    res.json({ url: session.url });

  } catch (error) {
    console.error("Stripe Session Error:", error.message);
    res.status(500).json({ message: "Stripe session failed", error: error.message });
  }
};

export const verifySession = async (req, res) => {
  const { sessionId } = req.body;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status === "paid") {
    // 1. Find the booking in MongoDB by session ID or User ID
    // 2. Update status from "pending" to "confirmed"
    res.json({ status: "success" });
  } else {
    res.status(400).json({ message: "Payment not completed" });
  }
};