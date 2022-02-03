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
      {watchSnapshot?.length && <Features products={watchSnapshot} />}
      {shirtSnapshot?.length && <Features products={shirtSnapshot} />}
      {shoesSnapshot?.length && <Features products={shoesSnapshot} />}
      {pantsSnapshot?.length && <Features products={pantsSnapshot} />}
    </div>
  );
}
