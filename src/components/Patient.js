import React, { useState, useEffect } from "react";

import PatientDataService from "../services/PatientService";

const Patient = props => {

    const initialPatientState = {
        id: null,
        name: "",
        active: false
    };
    const [currentPatient, setCurrentPatient] = useState(initialPatientState);
    const [message, setMessage] = useState("");

    const getPatient = id => {
        PatientDataService.get(id)
            .then(response => {
                setCurrentPatient(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getPatient(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentPatient({ ...currentPatient, [name]: value });
    };

    const updateActive = status => {
        var data = {
            id: currentPatient.id,
            name: currentPatient.name,
            active: status
        };

        PatientDataService.update(currentPatient.id, data)
            .then(response => {
                setCurrentPatient({ ...currentPatient, active: status });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updatePatient = () => {
        PatientDataService.update(currentPatient.id, currentPatient)
            .then(response => {
                console.log(response.data);
                setMessage("The patient was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deletePatient = () => {
        PatientDataService.remove(currentPatient.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/patients");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentPatient ? (
                <div className="edit-form">
                    <h4>Patient</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={currentPatient.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="active">Active</label>
                            <input
                                type="text"
                                className="form-control"
                                id="active"
                                name="active"
                                value={currentPatient.active}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Active:</strong>
                            </label>
                            {currentPatient.active ? "Active" : "Inactive"}
                        </div>
                    </form>

                    {currentPatient.active ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updateActive(false)}
                        >
                            Deactivate
                        </button>
                    ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => updateActive(true)}
                            >
                                Activate
                            </button>
                        )}

                    <button className="badge badge-danger mr-2" onClick={deletePatient}>
                        Delete
          </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updatePatient}
                    >
                        Update
          </button>
                    <p>{message}</p>
                </div>
            ) : (
                    <div>
                        <br />
                        <p>Please click on a Patient...</p>
                    </div>
                )
            }
        </div >
    );
};

export default Patient;
