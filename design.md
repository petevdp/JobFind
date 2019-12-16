# Design
mvp: make one ip request based on user input, and return the results as a table?

## Tasks
### DONE
* get basic api request working
* display posting from search
* basic styling for postings
* form styling (pass 1)
* nav styling (pass 1)
* add link to full posting
* add salary range to expanded job posting
* format salary
* better styling for job postings
* update query params when new search is performed
* load search defined by query params on page load
  * NOTE: not sure what the best option is to deal with the controlled vs uncontrolled issues with react, so currently forms are left blank

### TODO
* update readme
* update "description" to more accuratlly reflect contents

### MVP

* the user should be able to
  * search for jobs based on keywords and their particular location
  * see those jobs displayed first, get basic info, and visit the full posting via link

* page should be mobile-friendly and generally have decent UX

* deploy to github pages



### STRECH
* set default form values based on query params on page load
* unit testing
* advanced search features(needs more definition)
* incremental search by getting all postings returned based on location
* use location api to filter postings to a particular area by default


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

problem * the api will look for keywords in the snippet to potentially determine location. This means sorting by the provided location properties won't help us sort the entries.

I'm going to rely entirely on the api doing the sorting and just provide a bunch of search functionality based on it. This means no incremental searching unfortunately, but I could get a list of locations/keywords and use that potentially for autocompletion




