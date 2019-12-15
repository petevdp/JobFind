import React, { useState, useReducer, useEffect } from 'react';
import { job } from './types';
import SlideToggle from 'react-slide-toggle';
import zipRecruiterLogo from '../assets/zipRecruiterLogo.png';


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

- secondary - click on the entry and you will get more info
  snippet
  salary
  source
*/

const JobPosting: React.FC<React.PropsWithChildren<JobPostingProps>> = ({job}) => {

  const { name, hiring_company, location, posted_time_friendly, snippet, url } = job;
    function onUrlClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    console.log('stopping prop');
    e.nativeEvent.stopPropagation();
    e.stopPropagation();
  }
  return (
    <SlideToggle
      collapsed={true}
      render={({toggle, setCollapsibleElement}: any) => (
        <section className="job-posting" onClick={toggle}>
          <span className="title">{name}</span>
          <span className="hiring-company">{hiring_company.name}</span>
          <span className="location">{location}</span>
          <span className="posted-time">{posted_time_friendly}</span>
          <div className="url-container">
            <a className="url" href={url} onClick={onUrlClick}><img src={zipRecruiterLogo} alt="url" width={30} height={30}/></a>
          </div>
          <div className="collapsible" ref={setCollapsibleElement}>
            <h4 className="description-heading">Description</h4>
            <section className="snippet" dangerouslySetInnerHTML={{__html: snippet}}/>
          </div>
        </section>
      )}
    />
  )
}

export default JobPosting;