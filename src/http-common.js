import axios from "axios";

export default axios.create({
  // NAA. Need to pull out api?
  // baseURL: "http://localhost:4000/api",
  baseURL: "http://localhost:4000/",
  headers: {
    "Content-type": "application/json"
  }
});
