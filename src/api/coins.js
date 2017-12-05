import axios from "axios";

export default {
  fetchAll: () => axios.get("/api/coins")
};
