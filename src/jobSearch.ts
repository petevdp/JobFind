import { useState, useEffect } from "react";
import isObjEmpty from "lodash/isEmpty";
import queryString from "query-string";
import { job } from "./types";
import { setServers } from "dns";

// when adding to this, update fieldNames as well
export interface searchFields {
  location?: string | null;
  search?: string | null;
  refine_by_salary?: number | null;
  radius_miles?: number;
  days_ago?: number;
}

type fieldName =
  | "search"
  | "location"
  | "refine_by_salary"
  | "days_ago"
  | "radius_miles";

const BASE_API_URL = "https://api.ziprecruiter.com/jobs/v1/";

/** query the zipRecruiter api */
async function zipFetch(fields: searchFields) {
  const queryParams = {
    ...fields,
    api_key: process.env.REACT_APP_ZIP_RECRUITER_API_KEY
  };
  const fullUrl = BASE_API_URL + "?" + queryString.stringify(queryParams);
  return (await fetch(fullUrl)).json();
}

type searchStatus = "noSearches" | "notFound" | "loading" | "success";
interface searchState {
  userFields: searchFields;
  jobList: Array<job>;
  status: searchStatus;
  setUrlParams: boolean;
}

export interface jobSearch {
  onFieldChange: (value: any, fieldName: fieldName) => void;
  onSearch: (fields?: searchFields) => void;
  userFields: searchFields;
  jobList: Array<job>;
  status: searchStatus;
}

/** if query params or the user hasn't
 * provided fields they're replaced by ones included here */
const baseFields: searchFields = {
  refine_by_salary: 100000,
  days_ago: 100
};

/**
 * update search fields, make searches, and get output
 * the provided initFields will be queried by the api on mount.
 */
export function useJobSearch(initFields: searchFields): jobSearch {
  const [state, setState] = useState({
    userFields: { ...baseFields, ...initFields },
    jobList: [],
    status: "noSearches",
    setUrlParams: false
  } as searchState);
  const { userFields: fields, jobList, status } = state;

  function onFieldChange(value: any, fieldName: fieldName) {
    setState({
      ...state,
      userFields: { ...state.userFields, [fieldName]: value }
    });
  }

  function onSearch() {
    setState({
      ...state,
      status: 'loading'
    });
    zipFetch(fields).then((data: any) => {
      setState({
        ...state,
        jobList: data.jobs,
        status: data.jobs.length > 0 ? "success" : "notFound"
      });
    });
  }

  useEffect(() => {
    // if there are default
    if (status === "noSearches" && !isObjEmpty(initFields)) {
      zipFetch(initFields).then((data: any) => {
        setState({
          ...state,
          jobList: data.jobs,
          status: data.jobs.length > 0 ? "success" : "notFound"
        });
      });
    }
  }, [initFields, state, status]);

  return {
    onFieldChange,
    onSearch,
    userFields: fields,
    jobList,
    status
  };
}
