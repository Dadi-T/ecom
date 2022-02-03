import Image from "next/image";
import Rating from "@mui/material/Rating";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Context } from "../../Contexts/cartContext";
import FeedBack from "./FeedBack";
import Button from "@mui/material/Button";
import Link from "next/link";
//interface
import { product } from "../../interfaces/interfaces";
export default function Product({ product }: { product: product }) {
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { state, addProductToCart } = useContext(Context);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("added something");
    setLoading(false);
  }, [state]);
  return (
    <div className="group product hover:animate-opacity  ">
      <div
        onClick={() => {
          router.push(`/product/${product.id}`);
        }}
        className="relative cursor-pointer h-[30vh] "
      >
        <Image
          alt="product"
          className="lg:rounded-lg"
          src={product.picture}
          layout="fill"
          objectFit="contain"
          objectPosition={"center center"}
        />
      </div>
      <div className=" flex flex-col items-center ">
        <Rating
          name="read-only"
          value={product.rating}
          precision={0.5}
          readOnly
        />

        <FeedBack
          open={open}
          setOpen={setOpen}
          success={true}
          feedBack="Added to cart"
        />
        <p className="font-light">{product.name}</p>
        <p className="font-bold  text-lg">${product.price}</p>
        <div className="flex justify-around">
          <Button
            onClick={() => {
              addProductToCart({
                payload: {
                  name: product.name,
                  quantity: 1,
                  price: product.price,
                  picture: product.picture,
                  sizes: product.sizes,
                  size: product.sizes[0],
                  id: product.id,
                  rating: product.rating,
                  category: product.category,
                },
              });
              router.push("/cart");
            }}
            sx={{
              color: "white",
              backgroundColor: "#FB784C",
              fontWeight: "bold",
              ":hover": { color: "white", backgroundColor: "#FB784C" },
            }}
            type="submit"
            variant="contained"
            className="font-semibold  lg:invisible group-hover:visible  hover:animate-bouncing"
          >
            Buy now
          </Button>

          <Button
            disabled={loading}
            sx={{
              marginLeft: "1rem",
              color: "white",
              backgroundColor: "#FB784C",
              fontWeight: "bold",
              ":hover": { color: "white", backgroundColor: "#FB784C" },
            }}
            onClick={() => {
              addProductToCart({
                payload: {
                  name: product.name,
                  quantity: 1,
                  price: product.price,
                  picture: product.picture,
                  sizes: product.sizes,
                  size: product.sizes[0],
                  id: product.id,
                  rating: product.rating,
                },
              });
              setOpen(true);
              setLoading(true);
            }}
            className="font-semibold  lg:invisible group-hover:visible  hover:animate-bouncing"
            type="submit"
            variant="contained"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}

{
  /* <>

<div className="group product hover:animate-opacity ">
  <div className="relative h-[40vh]">
    <Image
      src={product.picture}
      onClick={() => router.push(`/product/${product.id}`)}
      className="cursor-pointer rounded-sm"
      layout="fill"
      objectFit="cover"
    />
  </div>

 
   
      </div>
   </div>
</div>
 </> } */
}
