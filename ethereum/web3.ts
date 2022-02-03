import Web3 from "web3";
declare var window: any;
let web3: any;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/4a917d78d0aa477a8d9408b8e75691ca"
  );
  web3 = new Web3(provider);
}

export default web3;
