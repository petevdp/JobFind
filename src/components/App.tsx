import React from "react";
import "../styles/App.scss";
import Search from "./Search";

const App: React.FC = () => {
  return (
    <div className="App">
      <nav id="top-bar" className="title">
        <h1 id="app-title">JobFind</h1>
      </nav>
      <div className="content-container">
        <Search />
      </div>
    </div>
  );
};

export default App;
