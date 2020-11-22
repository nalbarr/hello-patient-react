//import http from "../http-common";
//import http from "../axios/instance";
import axios from '../axios/instance';

const getAll = () => {
    return axios.get("/patients");
};

const get = id => {
    return axios.get(`/patients/${id}`);
};

const create = data => {
    return axios.post("/patients", data);
};

const update = (id, data) => {
    return axios.put(`/patients/${id}`, data);
};

const remove = id => {
    return axios.delete(`/patients/${id}`);
};

const removeAll = () => {
    return axios.delete(`/patients`);
};

const findByName = name => {
    return axios.get(`/patients?name=${name}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
};
