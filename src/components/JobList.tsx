import React, { useReducer } from "react";
import { job } from "../types";
import JobPosting from "./JobPosting";
import upArrow from "../assets/keyboard_arrow_up-24px.svg";
import downArrow from "../assets/keyboard_arrow_down-24px.svg";
import { Table, Button } from "semantic-ui-react";
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

  const jobElements = jobList
    .sort((a, b) =>
      ((sortMap[activeOption] as unknown) as optionSort)(a, b, toggle)
    )
    .map(job => <JobPosting key={job.id} job={job} />);

  let arrow;
  if (toggle === "min") {
    arrow = downArrow;
  } else if (toggle === "max") {
    arrow = upArrow;
  } else {
  }

  return (
    <Table padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Company</Table.HeaderCell>
          <Table.HeaderCell>Snippet From Posting</Table.HeaderCell>
          <Table.HeaderCell>Location</Table.HeaderCell>
          <Table.HeaderCell>Salary</Table.HeaderCell>
          <Table.HeaderCell>Days Ago</Table.HeaderCell>
          <Table.HeaderCell>Link</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{jobElements}</Table.Body>
    </Table>
  );
};

export default JobList;
