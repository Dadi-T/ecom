import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
export default function Banner() {
  const desktop = useMediaQuery("(min-width:1024px)");
  const tablets = useMediaQuery("(min-width:768px)");
  return (
    <div className=" sm:h-[75vh] h-[70vh]   flex items-center ">
      <Image
        src="/banner.jpg"
        layout="fill"
        objectFit="cover"
        objectPosition={tablets ? "0% 50%" : "20% 50%"}
        alt="model"
        className="sm:h-[75vh] h-[70vh] z-0"
      />
      <section className="sm:px-16 px-4 sm:max-w-lg text-[#FFFFFF] max-w-[250px] relative z-1">
        <h2 className="text-[#FFFFFF]">MID SEASON'S SALE</h2>
        <h3 className="font-bold sm:text-8xl text-5xl text-[#FFFFFF] ">
          Autumn <span className="text-main">Collection</span> UP TO 20% OFF
        </h3>
        <Link href="/shop/shirts">
          <button className="px-8 py-4 bg-[#FB784C] font-bold">SHOP NOW</button>
        </Link>
      </section>
    </div>
  );
}
