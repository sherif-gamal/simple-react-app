import axios from "axios";

export default {
  fetchAll: data => axios.get("/api/wallets", data),
  open: data => axios.post("/api/open", data),
  deposit: data => axios.post("/api/deposit", data),
  withdraw: data => axios.post("/api/withdraw", data)
};
