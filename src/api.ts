import queryString from "query-string";

export interface hiringCompany {
  id: null;
  name: string;
  url: null;
  description: null;
}

export interface job {
  id: string;
  name: string;
  city: string;
  hiring_company: hiringCompany;
  posted_time: string;
  country: string;
  buyer_type: string;
  industry_name: string;
  has_zipapply: boolean;
  last_plan_name: string | null;
  category: string;
  posted_time_friendly: string;
  location: string;
  snippet: string;
  url: string;
  salary_max_annual: number;
  salary_min_annual: number;
  salary_interval: string;
  has_non_zr_url: string;
  job_age: number;
  salary_source: string;
  state: string;
  salary_max: number;
  salary_min: number;
  source: string;
}
// when adding to this, update fieldNames as well
export interface searchFields {
  location?: string | null;
  search?: string | null;
  refine_by_salary?: number | null;
  radius_miles?: number;
  days_ago?: number;

}

const BASE_API_URL = "https://api.ziprecruiter.com/jobs/v1/";
/** query the zipRecruiter api */
export async function zipFetch(fields: searchFields) {
  const queryParams = {
    ...fields,
    api_key: process.env.REACT_APP_ZIP_RECRUITER_API_KEY
  };
  const fullUrl = BASE_API_URL + "?" + queryString.stringify(queryParams);
  return (await fetch(fullUrl)).json();
}
