import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "../styles/App.scss";
import { useJobSearch } from "../jobSearch";
import Search from "./Search";



const App: React.FC = () => {

  const jobSearch = useJobSearch();

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <nav id="top-bar" className="title">
          <h1 id="app-title">JobFind</h1>
        </nav>
        <div className="content-container">
          <Search {...jobSearch} />
        </div>
      </div>
    </Router>
  );
};

export default App;
