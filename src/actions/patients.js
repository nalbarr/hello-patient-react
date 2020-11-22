import store from '../store';
import axios from '../axios/instance';

export const fetchPatientsStarted = () => {
    return {
        type: "GET_PATIENTS_STARTED"
    };
};

export const fetchPatientsSuccess = post => {
    return {
        type: "GET_PATIENTS_SUCCESS",
        data: post
    };
};

export const fetchPatientsFailure = error => {
    console.error('Unable to get observations data');
    return {
        type: "GET_PATIENTS_FAILURE",
        data: error
    };
};

export const fetchPatients = () => {
    store.dispatch(fetchPatientsStarted());
    return (dispatch) => {
        return axios.get('/patients')
            .then(response => {
                dispatch(fetchPatientsSuccess(response.data));
            })
            .catch(error => {
                dispatch(fetchPatientsFailure(error));
            });
    };
};
