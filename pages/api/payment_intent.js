import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRV_KEY);

const call = async (req, res) => {
  if (req.method === "POST") {
    try {
      //For production-ready applications we recommend not using the
      // amount directly from the client without verifying it first. This is to
      // prevent bad actors from changing the total amount on the client before
      // it gets sent to the server. A good approach is to send the quantity of
      // a uniquely identifiable product and calculate the total price server-side.
      // Then, you would only fulfill orders using the quantity you charged for.
      const { amount } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
      });
      res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.Header("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};

export default call;
