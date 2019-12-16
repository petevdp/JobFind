import React, {  } from 'react';
import { job} from '../types';
import JobPosting from './JobPosting';
interface JobListProps {
  jobs: Array<job>;
};

const JobList: React.FC<React.PropsWithChildren<JobListProps>> = ({jobs}) => {
  const jobElements = jobs
    .map(job => <li key={job.id}><JobPosting job={job}/></li>);

  return (
    <ul id="job-list">
      {jobElements}
    </ul>
  )
}

export default JobList