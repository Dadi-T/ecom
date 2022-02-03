import { useState, useEffect } from "react";

//web3
import web3 from "../../ethereum/web3";
import ecommerce from "../../ethereum/ecommerce";
//Context
import { useContext } from "react";
import { Context } from "../../Contexts/cartContext";
import { cartProduct } from "../../interfaces/interfaces";

//components
import FeedBack from "../sub-components/FeedBack";

//mui
import LoadingButton from "@mui/lab/LoadingButton";

export default function BuyWithTokens({ tokenAmount }: any) {
  const { state, resetCart } = useContext(Context);
  const [totalTokens, setTotalTokens] = useState(getTotalCart() / 1000);
  useEffect(() => {
    //change the total when quantity of a product changes
    setTotalTokens(getTotalCart() / 1000);
  }, [state]);
  function getTotalCart() {
    let total = 0;
    let shipping = state.cartProducts?.length ? 10 : 0;
    state.cartProducts?.forEach((item: cartProduct) => {
      total += item.price * item.quantity;
    });

    return total + shipping;
  }
  const [openUse, setOpenUse] = useState(false);
  const [using, setUsing] = useState(false);
  const [errors, setErrors] = useState({ buyError: "", useError: "" });

  async function buyUsingTokens() {
    if (tokenAmount >= totalTokens) {
      //if user has enough tokens
      try {
        //Connect Metamask
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setErrors({ ...errors, useError: "" });
        setUsing(true);
        //call useTokens function with the amount to pay
        await ecommerce.methods
          .useTokens(web3.utils.toWei(`${totalTokens / 10000}`, "ether"))
          .send({
            from: accounts[0],
          });
        setOpenUse(true);
        resetCart();
      } catch (err: any) {
        setErrors({ ...errors, useError: err.message });
        setOpenUse(true);
      }
      setUsing(false);
    } else {
      //if user doesn't have enough tookens, then just buy directly the product
      try {
        //Connect Metamask
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setErrors({ ...errors, useError: "" });
        setUsing(true);
        await ecommerce.methods
          .buyProduct(web3.utils.toWei(`${totalTokens / 10000}`, "ether"))
          .send({
            from: accounts[0],
            value: web3.utils.toWei(`${totalTokens / 10000}`, "ether"),
          });
        resetCart();
        setOpenUse(true);
      } catch (err: any) {
        setErrors({ ...errors, useError: err.message });
        setOpenUse(true);
      }
      setUsing(false);
    }
  }
  return (
    <LoadingButton
      onClick={() => {
        buyUsingTokens();
      }}
      sx={{
        color: "#FB784C",
        ":hover": { color: "white", backgroundColor: "#FB784C" },
        fontWeight: "bold",
      }}
      className={using ? "" : "bg-main text-[#FFFFFF]"}
      loading={using}
    >
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
      Pay with Tokens
    </LoadingButton>
  );
}
