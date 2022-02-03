import Image from "next/image";
import { Context } from "../../Contexts/cartContext";
import { useContext } from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

//interfaces
import { cartProduct } from "../../interfaces/interfaces";
export default function CartComponent({ product }: { product: cartProduct }) {
  const { removeProductFromCart, changeQuantityOfProduct } =
    useContext(Context);
  return (
    <div className=" grid grid-cols-3  lg:grid-cols-5  md:h-[15vh] gap-x-4  lg:h-[20vh] my-2 ">
      <div className="relative h-full">
        <Image
          alt="product"
          className="rounded-md"
          src={product.picture}
          layout="fill"
          objectFit="contain"
          objectPosition={"center center"}
        />
      </div>

      <div className="lg:col-span-4 col-span-2 flex flex-col justify-between">
        <div>
          <p className="">{product.name}</p>
          <p className="font-semibold ">${product.price}</p>
          <p className="sm:font-light sm:text-textColor text-[#323B43] ">
            {product.price / 1000} Tokens
          </p>
        </div>

        <div className="flex items-center justify-between">
          <section className="flex items-center lg:w-[15%] md:w-[25%] justify-between  ">
            <button
              onClick={() => {
                changeQuantityOfProduct({
                  payload: {
                    id: product.id,
                    quantity: product.quantity - 1,
                  },
                });
              }}
              className="quantity-button"
            >
              -
            </button>
            <p>{product.quantity}</p>
            <button
              onClick={() => {
                changeQuantityOfProduct({
                  payload: {
                    id: product.id,
                    quantity: product.quantity + 1,
                  },
                });
              }}
              className="bg-[#e5e5e5]  sm:px-4 sm:py-2 rounded-full hover:bg-main hover:text-[#FFFFFF] active:bg-[#FFFFFF] active:text-textColor px-1.5"
            >
              +
            </button>
          </section>
          <button
            onClick={() => {
              removeProductFromCart({ payload: product });
            }}
          >
            <CancelOutlinedIcon
              sx={{
                ":hover": { color: "red" },
                color: "#252C32",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
