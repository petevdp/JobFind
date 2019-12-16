import React, { useReducer } from "react";
import { job } from "../types";
import JobPosting from "./JobPosting";
import upArrow from "../assets/keyboard_arrow_up-24px.svg";
import downArrow from "../assets/keyboard_arrow_down-24px.svg";
interface JobListProps {
  jobList: Array<job>;
}
type activeOption = "salary" | "recency" | "none";
type optionToggle = "min" | "max";

type optionSort = (a: job, b: job, toggle: optionToggle) => number;
type sortMap = {
  [option: string]: optionSort;
};

const sortMap: sortMap = {
  salary: (a, b, toggle) => {
    const averageA = Math.floor(a.salary_max_annual / a.salary_min_annual);
    const averageB = Math.floor(b.salary_max_annual / b.salary_min_annual);
    const difference = averageA - averageB;
    return toggle === "max" ? difference : -difference;
  },
  recency: (a, b, toggle) => {
    const difference =
      new Date(a.posted_time).getTime() - new Date(b.posted_time).getTime();
    return toggle === "max" ? difference : -difference;
  },
  none: () => 0
};

interface sortState {
  activeOption: activeOption;
  toggle: optionToggle;
}

const reduce: React.Reducer<sortState, activeOption> = (
  prevState,
  btnClicked
) => {
  if (btnClicked === prevState.activeOption) {
    const toggle = (["min", "max"].find(v => v !== prevState.toggle) ||
      "min") as optionToggle;
    console.log(toggle);

    return { ...prevState, toggle };
  }
  return {
    activeOption: btnClicked,
    toggle: "min"
  };
};

const JobList: React.FC<React.PropsWithChildren<JobListProps>> = ({
  jobList
}) => {
  const [{ activeOption, toggle }, dispatch] = useReducer(reduce, {
    activeOption: "none",
    toggle: "min"
  });

  console.log("times");

  const jobElements = jobList
    .sort((a, b) =>
      ((sortMap[activeOption] as unknown) as optionSort)(a, b, toggle)
    )
    .map(job => (
      <li key={job.id}>
        <JobPosting job={job} />
      </li>
    ));

  let arrow;
  if (toggle === "min") {
    arrow = downArrow;
  } else if (toggle === "max") {
    arrow = upArrow;
  } else {

  }

  return (
    <section id="job-list-container">
      <label>Sort: </label>
      <div className="list-sorting">
        <button onClick={() => dispatch("salary")}>
          Salary {activeOption === "salary" && <img alt="" src={arrow} />}
        </button>
        <button onClick={() => dispatch("recency")}>
          Recency {activeOption === "recency" && <img alt="" src={arrow} />}
        </button>
      </div>
      <ul id="job-list">{jobElements}</ul>
    </section>
  );
};

export default JobList;
