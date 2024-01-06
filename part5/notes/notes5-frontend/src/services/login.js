import axios from "axios";
import { API_ENDPOINT_PATH } from "./config";

const baseUrl = `${API_ENDPOINT_PATH}/api/login`;

const login = async (credentials) => {
    console.log(baseUrl);
    const response = await axios.post(baseUrl, credentials);
    console.log(response);
    console.log(response.data);
    console.log("-----------");
    return response.data;
};

export default { login };
