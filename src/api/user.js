import axios from "axios";

export default {
  signup: data => axios.post("/api/users", data),
  login: credentials => axios.post("/api/users/login", credentials),
  logout: () => {
    // todo fix
    const token = localStorage.getItem("token");
    axios.post(`/api/Users/logout?access_token=${token}`);
  },
  me: () => axios.get("/api/users/me"),
  upload: (url, data) => axios.post(`${url}`, data),
  addCard: card => axios.post("/api/users/card", card),
  phone: number => axios.post("/api/users/phone", number),
  verifyPhone: code => axios.post("/api/users/verifyPhone", code)
};
