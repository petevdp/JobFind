import React, { useState, useReducer, useEffect } from 'react';
import { job} from './types';
import JobPosting from './JobPosting';


/** properties to compare from a job, in precedence order
 *  for compareJobElements */
const keysToCompare = [
  'city',
  'state',
  'country'
]

/**
 * determines which element should go first in a list
 * a and b passed as any to allow keysToCompare values
 * to not raise typeerrors
 *
 *
 * unused right now, doing only server side sorting
*/
const compareJobElements = (a: any, b: any) => {
  for (let keyToCompare of keysToCompare) {
      let aHasKey = a[keyToCompare] !== "";
      let bHasKey = b[keyToCompare] !== "";
      console.log('ahas: ', aHasKey);
      console.log('bhas: ', bHasKey);
      if (aHasKey === bHasKey) {
        continue;
      } else if (aHasKey && !bHasKey) {
        console.log("a: ", b[keyToCompare]);
        return -1;
      } else {
        console.log("b: ", b[keyToCompare]);
        return 1
      }
  }
  console.log('return 0');
  return 0;
}

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