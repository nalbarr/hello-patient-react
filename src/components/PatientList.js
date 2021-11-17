// NAA. 1. remove useState?; will be replaced by redux via useDispatch, useSelector
import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
import { Link } from "react-router-dom";

// NAA. 2. replace service? with redux
import PatientDataService from "../services/PatientService";
import { useDispatch, useSelector } from "react-redux";
// NAA. RTK re-factor 9.
// import { fetchPatients } from "../actions/patients";
import { patientsActions } from "../store";
import { getPatientData } from "../selectors";

const PatientsList = () => {
  // NAA. 3. Instrument with redux dispatcher
  const dispatch = useDispatch();

  // NAA. 3. Pivot to redux
  //useEffect(() => {
  //  retrievePatients();
  //}, []);
  useEffect(() => {
    // NAA. RTK re-factor 8.
    // - move to slice reducer method
    // dispatch(fetchPatients());
    dispatch(patientsActions.getPatientData());
  }, [dispatch]);

  // NAA. 4. Pivot to redux. Map local state to redux selector
  const initialPatientsData = useSelector(getPatientData);

  // const [patientsData, setPatientsData] = useState([]);
  const [patientsData, setPatientsData] = useState(initialPatientsData);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrievePatients = () => {
    PatientDataService.getAll()
      .then(response => {
        setPatientsData(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievePatients();
    setCurrentPatient(null);
    setCurrentIndex(-1);
  };

  const setActivePatient = (patient, index) => {
    setCurrentPatient(patient);
    setCurrentIndex(index);
  };

  const removeAllPatients = () => {
    PatientDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    PatientDataService.findByName(searchName)
      .then(response => {
        setPatientsData(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Patients List</h4>

        <ul className="list-group">
          {patientsData &&
            patientsData.map((patient, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePatient(patient, index)}
                key={index}
              >
                {patient.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllPatients}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentPatient ? (
          <div>
            <h4>Patient</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentPatient.name}
            </div>
            <div>
              <label>
                <strong>Active:</strong>
              </label>{" "}
              {currentPatient.active ? "Active" : "Inactive"}
            </div>

            <Link
              to={"/patients/" + currentPatient.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Patient...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsList;

// NAA.  5. Not sure why below does not work
// - connect component to store
// function mapStateToProps(state) {
//   return { patientsData: state.patientsData }
// }
// export default connect(mapStateToProps)(PatientsList);
