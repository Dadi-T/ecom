import TextField from "@mui/material/TextField";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase/firebase";
import { signOutFunc } from "../firebase/users";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Settings(props: any) {
  //TODO:Depending on the data being edited, the background of the list selected changes to indicate that the user is currently on that element
  const router = useRouter();
  const [currentEdit, setCurrentEdit] = useState("Main");
  const mainOptions = ["First Name", "Last Name", "Country", "City", "Address"];
  const passwordOptions = ["New Password", "Re-enter New Password"];
  const emailOptions = ["New Email", "Re-enter New Email"];
  const menu = ["Main", "Edit Password", "Edit Email", "Sign Out"];

  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      }
    }
  }, [loading, user]);
  function renderEdit() {
    switch (currentEdit) {
      case "Main": {
        return (
          <form>
            {mainOptions.map((option) => {
              return (
                <section
                  key={option}
                  className="flex justify-end items-center my-4"
                >
                  <label className="mr-4">{option}</label>

                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-normal"
                    variant="outlined"
                    placeholder={option}
                    sx={{ width: "400px" }}
                  />
                </section>
              );
            })}
            <button className=" font-semibold  py-3 px-8 outline-none bg-main text-[#FFFFFF]">
              Save
            </button>
          </form>
        );
      }
      case "Edit Password": {
        return (
          <form>
            {passwordOptions.map((option) => {
              return (
                <section
                  key={option}
                  className="flex justify-end items-center my-4"
                >
                  <label className="mr-4">{option}</label>

                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-normal"
                    variant="outlined"
                    placeholder={option}
                    sx={{ width: "400px" }}
                  />
                </section>
              );
            })}
            <button className="font-semibold py-3 px-8 outline-none bg-main text-[#FFFFFF]">
              Save Password
            </button>
          </form>
        );
      }
      case "Edit Email": {
        return (
          <form>
            {emailOptions.map((option) => {
              return (
                <section
                  key={option}
                  className="flex justify-end items-center my-4"
                >
                  <label className="mr-4">{option}</label>

                  <TextField
                    hiddenLabel
                    id="filled-hidden-label-normal"
                    variant="outlined"
                    placeholder={option}
                    sx={{ width: "400px" }}
                  />
                </section>
              );
            })}
            <button className="font-semibold py-3 px-8 outline-none bg-main text-[#FFFFFF]">
              Save Password
            </button>
          </form>
        );
      }
      default:
        return;
    }
  }
  return (
    <Header>
      <div>
        <div className="flex  p-8  ">
          <ul className="mr-16 w-[300px] border-t-[1px]  border-[#e5e5e5]">
            {menu.map((item) => {
              if (item === "Sign Out") {
                return (
                  <li
                    key={item}
                    className=" border-b-[1px] border-x-[1px] border-[#e5e5e5]"
                  >
                    <button
                      onClick={() => {
                        signOutFunc();
                        router.push("/");
                      }}
                      style={{
                        backgroundColor:
                          item === currentEdit ? "#FB784C" : "#FFFFFF",
                        color: item === currentEdit ? "#FFFFFF" : "#000000",
                      }}
                      className="py-2  w-full flex px-4 "
                    >
                      <p>{item}</p>
                    </button>
                  </li>
                );
              }
              return (
                <li
                  key={item}
                  className=" border-b-[1px] border-x-[1px] border-[#e5e5e5]"
                >
                  <button
                    onClick={() => setCurrentEdit(item)}
                    style={{
                      backgroundColor:
                        item === currentEdit ? "#FB784C" : "#FFFFFF",
                      color: item === currentEdit ? "#FFFFFF" : "#000000",
                    }}
                    className="py-2  w-full flex px-4 "
                  >
                    <p>{item}</p>
                  </button>
                </li>
              );
            })}
          </ul>
          {renderEdit()}
        </div>
      </div>
    </Header>
  );
}
