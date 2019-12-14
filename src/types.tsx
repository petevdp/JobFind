
export interface hiringCompany {id: null; name: string; url: null; description: null};

export interface job {
    id: string;
    name: string;
    hiring_company: hiringCompany;
    location: "us";
    snippet: string;
    url: string;
};
