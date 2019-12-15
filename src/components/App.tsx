import React, { useState, } from "react";
import "../styles/App.scss";
import JobList from "./JobList";

const BASE_URL = "https://api.ziprecruiter.com/jobs/v1";
const { REACT_APP_ZIP_RECRUITER_API_KEY } = process.env;

async function zipFetch(location: string, search: string) {
  const fullUrl = encodeURI(
    BASE_URL +
      `?api_key=${REACT_APP_ZIP_RECRUITER_API_KEY}&location=${location}&search=${search}`
  );
  return (await fetch(fullUrl, { mode: 'cors'})).json();
}

type searchStatus = 'noSearches' | 'notFound' | 'success'
interface AppState {
  location: string;
  search: string;
  jobList: Array<any>;
  searchStatus: searchStatus;
}

const App: React.FC = () => {
  const [appState, setState] = useState({
    location: "",
    search: "",
    jobList: [],
    searchStatus: 'noSearches'
  } as AppState);
  const { location, search, jobList, searchStatus } = appState;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    zipFetch(location, search).then((data: any) => {
      setState({ ...appState, jobList: data.jobs, searchStatus: data.jobs.length > 0 ? 'success' : 'notFound' });
    });
  }

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState({ ...appState, search: e.target.value });
  }

  function onlocationChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState({ ...appState, location: e.target.value });
  }
  const statusMessageMap = {
    noSearches: () => <h3 className="usage-prompt no-searches">Time to look for a job!</h3>,
    notFound: () => <h3 className="usage-prompt not-found">No jobs matching these search terms found!</h3>,
    success: () => <h3 className="usage-prompt success">Jobs found!</h3>
  };

  const statusMessage = statusMessageMap[searchStatus]();

  return (
    <div className="App">
      <nav id="top-bar" className="title">
        <h1 id="app-title">JobFind</h1>
      </nav>
      <div className="content-container">
        <div className="search-container">
          {statusMessage}
          <form id="search-form" onSubmit={onSubmit}>
            <label className="location-label">Location</label>
            <input
              name="location"
              type="text"
              value={location}
              onChange={onlocationChange}
              placeholder="location"
            />
            <label className="keywords-label">Keywords</label>
            <input
              name="keywords"
              type="text"
              value={search}
              onChange={onSearchChange}
              placeholder="job keywords"
            />
            <div className="button-row">
              <input type="submit" />
            </div>
          </form>
          <JobList jobs={jobList} />
        </div>
      </div>
    </div>
  );
};

export default App;
