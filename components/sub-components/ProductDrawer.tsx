import Drawer from "@mui/material/Drawer";
import Cart from "./Cart";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import { Context } from "../../Contexts/cartContext";
//INTERFACE
import { cartProduct } from "../../interfaces/interfaces";
export default function ProductDrawer({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: any;
}) {
  const { state } = useContext(Context);
  function getTotalCart() {
    let total = 0;
    state.cartProducts?.forEach((item: cartProduct) => {
      total += item.price * item.quantity;
    });
    return total;
  }
  return (
    <Drawer open={toggle} anchor="right" onClose={() => setToggle(!toggle)}>
      <Cart />
      <Divider />
      {/* Loop Done */}
      <div className="text-center font-bold p-4">
        <p>SubTotal : ${getTotalCart()}</p>
      </div>
      <Divider />
      <div className="flex justify-center py-4 font-semibold min-w-[300px] ">
        <Link href="/cart">
          <a className="black-button ">View Cart</a>
        </Link>
      </div>
    </Drawer>
  );
}
