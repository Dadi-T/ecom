import TextField from "@mui/material/TextField";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import LoadingButton from "@mui/lab/LoadingButton";
import FeedBack from "./FeedBack";
export default function BuyTokens({
  buy,
  showBackDrop,
  setShowBackDrop,
  buying,
}: {
  buy: any;
  showBackDrop: any;
  setShowBackDrop: any;
  buying: boolean;
}) {
  const [tokenAmount, setTokenAmount] = useState(0);
  const handleClose = () => {
    setShowBackDrop(false);
  };

  function buyTokens() {
    buy(tokenAmount);
  }
  return (
    <div>
      <Dialog
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showBackDrop}
        onClose={handleClose}
      >
        <div className="w-[40vw] h-[20vh] flex flex-col justify-center p-4">
          <TextField
            sx={{ width: "100%" }}
            label="Amount of tokens to buy"
            variant="filled"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(parseInt(e.target.value))}
          />
          <section className="flex justify-between items-center mt-4 ">
            <p className="text-xl font-semibold">
              Ether: {tokenAmount / 10000}{" "}
            </p>
            {/* <button
              className="py-3 px-8 outline-none bg-main text-[#FFFFFF] font-semibold "
              
            >
              
            </button> */}
            <LoadingButton
              variant="contained"
              loading={buying}
              sx={{
                color: "#FB784C",
                ":hover": { color: "white", backgroundColor: "#FB784C" },
                fontWeight: "bold",
              }}
              onClick={buyTokens}
            >
              Buy Tokens
            </LoadingButton>
          </section>
        </div>
      </Dialog>
    </div>
  );
}
