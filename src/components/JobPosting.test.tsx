import { render } from '@testing-library/react';
import React from 'react';
import { job } from '../api';
import JobPosting from './JobPosting';

const testJob: job = {
  "posted_time_friendly": "25 days ago",
  "country": "US",
  "salary_min_annual": 117500,
  "snippet": "GET TOP PAY GREAT MILES AND DRIVE A KENWORTH T680 COTC has team flatbed truck driving job opportunities available for experienced CDL Class A drivers. We require a clean MVR and verifiable, driving&nbsp;...",
  "category": "",
  "buyer_type": "direct",
  "posted_time": "2019-11-26T16:21:02",
  "name": "CDL-A Regional Flatbed Truck Driver",
  "industry_name": "Transportation and Storage",
  "has_zipapply": true,
  "city": "Vancouver",
  "url": "https://www.ziprecruiter.com/clk/kuXW_eOhoMLixtGquP_id-pVYJ1IPTgGef35MJPfCGEzGbZFZC8ty0XCOemRPVhoRNHqxXb-JRlyzpZSFeoDHmSE6IwI_DAdFiiu5dEpJkKht-UBclZuZKkfKQqEJaaosGUv4_N_l2c012itKxmeKn3ESwYvyAkGQk1WS5WIqKzmuECs5Enx02VhIxHUn8MOnHTbnrwN2WcicqswqMsaIj5JxeZ19RsAekIEHlAxWM7KLEkOZJvjaHUJIHQVOfssiEQZKTOHUAran5WrBIU1alyXmlPLyLsJC7GtW-Amy86NHIYUYSQn24usGJDv00p2wfA2aQCczw13VktJTO1hgnlLYG3uGa1HnBniL2R8tBBJ9_g1vq0YPYLdr7842i8dgxcPMinSdwBstBDe_0t8RpcOxYg6n_9P388a-lcwo_K9HQpFZaZ3_XTER6zIF6YfkMj59pdacXRWnESjxemMKxXt9aEVmS9HaMAkK1mfv8YQY7tPRrTVUWV4IFuOYTteznBKpcBh6bJ78m7f0x1DtiThxnHmuEQ-ttGg9D0wZdrIaYQl9BO4EuMOAVwI0HitTkOllLkrSwQCpzqFXV1p6skzeqcchXREoFHobnH2hTm8tCrWZpStpVAF6OgdqFcqOiuFE-wl33r98w3duyh1QoAYnpkBjSHQbfcxw1V27bPOpqCqOYNM9HDQdG_zft8KXPH9Ys11VERO7c3pDyvKt4vWQx67uWHQ4L5uax8jAeAhSSIZ1RUdHBA73WpFrwBep5yMMFKKvN6heglVScRQeA.37f17d8ef9393ea160d44966aec3eaea",
  "location": "Vancouver, WA, USA",
  "last_plan_name": null,
  "hiring_company": {
    "url": null,
    "description": null,
    "name": "Central Oregon Truck Company",
    "id": null
  },
"salary_interval": "weekly",
"salary_max_annual": 167250,
"has_non_zr_url": "",
"job_age": 25,
"salary_source": "parsed",
"state": "WA",
"salary_max": 3345,
"salary_min": 2350,
"source": "Central Oregon Truck Company",
"id": "centraloregontruck_zipapply_cpcdf726540df726540-12c5c879"
};

it('displays job name', () => {
  const { getByText } = render(<JobPosting job={testJob} />);
  expect(getByText(testJob.name)).toBeInTheDocument();
})

// TODO figure out how to match markup
it('displays job snippet', () => {
  const { getByTitle } = render(<JobPosting job={testJob} />);
  expect(getByTitle('job-snippet')).toBeInTheDocument();
})

it('displays job salary', () => {
  const salaryMinInput = 117500;
  const salaryMaxInput = 167250;

  const salaryDisplay = "$117,500 to $167,250";

  const localTestJob: job = {
    ...testJob,
    salary_min_annual: salaryMinInput,
    salary_max_annual: salaryMaxInput,
  }

  const { getByText } = render(<JobPosting job={localTestJob} />);
  expect(getByText(salaryDisplay)).toBeInTheDocument();
})