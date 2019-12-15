import React, { useState, useReducer, useEffect } from 'react';
import '../styles/App.scss';
import JobList from './JobList';

const BASE_URL = "https://api.ziprecruiter.com/jobs/v1";
console.log('env: ', process.env)
const { REACT_APP_ZIP_RECRUITER_API_KEY } = process.env;

async function zipFetch (location: string, search: string) {
  const fullUrl = encodeURI(BASE_URL + `?api_key=${REACT_APP_ZIP_RECRUITER_API_KEY}&location=${location}&search=${search}`);
  console.log(fullUrl);
  return (await fetch(fullUrl, {})).json();
};

interface AppState {
  location: string;
  search: string;
  jobList: Array<any>;
}

const App: React.FC = () => {
  const [appState, setState] = useState({location: 'portland', search: 'python', jobList: []} as AppState);
  const {location, search, jobList} = appState;
  useEffect(() => {
    zipFetch(location, search)
      .then((out: any) => {
        console.log(out);
        setState({...appState, jobList: out.jobs})
      });
  }, []);

  function onSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log( 'submitting');

    zipFetch(location, search)
      .then((data: any) => {
        console.log('data: ', data);
        setState({...appState, jobList: data.jobs})
      });
  };

  function onSearchChange (e: React.ChangeEvent<HTMLInputElement>) {
    setState({...appState, search: e.target.value});
  }

  function onlocationChange (e: React.ChangeEvent<HTMLInputElement>) {
    setState({...appState, location: e.target.value});
  }

  return (
    <div className="App">
      <nav id="top-bar" className="title">
        <h1 id="app-title">JobFind</h1>
      </nav>
      <div className="content-container">
        <div className="search-container">
          <h3 className="usage-prompt">Time to look for a job!</h3>
          <form id="search-form" onSubmit={onSubmit}>
            <label className="location-label">location</label>
            <input name="location" type="text" value={location} onChange={onlocationChange} placeholder="location"/>
            <label className="keywords-label">Keywords</label>
            <input name="keywords" type="text" value={search} onChange={onSearchChange} placeholder="job keywords"/>
            <div className="button-row">
              <input type="submit"/>
            </div>
          </form>
        <JobList jobs={jobList} />
        </div>
      </div>
    </div>
  );
}

export default App;
