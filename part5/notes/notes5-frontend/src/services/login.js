import axios from "axios";
import { API_ENDPOINT_PATH } from "./config";

const baseUrl = `${API_ENDPOINT_PATH}/api/login`;

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
};

export default { login };
