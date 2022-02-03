import Product from "../../components/sub-components/Product";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCategoryProducts } from "../../firebase/products";

interface product {
  name: string;
  description: string;
  picture: string;
  price: number;
  quantity: number;
  rating: number;
  sizes: string[];
  category: string;
  id: string;
}
export default function Home({ snapshot }: any) {
  const router = useRouter();

  return (
    <Header>
      <div className="sm:px-16 px-4">
        <h2 className="shop-title my-4 py-2 h2">
          Category <span className="text-main">{router.query.category}</span>
        </h2>
        <p>
          Here you can check out our new{" "}
          <span className="text-main">{router.query.category}</span> with fair
          prices{" "}
        </p>
        <div className="grid lg:grid-cols-4 mt-12 md:grid-cols-2 sm:gap-4 gap-2">
          {snapshot.map((product: product) => {
            return <Product key={product.id} product={product} />;
          })}
        </div>
      </div>
    </Header>
  );
}

export async function getServerSideProps({ params }: any) {
  const snapshot: any = await getCategoryProducts(params.category);
  return {
    props: { snapshot }, // will be passed to the page component as props
  };
}
