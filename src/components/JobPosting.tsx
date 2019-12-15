import React, { useState, useReducer, useEffect } from 'react';
import { job } from './types';
import SlideToggle from 'react-slide-toggle';


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
  const { name, hiring_company, location, posted_time_friendly, snippet} = job;
  return (
    <SlideToggle
      collapsed={true}
      render={({toggle, setCollapsibleElement}: any) => (
        <section className="job-posting" onClick={toggle}>
          <span className="title">{name}</span>
          <span className="hiring-company">{hiring_company.name}</span>
          <span className="location">{location}</span>
          <span className="posted-time">{posted_time_friendly}</span>
          <div className="collapsible" ref={setCollapsibleElement}>
            <section className="snippet" dangerouslySetInnerHTML={{__html: snippet}}/>
          </div>
        </section>
      )}
    />
  )
}

export default JobPosting;