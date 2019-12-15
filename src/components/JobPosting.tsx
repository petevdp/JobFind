import React, { useState, useReducer, useEffect } from "react";
import { job } from "./types";
import SlideToggle from "react-slide-toggle";
import zipRecruiterLogo from "../assets/zipRecruiterLogo.png";

interface JobPostingProps {
  job: job;
}

function formatSalary (salary: number) {
  // regex is too hard
  const strSalary = salary.toString();
  const chunks = [];
  for (let i=0; i < strSalary.length; i += 3) {
    chunks.push(strSalary.slice(i, i + 3));
  }
  return chunks.join(',');
}

const JobPosting: React.FC<React.PropsWithChildren<JobPostingProps>> = ({
  job
}) => {
  const {
    name,
    hiring_company,
    location,
    posted_time_friendly,
    snippet,
    url,
    salary_max_annual,
    salary_min_annual
  } = job;
  function onUrlClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.nativeEvent.stopPropagation();
    e.stopPropagation();
  }
  return (
    <SlideToggle
      collapsed={true}
      render={({ toggle, setCollapsibleElement }: any) => (
        <section className="job-posting" onClick={toggle}>
          <span className="title">{name}</span>
          <span className="hiring-company">{hiring_company.name}</span>
          <span className="location">{location}</span>
          <span className="posted-time">{posted_time_friendly}</span>
          <div className="url-container">
            <a className="url" href={url} onClick={onUrlClick}>
              <img src={zipRecruiterLogo} alt="url" width={30} height={30} />
            </a>
          </div>
          <div className="collapsible" ref={setCollapsibleElement}>
            <h4 className="description-heading">Description</h4>
            <section
              className="snippet"
              dangerouslySetInnerHTML={{ __html: snippet }}
            />
            <section className="salary-container">
              <div className="salary-min">
                <label className="label">Min Salary:</label>
                <span className="value">${formatSalary(salary_min_annual)}</span>
              </div>
              <div className="salay-max">
                <label className="label">Max Salary:</label>
                <span className="value">${formatSalary(salary_max_annual)}</span>
              </div>
            </section>
          </div>
        </section>
      )}
    />
  );
};

export default JobPosting;
