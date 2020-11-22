import { get } from "lodash";

// NAA.
// -lodash provides a functional api wrapper around collections
// - i.e., get(...) is like an FP option
export const getPatientData = state => get(state.observations, "patientData");
export const getActivePatientData = state => get(state.observations, "patientData").filter(patient => patient.active === true);
export const getPatientIsFetching = state => get(state.observations, "isFetching");
export const getPatientIsError = state => get(state.observations, "isError");