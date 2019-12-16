import { useState } from "react";
import { job } from "./types";

interface searchFields {
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
  fields: searchFields;
  jobList: Array<job>;
  status: searchStatus;
}

export interface jobSearch {
    onFieldChange: (value: any, fieldName: fieldName) => void
    onSearch: () => void;
    fields: searchFields;
    jobList: Array<job>;
    status: searchStatus;
}

/** update search fields, make searches, and get output */
export function useJobSearch(): jobSearch {
  const [state, setState] = useState({
    fields: {},
    jobList: [],
    status: "noSearches"
  } as searchState);

  const { fields, jobList, status } = state;

  function onFieldChange(value: any, fieldName: fieldName) {
    setState({ ...state, fields: { ...state.fields, [fieldName]: value } });
  }

  function onSearch() {
    zipFetch(state.fields).then((data: any) => {
      setState({
        ...state,
        jobList: data.jobs,
        status: data.jobs.length > 0 ? "success" : "notFound"
      });
    });
  }

  return {
    onFieldChange,
    onSearch,
    fields,
    jobList,
    status
  };
}
