# Design
mvp: make one ip request based on user input, and return the results as a table?

## Tasks
### DONE
* get basic api request working

### TODO
* decide how to structure the resulting data for consumption

### STRECH
* unit testing
* advanced search features
* incremental searc


### Output Structure
MVP is just a set of barebones tables


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



### job object shape example
```json
  {
    buyer_type: "job_board"
    category: "",
    city: "",
    country: "us",
    has_non_zr_url: "1",
    has_zipapply: false,
    hiring_company: {id: null, name: "Wipro Limited", url: null, description: null},
    id: "linkedin_active_cpc2a583102-1586905467",
    industry_name: "Technology",
    job_age: 20,
    last_plan_name: null,
    location: "us",
    name: "Python for Data Science-Lead",
    posted_time: "2019-11-25T02:00:00",
    posted_time_friendly: "20 days ago",
    salary_interval: "yearly",
    salary_max: 148397,
    salary_max_annual: 148397,
    salary_min: 103774,
    salary_min_annual: 103774,
    salary_source: "predicted",
    snippet: "We are currently looking for <b>Python</b> Developer + Pyspark to join our team. Please find the job details below. Title : Data Science-Lead Location : Bothell, WA * Role : <b>Python</b> for Data Science-Lead",
    source: "LinkedIn",
    state: "",
    url: "https://www.ziprecruiter.com/eclk/d_O1Ff3LbrPRbkDHp08zsLRDvAEJaIM40G_hRURAcbQKfbMPpG9aazCViPLFs09zG5bmTQBHBlA_LN0xgLRpvvI_1xpymirirYYaAopLKas-ccHdo0WJ7_cDkkR1ud7jf2jKzkS1ZK7uRZ8qLg126__7Ks4JBmMwJZswtERIl_3P_7tfTRZuzn77amz46c2Zc0E1pxqMCWErcRaB-6nyJUOY5ljot3PyUoa3Fc7ME6RfnyOENqtSB07bN16b8HuyRwEgqNFekxuo8bjs2QsYsCsjCF8zleQwgg7CGUxTHsMIct-77EQHihd9mtrTmsdgooJBFG2cg8ZF_bUEwLO0rtEeFX5b8GREa8WmMmW63bWprB1KuzsmGyD0pW1mjaNaGWugioS6Xr6xtkS1GjWKrc4jL6iy5RtI_NZ5WnWNTBVOhO4dAcODgxWQu5C084ldXrXRQU1GiTm_ekn-f_Nr4wrzLkAtjKborkdEH6euBX9SDES0Xf0KN6Ke7VDloUsB_plGnCeZDh4a2_O3xafkceYKfYi2UKTu4hytsgEqYc2TjqzvNId-ghVmEpn1J_3wmsf4r8pxH4NbvjSGaz5n0C69tS7_caaXflSNaFWtD5XMKkb0G6bs9TltvkzscfJqltyTfLdJd4r7bqbJgVJ_oA.1df3a5b3a8da094835106dead0499613",
  }
```