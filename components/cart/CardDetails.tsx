import AccordianAction from "../sub-components/AccordianAction";
import FeedBack from "../sub-components/FeedBack";

//stripe
import axios from "axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState, useContext } from "react";

//Context
import { Context } from "../../Contexts/cartContext";
export default function CardDetails({
  price,
  cardLoading,
  setCardLoading,
}: any) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const { state, resetCart } = useContext(Context);
  const cardStyle = {
    style: {
      base: {
        color: "#252C32",
      },
      invalid: {},
    },
    hidePostalCode: true,
  };
  async function card_payment() {
    //create a payment intent on the server
    try {
      const { data: clientSecret } = await axios.post("/api/payment_intent", {
        amount: price * 100,
      });
      const cardElement: any = elements?.getElement(CardElement);
      const paymentMethodReq = await stripe?.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      const confirmCardPayment = await stripe?.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethodReq?.paymentMethod?.id,
        }
      );

      const { error, paymentIntent }: any = confirmCardPayment;
      if (error) {
        setError(error.message);
        setOpen(true);
        setCardLoading(false);
        return;
      }
      if (paymentIntent.status === "succeeded") {
        setError("");
        setOpen(true);
        resetCart();
      } else {
        setError("Transaction was not successful");
        setOpen(true);
      }
    } catch (err: any) {
      setError(
        state.cartProducts?.length
          ? err.message
          : "Please add products to the cart before trying to buy"
      );
      setOpen(true);
    }
    setCardLoading(false);
  }
  useEffect(() => {
    if (cardLoading) {
      card_payment();
    }
  }, [cardLoading]);
  const elements = useElements();
  const stripe = useStripe();

  return (
    <>
      <FeedBack
        feedBack={error.length ? error : "Transaction has succeeded"}
        open={open}
        setOpen={setOpen}
        success={error.length ? false : true}
      />
      <AccordianAction
        expand={error.length ? true : false}
        title="Credit Card Details"
      >
        <CardElement options={cardStyle} />
      </AccordianAction>
    </>
  );
}
