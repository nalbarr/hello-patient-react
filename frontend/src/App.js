import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPatient from "./components/AddPatient";
import Patient from "./components/Patient";
import PatientList from "./components/PatientList";

function App() {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/patients" className="navbar-brand">
                    [ oa ]
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/patients"} className="nav-link">
                            Patients
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                            Add
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/patients"]} component={PatientList} />
                    <Route exact path="/add" component={AddPatient} />
                    <Route path="/patients/:id" component={Patient} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
