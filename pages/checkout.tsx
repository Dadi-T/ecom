import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import StepperComponent from "../components/sub-components/Stepper";
import { Divider } from "@mui/material";
import CardCheckout from "../components/sub-components/CardCheckout";
import web3 from "../ethereum/web3";
import ecommerce from "../ethereum/ecommerce";
import BuyTokens from "../components/sub-components/BuyTokens";
import { Context } from "../Contexts/cartContext";
import { cartProduct } from "../interfaces/interfaces";
import FeedBack from "../components/sub-components/FeedBack";
import LoadingButton from "@mui/lab/LoadingButton";
import { makeStyles } from "@mui/styles";
import { alpha, styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "../validations/validations";

const styles = makeStyles({
  root: {
    background: "black",
  },
  input: {
    color: "#2EFF22",
  },
  focused: {
    color: "red",
  },
});
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#FB784C",
  },
  "&.MuiFilledInput-underline:after": {
    borderBottomColor: "#FB784C",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#FB784C",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FB784C",
    },
  },
});
export default function CheckOut() {
  const formOptions = { resolver: yupResolver(checkoutSchema) };
  const classes = styles();
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);

  const steps = useState(["Shipping Address", "Payment Details"])[0];
  const [currentStep, setCurrentStep] = useState("Shipping Address");
  const [paymentChoice, setPaymentChoice] = useState("");
  const [showBackDrop, setShowBackDrop] = useState(false);
  const { state } = useContext(Context);
  const [buying, setBuying] = useState(false);
  const [using, setUsing] = useState(false);
  const [errors, setErrors] = useState({ buyError: "", useError: "" });
  const [openBuy, setOpenBuy] = useState(false);
  const [openUse, setOpenUse] = useState(false);
  const [totalTokens, setTotalTokens] = useState(0);
  const multiplier: number = 0.001;
  function getTotalCart() {
    let total = 0;
    state.cartProducts?.forEach((item: cartProduct) => {
      total += item.price * item.quantity;
    });

    return total;
  }

  useEffect(() => {
    setTotalTokens((getTotalCart() * multiplier).toFixed(3));
  }, []);

  async function buy(amount: number) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setBuying(true);
      await ecommerce.methods.buyTokens().send({
        from: accounts[0],
        value: web3.utils.toWei(`${amount / 10000}`, "ether"),
      });
      setErrors({ ...errors, buyError: "" });
      setOpenBuy(true);
    } catch (err: any) {
      setOpenBuy(true);
      setErrors({ ...errors, buyError: err.message });
    }
    setBuying(false);
  }
  async function buyWithTokens() {
    try {
      //Connect Metamask
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUsing(true);
      //call useTokens function with the amount to pay
      await ecommerce.methods
        .useTokens(web3.utils.toWei(`${totalTokens / 10000}`, "ether"))
        .send({
          from: accounts[0],
        });
      setErrors({ ...errors, useError: "" });
      setOpenUse(true);
    } catch (err: any) {
      setErrors({ ...errors, useError: err.message });
      setOpenUse(true);
    }
    setUsing(false);
  }
  function goToNextStep(data: any) {
    //go to next step
    setCurrentStep(steps[1]);
    //Reinizialise the payment method, just in case he wants to pay with tokens
    setPaymentChoice("");
  }
  function renderCurrentStep() {
    if (currentStep == steps[0]) {
      return (
        <form
          onSubmit={handleSubmit(goToNextStep)}
          className="flex flex-col justify-around checkout-elements-width h-1/2"
        >
          <h3 className="text-xl">{currentStep}</h3>
          <section className="grid grid-cols-2 gap-y-8 gap-x-2 ">
            <CssTextField
              required
              {...register("FirstName")}
              error={formState.errors.FirstName?.message.length ? true : false}
              helperText={formState.errors.FirstName?.message}
              name="FirstName"
              label="First Name"
            />
            <CssTextField
              required
              {...register("LastName")}
              error={formState.errors.LastName?.message.length ? true : false}
              helperText={formState.errors.LastName?.message}
              name="LastName"
              label="Last Name"
            />
            <CssTextField
              required
              {...register("AddressLine")}
              error={
                formState.errors.AddressLine?.message.length ? true : false
              }
              helperText={formState.errors.AddressLine?.message}
              name="AddressLine"
              label="Address Line 1"
            />
            <CssTextField
              required
              {...register("Email")}
              error={formState.errors.Email?.message.length ? true : false}
              helperText={formState.errors.Email?.message}
              name="Email"
              label="Email"
            />
            <CssTextField
              required
              {...register("City")}
              error={formState.errors.City?.message.length ? true : false}
              helperText={formState.errors.City?.message}
              name="City"
              label="City"
            />
            <CssTextField
              {...register("PostalCode")}
              error={formState.errors.PostalCode?.message.length ? true : false}
              helperText={formState.errors.PostalCode?.message}
              name="PostalCode"
              label="Zip/Postal Code"
            />
            <CssTextField
              required
              {...register("ShippingCountry")}
              error={
                formState.errors.ShippingCountry?.message.length ? true : false
              }
              helperText={formState.errors.ShippingCountry?.message}
              name="ShippingCountry"
              label="Shipping Country"
            />
          </section>
          <section className="flex justify-between">
            <LoadingButton
              type="button"
              sx={{
                color: "#FB784C",
                ":hover": { color: "white", backgroundColor: "#FB784C" },
                fontWeight: "bold",
              }}
              onClick={() => {
                setCurrentStep(steps[0]);
              }}
            >
              <Link href="/cart">Back to Cart</Link>
            </LoadingButton>
            <LoadingButton
              className=" font-semibold ml-4 py-3 px-7 outline-none text-[#FFFFFF] bg-main"
              sx={{
                color: "#FB784C",
                ":hover": { color: "white", backgroundColor: "#FB784C" },
                fontWeight: "bold",
              }}
              type="submit"
              variant="contained"
            >
              Next
            </LoadingButton>
          </section>
        </form>
      );
    } else if (currentStep == steps[1]) {
      return (
        <div className="flex flex-col justify-around checkout-elements-width min-h-[50%] ">
          <h3 className="text-xl">Order Summary</h3>
          <section className="overflow-auto">
            {state.cartProducts?.map((item: cartProduct) => {
              return (
                <section className="">
                  <div className="py-3 flex justify-between items-center">
                    <section>
                      <p className="text-lg">{item.name}</p>
                      <p className="text-cartText">
                        Quantity : {item.quantity}
                      </p>
                    </section>
                    <section>
                      <p>
                        {" "}
                        ({(item.quantity * item.price * multiplier).toFixed(
                          3
                        )}{" "}
                        T) or ${item.quantity * item.price}
                      </p>
                    </section>
                  </div>
                  <Divider />
                </section>
              );
            })}
          </section>

          <div className="flex justify-between items-center font-semibold mt-4 ">
            <p className="text-lg">Total</p>

            <p>
              ({totalTokens} T) or ${getTotalCart().toFixed(2)}
            </p>
          </div>
          <Divider />

          <div className=" ">
            {paymentChoice === "card" && (
              <CardCheckout steps={steps} setCurrentStep={setCurrentStep} />
            )}

            {!(paymentChoice === "card") && (
              <section className="flex sm:justify-between flex-col  ">
                <LoadingButton
                  sx={{
                    color: "#FB784C",
                    ":hover": { color: "white", backgroundColor: "#FB784C" },
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    setCurrentStep(steps[0]);
                  }}
                >
                  Go back
                </LoadingButton>

                <section className="flex justify-between">
                  <LoadingButton
                    className=" font-semibold py-3 px-7 outline-none text-[#FFFFFF] bg-main"
                    loading={using}
                    onClick={() => {
                      setPaymentChoice("token");
                      buyWithTokens();
                    }}
                    sx={{
                      color: "#FB784C",
                      ":hover": { color: "white", backgroundColor: "#FB784C" },
                      fontWeight: "bold",
                    }}
                    variant="contained"
                  >
                    Pay With Tokens
                  </LoadingButton>

                  <LoadingButton
                    className=" font-semibold py-3 px-7 outline-none text-[#FFFFFF] bg-main"
                    onClick={() => {
                      setPaymentChoice("card");
                    }}
                    sx={{
                      color: "#FB784C",
                      ":hover": { color: "white", backgroundColor: "#FB784C" },
                      fontWeight: "bold",
                    }}
                    variant="contained"
                  >
                    Pay with Card
                  </LoadingButton>
                </section>
              </section>
            )}
            <p>
              You don't have enough tokens ?{" "}
              <a
                onClick={() => {
                  setShowBackDrop(true);
                }}
                className="text-main underline cursor-pointer"
              >
                Click here
              </a>
            </p>
            <BuyTokens
              buying={buying}
              buy={buy}
              setShowBackDrop={setShowBackDrop}
              showBackDrop={showBackDrop}
            />
          </div>
        </div>
      );
    }
  }
  return (
    <div className="flex justify-center items-center flex-col h-screen ">
      <h2 className="text-3xl font-semibold ">Checkout</h2>
      <StepperComponent steps={steps} currentStep={currentStep} />
      <FeedBack
        feedBack={
          errors.buyError.length
            ? errors.buyError
            : "You token buying operation was successful"
        }
        success={errors.buyError.length ? false : true}
        open={openBuy}
        setOpen={setOpenBuy}
      />
      <FeedBack
        feedBack={
          errors.useError.length
            ? errors.useError
            : "Buying with tokens has been successful"
        }
        success={errors.useError.length ? false : true}
        open={openUse}
        setOpen={setOpenUse}
      />
      {renderCurrentStep()}
    </div>
  );
}
