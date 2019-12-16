# Design

mvp: make one ip request based on user input, and return the results as a table?

## Tasks

### DONE

- get basic api request working
- display posting from search
- basic styling for postings
- form styling (pass 1)
- nav styling (pass 1)
- add link to full posting
- add salary range to expanded job posting
- format salary
- better styling for job postings
- update query params when new search is performed
- load search defined by query params on page load
- update readme

### TODO

- update "description" to more accurately reflect contents
- only submit form on page load if certain fields are filled
- form validation
- theme
- loading indicator for form

### MVP

- the user should be able to
  - DONE search for jobs based on keywords and a location
  - DONE see those jobs displayed first, get basic info, and visit the full posting via link
- DONE deploy to github pages

### STRECH

- DONE set default form values based on query params on page load
- DONE advanced search features
- unit testing
- incremental search with procured list of city names
- use location api to filter postings to a particular area by default

### which fields to display

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

I'm going to rely entirely on the api doing the sorting and just provide a bunch of search functionality based on it. This means no incremental searching unfortunately, but I could get a list of locations/keywords and use that potentially for autocompletion
