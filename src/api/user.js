import axios from "axios";

export default {
  signup: data => axios.post("/api/users", data),
  login: credentials => axios.post("/api/users/login", credentials),
  logout: () => {
    // todo fix
    const token = localStorage.getItem("token");
    axios.post(`/api/Users/logout?access_token=${token}`);
  }
};
