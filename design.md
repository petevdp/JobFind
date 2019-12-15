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

### TODO
* decide how to structure the resulting data for consumption
* better media queries

### MVP

* the user should be able to
  * search for jobs based on keywords and their particular location
  * see those jobs displayed first, get basic info, and visit the full posting via link

* page should be mobile-friendly



### STRECH
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

How much client side sorting could I do?