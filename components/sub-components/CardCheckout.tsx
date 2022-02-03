import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";

import Button from "@mui/material/Button";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("process.env.NEXT_PUBLIC_STRIPE_PUBLIC_API");
export default function CardCheckout({
  setCurrentStep,
  steps,
}: {
  setCurrentStep: any;
  steps: string[];
}) {
  async function handleSubmitPayment(event: any, elements: any, stripe: any) {
    event.preventDefault();

    if (!elements || !stripe) return;

    const cardElement = elements.getElement(CardElement);

    //Create payment Method with Strapi
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      //TODO:Show a feedback component from material ui that indicates the payment is a success
      console.log("Payment Success");
    }
  }
  return (
    <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {({ elements, stripe }) => (
          <form onSubmit={(evt) => handleSubmitPayment(evt, elements, stripe)}>
            <section className="py-4 my-2 ">
              <CardElement />
            </section>

            <section className="flex justify-between">
              <Button
                sx={{
                  color: "#FB784C",
                  ":hover": { color: "white", backgroundColor: "#FB784C" },
                  fontWeight: "bold",
                }}
                className="py-3 px-8 outline-none border-[1px] border-[#e5e5e5] rounded-sm "
                onClick={() => {
                  setCurrentStep(steps[0]);
                }}
              >
                Go back
              </Button>
              <section>
                <Button
                  sx={{
                    color: "#FB784C",
                    ":hover": { color: "white", backgroundColor: "#FB784C" },
                    fontWeight: "bold",
                  }}
                  variant="contained"
                  className="main-button"
                  disabled={!stripe}
                >
                  Pay $115.00
                </Button>
              </section>
            </section>
          </form>
        )}
      </ElementsConsumer>
    </Elements>
  );
}
