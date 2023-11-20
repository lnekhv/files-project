# Adverity Full-stack challenge
## Requirements
### Requirement #1

*As a user I need to upload `.csv` file and be able to preview its content in a table*

Please use `users_posts_audience.csv` file for testing, it contains users' posts views data

### Requirement #2

*As a user I would like to see the list of all files I've uploaded, so I can choose the file I want to preview*

### Requirement #3

*As a user I would like to enrich my data file with additional details fetched from API endpoint*

- User should be able to input API endpoint for fetching external data, you can use following endpoints for testing:
https://jsonplaceholder.typicode.com/posts/, https://jsonplaceholder.typicode.com/users/
- User should be able to select key column name from data file that would be used for joining data, by default first column should be pre-selected
- User should be able to input key name for API response that would be used for the other side of join
- Based on selected keys, enriching should add all keys from the API response for each matching row as new columns  
- Enriching existing file should create a new file accessible in the listing from **Requirement #2**, original file should not be modified


## Tech Stack
    - FastApi
    - PostgreSQL
    - React
    - TypeScript


## Installation process
### Database

To run database docker container locally:
```
cd backend/db
docker-compose up -d
```


### Backend
To run backend docker container locally:

```
cd backend/backend/docker
docker-compose up -d
```


### Frontend
To run frontend locally:

```
cd frontend/files-module
npm install
npm start
```

## Possible improvements
    - Add notifications about request result
    - Create config for backend
    - Add loaders during data loadings
    - Make responsiveness better
    - Add error handlers on backend