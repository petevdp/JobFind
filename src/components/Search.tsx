import React from "react";
import { jobSearch } from "../jobSearch";
import JobList from "./JobList";

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

type SearchProps = jobSearch;

const Search: React.FC<React.PropsWithChildren<SearchProps>> = ({
  jobList,
  fields,
  onFieldChange,
  onSearch,
  status
}: jobSearch) => {
  // const { jobList, fields, onFieldChange, onSearch, status } = useJobSearch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          value={fields.location}
          onChange={e => onFieldChange(e.target.value, "location")}
          placeholder="location"
        />
        <label className="keywords-label">Keywords</label>
        <input
          name="keywords"
          type="text"
          value={fields.search}
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
