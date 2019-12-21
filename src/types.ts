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
