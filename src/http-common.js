import axios from "axios";

export default axios.create({
  // NAA. Need to pull out api?
  // baseURL: "http://localhost:4000/api",
  // NAA. Below does not work.
  // baseURL:"4000-cs-943121548096-default.us-central1.cloudshell.dev/",
  baseURL: "http://localhost:4000/",
  headers: {
	"Access-Control-Allow-Originx": "*",
	"Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
	"Content-type": "application/json"
  }
});
