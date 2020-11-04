import React, { useState } from "react";
import PatientDataService from "../services/PatientService";

const AddPatient = () => {
    const initialPatientState = {
        id: null,
        name: "",
        active: false,
    };
    const [patient, setPatient] = useState(initialPatientState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setPatient({ ...patient, [name]: value });
    };

    const savePatient = () => {
        var data = {
            name: patient.name,
            active: patient.active
        };

        PatientDataService.create(data)
            .then(response => {
                setPatient({
                    id: response.data.id,
                    name: response.data.name,
                    status: response.data.status
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newPatient = () => {
        setPatient(initialPatientState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newPatient}>
                        Add
          </button>
                </div>
            ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={patient.name}
                                onChange={handleInputChange}
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="active">Active</label>
                            <input
                                type="text"
                                className="form-control"
                                id="active"
                                required
                                value={patient.active}
                                onChange={handleInputChange}
                                name="active"
                            />
                        </div>

                        <button onClick={savePatient} className="btn btn-success">
                            Submit
          </button>
                    </div>
                )}
        </div>
    );
};

export default AddPatient;
