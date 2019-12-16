import React from "react";
import { useJobSearch, searchFields } from "../jobSearch";
import queryString from "query-string";
import JobList from "./JobList";

/** sets url params without reloading page */
function setQueryParams(fields: searchFields) {
  // eslint-disable-next-line no-restricted-globals
  if (history.pushState) {
    let newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      queryString.stringify(fields);
    window.history.pushState({ path: newurl }, "", newurl);
  }
}

const statusMessageMap = {
  noSearches: () => (
    <h3 className="usage-prompt no-searches">Time to look for a job!</h3>
  ),
  notFound: () => (
    <h3 className="usage-prompt not-found">
      No jobs matching these search terms found!
    </h3>
  ),
  success: () => <h3 className="usage-prompt success">Jobs found!</h3>
};

type SearchProps = {};

const Search: React.FC<React.PropsWithChildren<SearchProps>> = () => {
  // eslint-disable-next-line no-restricted-globals
  const defaultFields = queryString.parse(location.search) as searchFields;
  const { jobList, userFields, onFieldChange, onSearch, status } = useJobSearch(
    defaultFields
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQueryParams(userFields);
    onSearch();
  };

  return (
    <div className="search-container">
      {statusMessageMap[status]()}
      <form id="search-form" onSubmit={onSubmit}>
        <label className="location-label">Location</label>
        <input
          name="location"
          type="text"
          value={userFields.location}
          onChange={e => onFieldChange(e.target.value, "location")}
          placeholder="location"
        />
        <label className="keywords-label">Keywords</label>
        <input
          name="keywords"
          type="text"
          value={userFields.search}
          onChange={e => onFieldChange(e.target.value, "search")}
          placeholder="job keywords"
        />
        <div className="button-row">
          <input type="submit" />
        </div>
      </form>
      <JobList jobs={jobList} />
    </div>
  );
};

export default Search;
