import React, { useState, useReducer, useEffect } from 'react';
import '../styles/App.scss';
import JobList from './JobList';

const BASE_URL = "https://api.ziprecruiter.com/jobs/v1";
console.log('env: ', process.env)
const { REACT_APP_ZIP_RECRUITER_API_KEY } = process.env;

async function zipFetch (city: string, search: string) {
  const fullUrl = encodeURI(BASE_URL + `?api_key=${REACT_APP_ZIP_RECRUITER_API_KEY}&city=${city}&search=${search}`);
  return (await fetch(fullUrl, {})).json();
};

interface AppState {
  city: string;
  search: string;
  jobList: Array<any>;
}

const App: React.FC = () => {
  const [appState, setState] = useState({city: 'portland', search: 'python', jobList: []} as AppState);
  const {city, search, jobList} = appState;
  useEffect(() => {
    zipFetch(city, search)
      .then((out: any) => {
        console.log(out);
        setState({...appState, jobList: out.jobs})
      });
  }, []);

  function onSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // const out = zipFetch(city, search)
    // console.log(out);
  };

  function onSearchChange (e: React.ChangeEvent<HTMLInputElement>) {
    setState({...appState, search: e.target.value});
  }

  function onCityChange (e: React.ChangeEvent<HTMLInputElement>) {
    setState({...appState, city: e.target.value});
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input name="city" type="text" value={city} onChange={onCityChange} placeholder="City"/>
        <input name="search" type="text" value={search} onChange={onSearchChange} placeholder="job keywords"/>
        <button type="submit">submit</button>
      </form>
      <JobList jobs={jobList} />
    </div>
  );
}

export default App;
