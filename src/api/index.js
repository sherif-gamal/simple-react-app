import axios from "axios";

export { default as Users } from "./user";
export { default as Coins } from "./coins";
export { default as Wallets } from "./wallets";

export default {
  post: async (url, data) => (await axios.post(url, data)).data,
  get: async url => (await axios.get(url)).data
};
