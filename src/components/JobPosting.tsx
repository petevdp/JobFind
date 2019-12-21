import React from "react";
import { job } from "../api";
import zipRecruiterLogo from "../assets/zipRecruiterLogo.png";
import { Table, Image } from "semantic-ui-react";

interface JobPostingProps {
  job: job;
}

// right now this type is just used for testing
export const displayedJobProperties = [
  "posted_time_friendly",
  "salary_min_annual",
  "salary_max_annual",
  "snippet",
  "posted_time_friendly",
  "name",
  "url",
  "location",
];

/** Add some commas and a dollar sign to a salary */
function formatSalary(salaryNum: number) {
  // regex is too hard
  const salary = salaryNum.toString();
  const leftOver = salary.length % 3;
  const chunks = leftOver !== 0 ? [salary.slice(0, leftOver)] : [];

  for (let i = leftOver; i < salary.length; i += 3) {
    chunks.push(salary.slice(i, i + 3));
  }

  return '$' + chunks.join(",");
}

/** turn the small 'us' location into a better looking USA */
function formatLocation(location: string) {
  if (location === 'us') {
    return 'USA'
  }
  return location;
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

  return (
    <Table.Row className="job-posting">
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell>{hiring_company.name}</Table.Cell>
      <Table.Cell>
        <span title="job-snippet" dangerouslySetInnerHTML={{ __html: snippet }} />
      </Table.Cell>
      <Table.Cell>{formatLocation(location)}</Table.Cell>
      <Table.Cell>
        {formatSalary(salary_min_annual)} to {formatSalary(salary_max_annual)}
      </Table.Cell>
      <Table.Cell singleLine>{posted_time_friendly}</Table.Cell>
      <Table.Cell>
        <Image src={zipRecruiterLogo} size="mini" rounded href={url}/>
      </Table.Cell>
    </Table.Row>
  );
};

export default JobPosting;
