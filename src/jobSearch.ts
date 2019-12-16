import { useState, useEffect } from "react";
import isObjEmpty from "lodash/isEmpty";
import { job } from "./types";

export interface searchFields {
  location?: string;
  search?: string;
}

type fieldName = "search" | "location";

const BASE_API_URL = "https://api.ziprecruiter.com/jobs/v1";

/** query the zipRecruiter api */
async function zipFetch({ location, search }: searchFields) {
  const fullUrl = encodeURI(
    BASE_API_URL +
      `?api_key=${process.env.REACT_APP_ZIP_RECRUITER_API_KEY}&location=${location}&search=${search}`
  );
  return (await fetch(fullUrl, { mode: "cors" })).json();
}

type searchStatus = "noSearches" | "notFound" | "success";
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

/** update search fields, make searches, and get output */
export function useJobSearch(defaultFields: searchFields): jobSearch {
  const [state, setState] = useState({
    userFields: defaultFields,
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
    zipFetch(fields).then((data: any) => {
      setState({
        ...state,
        jobList: data.jobs,
        status: data.jobs.length > 0 ? "success" : "notFound"
      });
    });
  }

  useEffect(() => {
    if (status === "noSearches" && !isObjEmpty(defaultFields)) {
      zipFetch(defaultFields).then((data: any) => {
        setState({
          ...state,
          jobList: data.jobs,
          status: data.jobs.length > 0 ? "success" : "notFound"
        });
      });
    }
  }, [defaultFields, state, status]);

  return {
    onFieldChange,
    onSearch,
    userFields: fields,
    jobList,
    status
  };
}
