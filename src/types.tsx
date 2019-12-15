
export interface hiringCompany {id: null; name: string; url: null; description: null};

export interface job {
    id: string;
    name: string;
    hiring_company: hiringCompany;
    posted_time_friendly: string;
    location: "us";
    snippet: string;
    url: string;
};
