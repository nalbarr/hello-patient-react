// NAA. RTK re-factor 5. Remove react and react-thunk carryovers
// import { applyMiddleware, compose, createStore } from 'redux';
// import { createStore } from 'redux';
// NAA. RTK re-factor 3. Defer to RTK reducer compressed format here
// import reducers from './reducers';
// import thunk from 'redux-thunk';
import { createSlice, configureStore } from '@reduxjs/toolkit';

// NAA. RTK re-factor 5. Remove react and react-thunk carryovers
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_CsOMPOSE__ || compose;

// NAA. RTK re-factor 2. Move initial state from reducers here
const initialState = {
    patientsData: [],
    isFetching: false,
    isError: '',
};

// NAA. RTK re-factor 1. Create slice
// - slice global state by name
// - register initial state, reducers as not to have to explicity have if/then verbose checks on action.type
// - immutable state mutation via internal immer
const patientsSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // 6. RTK covers all action->reducers registration
        getPatientData(state = initialState, action) {
            switch (action.type) {
                case "GET_PATIENTS_STARTED":
                    return {
                        ...state,
                        patientsData: [],
                        isFetching: true,
                        isError: ''
                    };
                case "GET_PATIENTS_SUCCESS":
                    // NAA. RTK re-factor 10. action.payload will proxy passed in action object payloads
                    return {
                        ...state,
                        // patientsData: action.data,
                        patientsData: action.payload,
                        isFetching: false,
                        isError: ''
                    };
                case "GET_PATIENTS_FAILURE":
                    // NAA. RTK re-factor 10. action.payload will proxy passed in action object payloads                    
                    return {
                        ...state,
                        isFetching: false,
                        // isError: action.error
                        isError: action.payload
                    };
                default:
                    return state;
            }
        },
    }
});

// NAA.  RTK re-factor 4. RTK wants a global main reducer
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
// const store = createStore(patientsSlice.reducer);
const store = configureStore({
    reducer: { getPatientData: patientsSlice.reducer }
});

// NAA.  RTK re-factor 7.  create action as redux action creators (and infer dispatch)
// - avoid creating explicit action ids and action objects
// - avoid mistyping impacting switch/case on action objects
// - e.g., just call
//   patientsSlice.actions.getPatientData(...)

export const patientsActions = patientsSlice.actions;

export default store;
