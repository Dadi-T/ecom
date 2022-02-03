import Image from "next/image";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Context } from "../../Contexts/cartContext";
import { useContext, useState } from "react";
import FeedBack from "./FeedBack";
import Rating from "@mui/material/Rating";
import Link from "next/link";
//Interfaces
import { cartProduct } from "../../interfaces/interfaces";
export default function Cart() {
  const {
    state,
    removeProductFromCart,
  }: { state: { cartProducts: any }; removeProductFromCart: any } =
    useContext(Context);
  const [open, setOpen] = useState(false);
  return (
    <>
      <FeedBack
        open={open}
        setOpen={setOpen}
        success={false}
        feedBack="Product removed from cart"
      />
      {state.cartProducts?.map((item: cartProduct) => {
        return (
          // TODO:Change Math to uuid
          <div
            key={`${Math.floor(Math.random() * 99999999)}`}
            className="grid grid-cols-2 gap-4 px-4 my-2"
          >
            <Link href={`/product/${item.id}`} passHref>
              <div className="relative h-full">
                <Image
                  alt="product"
                  className="rounded-md hover:cursor-pointer "
                  src={item.picture}
                  objectFit="contain"
                  objectPosition={"center center"}
                  layout="fill"
                />
              </div>
            </Link>
            <div className="w-full ">
              <p className="max-w-[100px] font-bold text-lg">
                {item.name.length > 20
                  ? item.name.substring(0, 20) + "..."
                  : item.name}
              </p>
              <section className="flex justify-between font-semibold items-center">
                <p>
                  {item.quantity} x ${item.price}
                </p>
                <button
                  onClick={() => {
                    //TODO:Remove item from cart
                    removeProductFromCart({ payload: item });
                    setOpen(true);
                  }}
                >
                  <CancelOutlinedIcon sx={{ color: "red" }} />
                </button>
              </section>
              <Rating
                name="read-only"
                value={item.rating}
                precision={0.5}
                readOnly
              />
              <p>
                {item.size.length
                  ? "Size : " + item.size
                  : "Size not yet defined"}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
