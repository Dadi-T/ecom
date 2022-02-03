import { useState, useContext } from "react";
import { Divider } from "@mui/material";
//Components
import AccordianAction from "../sub-components/AccordianAction";
import CartComponent from "./CartComponent";

//Context
import { Context } from "../../Contexts/cartContext";
import { cartProduct } from "../../interfaces/interfaces";
export default function CartProducts() {
  const [productsInCart, setProductsInCart] = useState(new Array(5).fill(""));
  const { state } = useContext(Context);
  return (
    <AccordianAction title="Products in cart">
      {state.cartProducts?.map((item: cartProduct) => {
        return (
          <>
            <CartComponent product={item} />
            <Divider />
          </>
        );
      })}
    </AccordianAction>
  );
}
