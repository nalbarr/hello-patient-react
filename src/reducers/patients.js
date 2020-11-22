const initialData = {
    patientsData: [],
    isFetching: false,
    isError: '',
};

const patientsReducer = (state = initialData, action) => {
    switch (action.type) {
        case "GET_PATIENTS_STARTED":
            return {
                ...state,
                patientsData: [],
                isFetching: true,
                isError: ''
            };
        case "GET_PATIENTS_SUCCESS":
            return {
                ...state,
                patientsData: action.data,
                isFetching: false,
                isError: ''
            };
        case "GET_PATIENTS_FAILURE":
            return {
                ...state,
                isFetching: false,
                isError: action.error
            };
        default:
            return state;
    }
};

export default patientsReducer;
