import axios from "axios";

export default {
  signup: data => axios.post("/api/Users", data),
  login: credentials => axios.post("/api/Users/login", credentials),
  logout: () => {
    // todo fix
    const token = localStorage.getItem("token");
    axios.post(`/api/Users/logout?access_token=${token}`);
  }
};
