import type { NextPage } from "next";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Body from "../components/Body";
import { indexProducts } from "../firebase/products";

const { faker } = require("@faker-js/faker");
const Home: NextPage = ({
  watchSnapshot,
  shirtSnapshot,
  shoesSnapshot,
  pantsSnapshot,
}: any) => {
  return (
    <Header>
      <div>
        <Banner />
        <div>
          <Body
            watchSnapshot={watchSnapshot}
            shirtSnapshot={shirtSnapshot}
            shoesSnapshot={shoesSnapshot}
            pantsSnapshot={pantsSnapshot}
          />
        </div>
        <Footer />
      </div>
    </Header>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const watchSnapshot: any = await indexProducts("watches");
  const shirtSnapshot: any = await indexProducts("shirts");
  const shoesSnapshot: any = await indexProducts("shoes");
  const pantsSnapshot: any = await indexProducts("pants");
  return {
    props: { watchSnapshot, shirtSnapshot, shoesSnapshot, pantsSnapshot }, // will be passed to the page component as props
  };
}
