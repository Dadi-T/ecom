import web3 from "./web3";
import ecommerce from "./build/ecommerce.json";

const instance = new web3.eth.Contract(
  JSON.parse(ecommerce.interface),
  "0xaF2A57E86F251A4Fc90DE8c035Bc10730BD22b24"
);

export default instance;
