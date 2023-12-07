import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import Body from "./Body";

const App = () => {
    return (
        <Router>
            <Body />
        </Router>
    );
};

export default App;
