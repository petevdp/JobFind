import React from "react";
import "fomantic-ui-css/semantic.css";
import {
  Menu,
  Container,
  Form,
  FormTextArea,
  Label,
  Input,
  Button
} from "semantic-ui-react";
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
      collapsed={true}
      render={({ toggle, setCollapsibleElement }: any) => (
        <Container className="search-container">
          {statusMessageMap[status]()}
          <Form id="search-form" onSubmit={onSubmit}>
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
              control={Input}
              onChange={(_: any, { value }: any) =>
                onFieldChange(value, "location")
              }
              name="location"
            />
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
            <Form.Field control={Button}>Submit</Form.Field>
          </Form>
          <JobList jobList={jobList} />
        </Container>
      )}
    />
  );
};

export default Search;
