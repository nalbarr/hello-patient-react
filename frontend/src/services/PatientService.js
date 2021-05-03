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

const patientService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
};


export default patientService;