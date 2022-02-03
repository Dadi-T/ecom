import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, Context } from "../Contexts/cartContext";
import { authState } from "../firebase/users";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export async function getStaticProps() {
  authState();

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default MyApp;
