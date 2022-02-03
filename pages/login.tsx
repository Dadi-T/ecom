import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState, useContext, useEffect } from "react";
import Header from "../components/Header";
import { register, signOutFunc, login } from "../firebase/users";
import { Context } from "../Contexts/cartContext";
import { useRouter } from "next/router";
import { addAddress } from "../firebase/users";
import Button from "@mui/material/Button";

//form validation
import FeedBack from "../components/sub-components/FeedBack";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema, loginSchema } from "../validations/validations";
export default function Login() {
  const router = useRouter();
  const [option, setOption] = useState("login");
  const registerOptions = { resolver: yupResolver(registerSchema) };
  const loginOptions = { resolver: yupResolver(loginSchema) };
  // get functions to build form with useForm() hook
  //{ register, handleSubmit, reset, formState }
  const registerDetails = useForm(registerOptions);
  const loginDetails = useForm(loginOptions);
  const { errors } = registerDetails.formState;
  const [formErrors, setFormErrors] = useState({
    registerError: "",
    loginError: "",
  });
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const { state, userState } = useContext(Context);

  function chooseOption() {
    return (
      <div className="flex justify-center ">
        <FormControl>
          <FormLabel sx={{ "&.Mui-focused": { color: "#fb784c" } }}>
            {option == "login" ? "Login to your account" : "Create an account"}
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(e) => setOption(e.target.value)}
            defaultValue={"login"}
          >
            <FormControlLabel
              value="register"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#FB784C",
                    },
                  }}
                />
              }
              label="Register"
            />
            <FormControlLabel
              value="login"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "#FB784C",
                    },
                  }}
                />
              }
              label="Login"
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
  async function handleLogin(data: any) {
    try {
      const user = await login(data.email, data.password);
      userState({ payload: user });
      router.push("/");
    } catch (err: any) {
      setFormErrors({ ...formErrors, loginError: err });
      setOpenLogin(true);
    }
  }
  async function handleRegister(data: any) {
    try {
      const user = await register(data.email, data.password);
      userState({ payload: user });
      if (window.ethereum) {
        //get account address
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          //DONE:Save account address to firestore user collection
          if (state.user) {
            await addAddress(accounts[0], state.user.uid);
          }
          router.push("/");
        } catch (err: any) {
          console.log(err.message);
          router.push("/");
        }
      }
      setFormErrors({ ...formErrors, registerError: "" });
      router.push("/");
    } catch (err: any) {
      console.log(typeof err);
      setFormErrors({ ...formErrors, registerError: err });
      setOpenRegister(true);
    }
  }
  function loginOrRegister() {
    if (option == "register") {
      return (
        <form
          onSubmit={registerDetails.handleSubmit(handleRegister)}
          className="flex flex-col h-1/3 justify-around w-1/2"
        >
          <TextField
            error={errors.email?.message.length ? true : false}
            helperText={errors.email?.message}
            {...registerDetails.register("email")}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            name="email"
          />
          <TextField
            error={errors.password?.message.length ? true : false}
            helperText={errors.password?.message}
            {...registerDetails.register("password")}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            name="password"
            type="password"
          />
          <TextField
            error={errors.confirmPassword?.message.length ? true : false}
            helperText={errors.confirmPassword?.message}
            {...registerDetails.register("confirmPassword")}
            id="outlined-basic"
            label="Password Confirmation"
            variant="outlined"
            type="password"
            name="confirmPassword"
          />
          <Button
            className="self-center font-semibold py-3 px-7 outline-none text-[#FFFFFF] bg-main"
            type="submit"
            variant="contained"
            sx={{
              color: "#FB784C",
              ":hover": { color: "white", backgroundColor: "#FB784C" },
              fontWeight: "bold",
            }}
          >
            Register
          </Button>
        </form>
      );
    } else if (option == "login") {
      return (
        <form
          onSubmit={loginDetails.handleSubmit(handleLogin)}
          className="flex flex-col  w-1/2 h-1/3  justify-around "
        >
          <TextField
            error={
              loginDetails.formState.errors.email?.message.length ? true : false
            }
            helperText={loginDetails.formState.errors.email?.message}
            {...loginDetails.register("email")}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
          />
          <TextField
            error={
              loginDetails.formState.errors.password?.message.length
                ? true
                : false
            }
            helperText={loginDetails.formState.errors.password?.message}
            {...loginDetails.register("password")}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              color: "#FB784C",
              ":hover": { color: "white", backgroundColor: "#FB784C" },
              fontWeight: "bold",
            }}
            className=" self-center font-semibold  py-3 px-7 outline-none text-[#FFFFFF] bg-main"
          >
            Login
          </Button>
        </form>
      );
    }
  }
  return (
    <div className=" h-screen flex flex-col justify-center items-center ">
      {/* <Header /> */}
      {chooseOption()}
      {loginOrRegister()}
      <FeedBack
        feedBack={
          formErrors.registerError.length
            ? formErrors.registerError
            : "register has been successful"
        }
        success={formErrors.registerError.length ? false : true}
        open={openRegister}
        setOpen={setOpenRegister}
      />{" "}
      <FeedBack
        feedBack={
          formErrors.loginError.length
            ? formErrors.loginError
            : "register has been successful"
        }
        success={formErrors.loginError.length ? false : true}
        open={openLogin}
        setOpen={setOpenLogin}
      />
    </div>
  );
}
