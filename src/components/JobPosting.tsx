import React from "react";
import { job } from "../types";
import SlideToggle from "react-slide-toggle";
import zipRecruiterLogo from "../assets/zipRecruiterLogo.png";
import { Table } from "semantic-ui-react";

interface JobPostingProps {
  job: job;
}

function formatSalary(salaryNum: number) {
  // regex is too hard
  const salary = salaryNum.toString();
  const leftOver = salary.length % 3;
  const chunks = leftOver !== 0 ? [salary.slice(0, leftOver)] : [];

  for (let i = leftOver; i < salary.length; i += 3) {
    chunks.push(salary.slice(i, i + 3));
  }

  return chunks.join(",");
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
    <Table.Row className="job-posting">
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{hiring_company.name}</Table.Cell>
      <Table.Cell>{location}</Table.Cell>
      <Table.Cell>{formatSalary(salary_min_annual)} - {formatSalary(salary_max_annual)}</Table.Cell>
      <Table.Cell>{posted_time_friendly}</Table.Cell>
      {/* <span className="hiring-company">{hiring_company.name}</span>
      <span className="location">{location}</span>
      <span className="posted-time">{posted_time_friendly}</span>
      <div className="url-container">
        <a className="url" href={url} onClick={onUrlClick}>
          <img src={zipRecruiterLogo} alt="url" width={30} height={30} />
        </a>
      </div>
      <div className="collapsible">
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
      </div> */}
    </Table.Row>
  );
};

export default JobPosting;
