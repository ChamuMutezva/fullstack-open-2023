import axios from "axios";
import { API_ENDPOINT_PATH } from "./config";

const baseUrl = `${API_ENDPOINT_PATH}/api/persons`;

const getAll = async () => {
    const request = axios.get(baseUrl);
    const response = await request;
    return response.data;
};

const getSinglePerson = async (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    const response = await request;
    return response.data;
};

const create = async (newPerson) => {
    const request = axios.post(baseUrl, newPerson);
    const response = await request;
    return response.data;
};

const update = async (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    const response = await request;
    return response.data;
};

const deletePerson = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    const response = await request;
    return response.data;
};

export default { getAll, getSinglePerson, create, update, deletePerson };
