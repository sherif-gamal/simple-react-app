import axios from "axios";

export default {
  fetchAll: () => axios.get("/api/resources"),
  fetch: resourceId => axios.get(`/api/resources/${resourceId}`)
};
