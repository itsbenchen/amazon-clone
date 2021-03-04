import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5001/clone-f7a06/us-central1/api" // API (cloud function) URL
});

export default instance;