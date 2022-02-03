import Image from "next/image";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState, useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import { getDocumentByID, indexProducts } from "../../firebase/products";
import { Context } from "../../Contexts/cartContext";
import Button from "@mui/material/Button";
//interface
import { product } from "../../interfaces/interfaces";

export default function Id({
  product,
  related,
}: {
  product: product;
  related: product[];
}) {
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { state, addProductToCart } = useContext(Context);

  return (
    <Header>
      <div className="flex flex-col items-center sm:px-16 px-4 mt-4">
        <div className="grid sm:grid-cols-2 sm:gap-8 grid-cols-1 ">
          {product && (
            <>
              <div>
                <Breadcrumbs className="sm:hidden ">
                  <p>Categories</p>
                  <Link href={`/shop/${product.category}`}>
                    <a className="text-main underline">{product.category}</a>
                  </Link>
                </Breadcrumbs>
                <div className="relative md:h-full h-[30vh]">
                  <Image
                    alt="product"
                    className="rounded-sm"
                    src={product.picture}
                    objectFit="contain"
                    objectPosition={"center center"}
                    layout="fill"
                  />
                </div>
              </div>

              <section className=" flex flex-col justify-center  ">
                <Breadcrumbs className="hidden sm:block">
                  <p>Categories</p>
                  <Link href="/shop/shirts">
                    <a className="text-main underline">{product.category}</a>
                  </Link>
                </Breadcrumbs>
                <h3 className="h3 mt-2 ">{product.name}</h3>
                <p className="text-xl font-semibold sm:my-4 my-2">
                  ${product.price}
                </p>
                <FormControl
                  className="sm:my-4 my-2"
                  size="medium"
                  sx={{ width: "150px" }}
                >
                  <InputLabel id="Size">Select Size</InputLabel>
                  <Select
                    labelId="Size"
                    onChange={(e) => setSize(e.target.value)}
                    label="Select Size"
                    value={size}
                  >
                    {product.sizes.map((item) => {
                      return (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <section className="sm:my-4 my-2 flex items-center">
                  <input
                    className="w-[50px] border-[1px] border-[#e5e5e5] p-2 rounded-sm"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      alignSelf: "center",
                      color: "white",
                      backgroundColor: "#FB784C",
                      paddingY: "0.5rem",
                      paddingX: "1.75rem",
                      fontWeight: "bold",
                      ":hover": { color: "white", backgroundColor: "#FB784C" },
                    }}
                    onClick={() => {
                      addProductToCart({
                        payload: {
                          ...product,
                          quantity,
                          size,
                          id: router.query.id,
                        },
                      });
                    }}
                    className="  outline-none "
                  >
                    Add to Cart
                  </Button>
                </section>
                <h4 className="sm:my-4 my-2 font-semibold text-xl">
                  Product Details
                </h4>
                <p className="pr-24">{product.description}</p>
              </section>
            </>
          )}
        </div>
      </div>
    </Header>
  );
}

export async function getServerSideProps({ params }: any) {
  const product: any = await getDocumentByID(params.id);
  const related: product[] = await indexProducts(product.category);
  return {
    props: { product, related }, // will be passed to the page component as props
  };
}
