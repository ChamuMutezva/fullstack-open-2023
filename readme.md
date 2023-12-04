# Fullstack Open

## Part 0

### Exercise 0.4

```mermaid
---
title: submiting form notes
---
sequenceDiagram    
    participant browser
    participant server
    browser-->>server: POST the form data and validate
    server-->>browser:  URL Redirect - 302 HTTP GET request address    
    browser-->>server: GET the CSS stylesheet
    server-->>browser: CSS Stylesheet
    browser-->>server: GET the JS file
    server-->>browser: JS file
    browser-->>server: GET the data.json file
    server-->>browser: data.json file
```

### Exercise 0.5

```mermaid
---
title: Exercise 0.5
---
sequenceDiagram
    participant browser
    participant server
    browser-->>server: GET notes page
    server-->>browser: HTML Document
    browser-->>server: GET the CSS stylesheet
    server-->>browser: CSS Stylesheet
    browser-->>server: GET JS file
    server-->>browser: JS file
    browser-->>server: GET the json file
    server-->>browser: JSON file
```

### Exercise 0.6

```mermaid
---
title: Exercise 0.6
---
sequenceDiagram
    participant browser
    participant server
    browser-->>server: POST new note to server
    server-->>browser: Status 201 created
    browser-->>server: add new note to list
```
