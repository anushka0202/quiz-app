import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Question from "./components/Question";
import Report from "./components/Report";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Defining our routes here */}
          <Route exact path="/" element={<Home />} />
          <Route path="/questions/:questionId" element={<Question />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
