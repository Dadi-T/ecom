import Product from "./Product";
import { product } from "../../interfaces/interfaces";
export default function Features({
  products,
  title = "",
}: {
  products: product[];
  title: string;
}) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl features-title py-4 ">
          {(title.length ? title : products[0].category)
            .charAt(0)
            .toUpperCase() +
            (title.length ? title : products[0].category).slice(1)}
        </h1>
        <p className=" py-4 text-center">
          Here you can check out our{" "}
          {title.length ? title : products[0].category} with fair prices on Dioo
        </p>
      </div>

      <div className="grid lg:grid-cols-4 lg:gap-x-4 md:grid-cols-2 md:gap-8 grid-cols-1 gap-8">
        {products.map((item: any) => (
          <Product key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
