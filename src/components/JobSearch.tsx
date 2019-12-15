import React, { useState, useReducer, useEffect, FieldsetHTMLAttributes } from "react";
import { job } from "./types";

type fieldName = "search" | "location";

interface searchFields {

    location?: string;
    search?: string;
}
const BASE_URL = "https://api.ziprecruiter.com/jobs/v1";
console.log("env: ", process.env);
const { REACT_APP_ZIP_RECRUITER_API_KEY } = process.env;

async function jobSearch ({location ,search}: searchFields) {
  const fullUrl = encodeURI(
    BASE_URL +
      `?api_key=${REACT_APP_ZIP_RECRUITER_API_KEY}&location=${location}&search=${search}`
  );
  console.log(fullUrl);
  return (
    fetch(fullUrl, {})
    .then(response => response.json())
    .then(data => data.jobs as Array<job>)
  );
}

interface JobSearchProps {
  searchFields: searchFields;
  onSearch: (fields: searchFields) => void;
}


interface jobSearchState {
  fields: searchFields;
  jobList: Array<job>;
}

const JobSearch: React.FC<React.PropsWithChildren<JobSearchProps>> = ({
  searchFields,
  onSearch
}) => {
  const [searchState, setState] = useState({location: '', search: '', jobList: []} as JobSearchState);

  useEffect(() => {
  }, [searchFields])

  function onFieldChange (value: string, fieldname: fieldName) {
    setState({...searchState, fields: {...searchState.fields, [fieldname]: value}})
  }

  function onSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(searchState.fields);
  }

  const { location , search } = searchState.fields;

  return (
    <div className="search-container">
      <h3 className="usage-prompt">Time to look for a job!</h3>
      <form id="search-form" onSubmit={() => onSearch()}>
        <label className="location-label">Location</label>
        <input
          name="location"
          type="text"
          value={location}
          onChange={e => onFieldChange(e.target.value, "location")}
          placeholder="location"
        />
        <label className="keywords-label">Keywords</label>
        <input
          name="keywords"
          type="text"
          value={search}
          onChange={e => onFieldChange(e.target.value, "search")}
          placeholder="job keywords"
        />
        <div className="button-row">
          <input type="submit" />
        </div>
      </form>
      <JobList jobs={output.jobs} />
    </div>
  );
};

export default JobSearch;
