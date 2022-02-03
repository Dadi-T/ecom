import Features from "./sub-components/Features";
import { indexProducts } from "../firebase/products";
import { useEffect, useState } from "react";
export default function Body({
  watchSnapshot,
  shirtSnapshot,
  shoesSnapshot,
  pantsSnapshot,
}: any) {
  return (
    <div className=" bg-[#ffffff] relative sm:px-16 px-4">
      {watchSnapshot?.length && <Features title="" products={watchSnapshot} />}
      {shirtSnapshot?.length && <Features title="" products={shirtSnapshot} />}
      {shoesSnapshot?.length && <Features title="" products={shoesSnapshot} />}
      {pantsSnapshot?.length && <Features title="" products={pantsSnapshot} />}
    </div>
  );
}
