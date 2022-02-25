import Web3 from "web3";
declare var window: any;
let web3: any;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    ""
  );
  web3 = new Web3(provider);
}

export default web3;
