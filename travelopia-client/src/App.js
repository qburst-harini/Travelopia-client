import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TravellersForm from "./travelers-form";
import TravellersList from "./travellers-list";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<TravellersForm />}></Route>
        <Route
          exact
          path="/travellers-list"
          element={<TravellersList />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
