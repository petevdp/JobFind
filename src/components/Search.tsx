import React from "react";
import "fomantic-ui-css/semantic.css";
import cloneDeep from "lodash/cloneDeep";
import { Container, Form, Input, Button, Loader } from "semantic-ui-react";
import { useJobSearch } from "../jobSearch";
import { searchFields } from '../api';
import queryString from "query-string";
import JobList from "./JobList";

/** sets url params without reloading page */
function setQueryParams(fields: searchFields) {
  const fieldsToSubmit = cloneDeep(fields) as any;
  for (let key in fieldsToSubmit) {
    if (!fieldsToSubmit[key] || fieldsToSubmit[key] === "0") {
      fieldsToSubmit[key] = null;
    }
  }

  // eslint-disable-next-line no-restricted-globals
  if (history.pushState) {
    let newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      queryString.stringify(fieldsToSubmit, { skipNull: true });
    window.history.pushState({ path: newurl }, "", newurl);
  }
}

const statusMessageMap = {
  noSearches: () => (
    <span className="usage-prompt no-searches">Time to look for a job!</span>
  ),
  notFound: () => (
    <span className="usage-prompt not-found">
      No jobs matching these search terms found!
    </span>
  ),
  loading: () => (
    <Loader size="small" active inline />
  ),
  success: () => <span>Jobs found</span>
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
    <Container className="search-container">
      <Form id="search-form" onSubmit={onSubmit}>
        <Form.Group widths="equal">
          <Form.Field lable="Search Terms">
            <label className="keywords-label">Keywords</label>
            <Form.Input
              name="keywords"
              value={userFields.search}
              onChange={e => onFieldChange(e.target.value, "search")}
              placeholder={defaultFields.search}
            />
          </Form.Field>
          <Form.Field
            label="Location"
            value={userFields.location}
            control={Input}
            onChange={(_: any, { value }: any) =>
              onFieldChange(value, "location")
            }
            name="location"
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            label="Minimum Salary"
            control={Input}
            name="min-salary"
            type="number"
            value={userFields.refine_by_salary}
            placeholder={defaultFields.refine_by_salary}
            onChange={(e: any, { value }: any) => {
              e.preventDefault();
              onFieldChange(Number(e.target.value), "refine_by_salary");
            }}
          />
          <Form.Field
            label="Radius (Miles)"
            control={Input}
            name="radius"
            type="number"
            value={userFields.radius_miles}
            onChange={(e: any, { value }: any) => {
              e.preventDefault();
              onFieldChange(Number(e.target.value), "radius_miles");
            }}
          />
          <Form.Field
            label="Days Ago"
            control={Input}
            name="days-ago"
            type="number"
            value={userFields.days_ago}
            onChange={(e: any, { value }: any) => {
              e.preventDefault();
              onFieldChange(Number(e.target.value), "days_ago");
            }}
          />
        </Form.Group>
        <div id="submit-row">
          <Form.Field control={Button}>Submit</Form.Field>
          {statusMessageMap[status]()}
        </div>
      </Form>
      <JobList jobList={jobList} />
    </Container>
  );
};

export default Search;
