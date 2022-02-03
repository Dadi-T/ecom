//Components
import Header from "../components/Header";
import CartInfo from "../components/cart/CartInfo";
import CartProducts from "../components/cart/CartProducts";
import ShippingDetails from "../components/cart/ShippingDetails";
import CardDetails from "../components/cart/CardDetails";
import BuyWithTokens from "../components/cart/BuyWithTokens";
//firebase auth
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDocumentByID } from "../firebase/users";
//react
import { useEffect, useState, useContext } from "react";

//web3
import web3 from "../ethereum/web3";
import ecommerce from "../ethereum/ecommerce";

//MISC
import LoadingButton from "@mui/lab/LoadingButton";

//Context
import { Context } from "../Contexts/cartContext";

//stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_API);

export default function CartPage() {
  const [user, loading] = useAuthState(auth);
  const { state } = useContext(Context);
  const [totalCart, setTotalCart] = useState(getTotalCart());

  function getTotalCart() {
    let total = 0;
    let shipping = state.cartProducts?.length ? 10 : 0;
    state.cartProducts?.forEach((item) => {
      total += item.price * item.quantity;
    });

    return total + shipping;
  }
  useEffect(() => {
    //change the total when quantity of a product changes
    setTotalCart(getTotalCart());
  }, [state]);
  const [tokenAmount, setTokenAmount] = useState(0);
  useEffect(() => {
    console.log("The user :", user);
    async function asyncLogic() {
      if (!loading) {
        if (user) {
          const userData = await getDocumentByID(user.uid);

          try {
            const tokenResult = await ecommerce.methods
              .tokens(userData.address)
              .call();
            setTokenAmount(web3.utils.fromWei(tokenResult) * 10000);
          } catch (error) {
            console.log(error.message);
          }
        }
      }
    }
    asyncLogic();
  }, [loading, user]);
  const [cardLoading, setCardLoading] = useState(false);
  async function payWithCard() {
    setCardLoading(true);
  }

  return (
    <Header>
      <div className="sm:px-16 px-4">
        <h2>My cart</h2>
        <CartProducts />
        <ShippingDetails />
        <Elements stripe={stripePromise}>
          <CardDetails
            setCardLoading={setCardLoading}
            cardLoading={cardLoading}
            price={totalCart}
          />
        </Elements>
        <CartInfo tokenAmount={tokenAmount} totalCart={totalCart} />
        <section className="flex sm:justify-end justify-between items-center my-4">
          <BuyWithTokens tokenAmount={tokenAmount} />
          <p className="mx-2">OR</p>
          <LoadingButton
            loading={cardLoading}
            onClick={() => {
              payWithCard();
            }}
            sx={{
              color: "#FB784C",
              ":hover": { color: "white", backgroundColor: "#FB784C" },
              fontWeight: "bold",
            }}
            className={cardLoading ? "" : "bg-main text-[#FFFFFF]"}
          >
            Pay with Card
          </LoadingButton>
        </section>
      </div>
    </Header>
  );
}
