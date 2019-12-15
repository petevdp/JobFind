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
  const { name, hiring_company, location, posted_time_friendly} = job;
  return (
    <section className="job-posting">
      <span className="title">{name}</span>
      <span className="hiring-company">{hiring_company.name}</span>
      <span className="location">{location}</span>
      <span className="posted-time">{posted_time_friendly}</span>
    </section>
  )
}

export default JobPosting;