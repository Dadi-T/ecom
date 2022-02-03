import Alert from "@mui/material/Alert";
import Web3 from "../ethereum/web3";
import { useEffect, useState } from "react";
export default function Metamask() {
  async function BuyTokens() {}
  return (
    <div>
      <div>
        {/* If metamask isn't connected switch the severity to warning, and metamask
        isn't connected yet */}
        <Alert severity="success">
          Metamask is already connected, address :
        </Alert>
        {/* TODO:Only show the connect button if metamask isn't connected, check accounts */}
        <button
          onClick={BuyTokens}
          className="font-semibold py-3 px-8 outline-none bg-main text-[#FFFFFF]"
        >
          Connect metamask
        </button>
      </div>
    </div>
  );
}
