import React from "react";
import { useJobSearch, searchFields } from "../jobSearch";
import queryString from "query-string";
import SlideToggle from "react-slide-toggle";
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
  const defaultFields = (queryString.parse(
    // eslint-disable-next-line no-restricted-globals
    location.search
  ) as unknown) as searchFields;
  const { jobList, userFields, onFieldChange, onSearch, status } = useJobSearch(
    defaultFields
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQueryParams(userFields);
    onSearch();
  };

  return (
    <SlideToggle
      collapsed={false} // TEMPORARY SHOULD BE TRUE
      render={({ toggle, setCollapsibleElement }: any) => (
        <div className="search-container">
          {statusMessageMap[status]()}
          <form id="search-form" onSubmit={onSubmit}>
            <label className="location-label">Location</label>
            <label className="keywords-label">Keywords</label>
            <input
              name="location"
              type="text"
              value={userFields.location}
              onChange={e => onFieldChange(e.target.value, "location")}
              placeholder={defaultFields.location}
            />
            <input
              name="keywords"
              value={userFields.search}
              onChange={e => onFieldChange(e.target.value, "search")}
              placeholder={defaultFields.search}
            />
            <div className="advanced-options" ref={setCollapsibleElement}>
              <h4 className="advance-options-title">Advanced Options</h4>
              <label className="min-salary-label">Mininum Salary</label>
              <input
                name="min-salary"
                type="number"
                // || undefined allows field to be blank
                value={userFields.refine_by_salary}
                onChange={e => {
                  e.preventDefault();
                  onFieldChange(Number(e.target.value), "refine_by_salary");
                }}
              />
              <label className="radius-label">Radius (Miles)</label>
              <input
                name="radius"
                type="number"
                value={userFields.radius_miles}
                onChange={e => {
                  e.preventDefault();
                  onFieldChange(Number(e.target.value), "radius_miles");
                }}
              />
              <label className="days-ago-label">Days Ago</label>
              <input
                name="days-ago"
                type="number"
                value={userFields.days_ago}
                onChange={e => {
                  e.preventDefault();
                  onFieldChange(Number(e.target.value), "days_ago");
                }}
              />
            </div>
            <div className="button-row">
              <input type="submit" />
              <button
                type="button"
                className="advanced-options-btn"
                onClick={toggle}
              >
                Toggle Advanced Options
              </button>
            </div>
          </form>
          <JobList jobList={jobList} />
        </div>
      )}
    />
  );
};

export default Search;
