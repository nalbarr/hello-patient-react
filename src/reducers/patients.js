// NA. Move to store
/*
const initialState = {
    patientsData: [],
    isFetching: false,
    isError: '',
};
*/

// NA. Remove verbose reducer in favor of RTK.s
/*
const patientsReducer = (state = initialState, action) => {
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
*/

// export default patientsReducer;
