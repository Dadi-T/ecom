import Link from "next/link";
import Image from "next/image";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect, useContext } from "react";
import ProductDrawer from "./sub-components/ProductDrawer";
import { Context } from "../Contexts/cartContext";
import web3 from "../ethereum/web3";
import ecommerce from "../ethereum/ecommerce";
import { getDocumentByID } from "../firebase/users";
import Badge from "@mui/material/Badge";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import DropDownMenu from "./sub-components/DropDownMenu";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
const styles = makeStyles({
  customBadge: {
    backgroundColor: "#FB784C",
    color: "white",
  },
});
export default function Header(props: any) {
  const tablets = useMediaQuery("(min-width:768px)");
  const classes = styles();
  const { state } = useContext(Context);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [user, loading] = useAuthState(auth);
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  useEffect(() => {
    //in case user was playing with the width, when it reaches tablets or more,close the menu
    if (tablets) {
      setOpenMenu(false);
    }
  }, [tablets]);
  useEffect(() => {
    console.log("The user :", user);
    async function asyncLogic() {
      if (user) {
        const userData: any = await getDocumentByID(user.uid);

        try {
          const tokenResult = await ecommerce.methods
            .tokens(userData.address)
            .call();
          setTokenAmount(web3.utils.fromWei(tokenResult) * 10000);
        } catch (error: any) {
          console.log(error.message);
        }
      }
    }
    asyncLogic();
  }, [loading, user]);

  const navigation: { name: string; url: string }[] = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Shop",
      url: "/shop",
    },
    {
      name: "Blog",
      url: "/Blog",
    },
    {
      name: "About",
      url: "/About",
    },
    {
      name: "Contact Us",
      url: "/Contact Us",
    },
  ];
  const categories: { name: string }[] = [
    { name: "shirts" },
    { name: "pants" },
    { name: "watches" },
    { name: "shoes" },
  ];
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  function renderProfile() {
    if (!loading) {
      if (user) {
        return (
          <>
            <p className="mx-2">{tokenAmount ? tokenAmount : "00.00"}T</p>
            <Link href="/settings" passHref>
              <a className="">
                <Avatar alt="avatar" />
              </a>
            </Link>
          </>
        );
      } else {
        return (
          <Link href="/login">
            <Button
              variant="contained"
              sx={{
                color: "white",
                backgroundColor: "#FB784C",
                fontWeight: "bold",
                ":hover": { color: "white", backgroundColor: "#FB784C" },
              }}
              className=" font-semibold  py-2 px-6 outline-none "
            >
              Join us
            </Button>
          </Link>
        );
      }
    }
  }
  return (
    <div>
      <header className=" z-50 h-1/4 bg-[#FFFFFF] md:flex md:items-center md:justify-between border-b-[2px] border-[#e5e5e5] sticky top-[0px]  px-4 sm:px-16 ">
        <div className="flex justify-between items-center">
          <Image
            alt="logo"
            src="/logos/logo.png"
            width={169 / 2}
            height={110 / 2}
          />
          <div className="basis-1/4 flex justify-between items-center sm:hidden">
            <Link href="/cart" passHref>
              <button className="">
                <Badge
                  badgeContent={state.cartProducts?.length}
                  classes={{ badge: classes.customBadge }}
                >
                  <ShoppingBagOutlinedIcon
                    sx={{ ":hover": { color: "#FB784C" } }}
                  />
                </Badge>
              </button>
            </Link>

            <MenuIcon
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
            />
          </div>
        </div>

        <nav className=" lg:basis-2/4 md:basis-3/4 hidden sm:block  ">
          <ul className="flex justify-between items-center">
            {navigation.map((each) => {
              if (each.name === "Shop") {
                return (
                  <section key={each.name} className="shop  ">
                    <Link href={`/shop/shirts`} passHref>
                      <a className="hover:text-main cursor-pointer">
                        {each.name}
                      </a>
                    </Link>
                    <div className="dropdown-menu border-[1px] border-[#E5E5E5] bg-[#FFFFFF]">
                      {categories.map((category) => {
                        return (
                          <Link
                            passHref
                            key={category.name}
                            href={`/shop/${category.name}`}
                          >
                            <a>
                              {category.name.charAt(0).toUpperCase() +
                                category.name.slice(1)}
                            </a>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                );
              } else {
                return (
                  <Link key={each.name} href={"/"} passHref>
                    <a className="hover:text-main cursor-pointer">
                      {each.name}
                    </a>
                  </Link>
                );
              }
            })}
            <div className="flex justify-between items-center ">
              <button
                className="mr-4"
                onClick={() => setShowCartDrawer(!showCartDrawer)}
              >
                <Badge
                  badgeContent={state.cartProducts?.length}
                  classes={{ badge: classes.customBadge }}
                >
                  <ShoppingBagOutlinedIcon
                    sx={{ ":hover": { color: "#FB784C" } }}
                  />
                </Badge>
              </button>
              {renderProfile()}
            </div>
          </ul>
        </nav>

        <nav
          style={{ display: openMenu ? "block" : "none" }}
          className=" md:hidden  "
        >
          <DropDownMenu menu={navigation} />
        </nav>
        <ProductDrawer toggle={showCartDrawer} setToggle={setShowCartDrawer} />
      </header>
      {props.children}
    </div>
  );
}
