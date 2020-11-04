import React, { useState, useEffect } from "react";
import PatientDataService from "../services/PatientService";
import { Link } from "react-router-dom";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrievePatients();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrievePatients = () => {
    PatientDataService.getAll()
      .then(response => {
        setPatients(response.data);
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
        setPatients(response.data);
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
          {patients &&
            patients.map((patient, index) => (
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
