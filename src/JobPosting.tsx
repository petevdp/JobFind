import React, { useState, useReducer, useEffect } from 'react';
import { job } from './types';


interface JobPostingProps {
  job: job;
};

/**
- primary
  name
  hiring_company
  location,
  posted_time_friendly
  url

- secondary - click on the entry and you will get more info:
  snippet
  salary
  source
*/

const JobPosting: React.FC<React.PropsWithChildren<JobPostingProps>> = ({job}) => {
  const { name, } = job;
  return (
    <section className="job-posting">
      <span className="title">{name}</span>
      <span className="hiring-company"> </span>
      <span className="location"> </span>
    </section>
  )
}

export default JobPosting;