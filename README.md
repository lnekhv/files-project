# Adverity Full-stack challenge

## Tech Stack
    - FastApi
    - PostgreSQL
    - React
    - TypeScript


## Installation process
### Database

To run database docker container locally:<br>
(from files-project)
```
cd backend/db
docker-compose up -d
```


### Backend
To run backend docker container locally:<br>
(from files-project)
```
cd backend/backend/docker
docker-compose up -d
```


### Frontend
To run frontend locally:<br>
(from files-project)
```
cd frontend/files-module
npm install
npm start
```

### Full installation
(from files-project)
```
cd backend/db
docker-compose up -d
cd ..
cd backend/docker
docker-compose up -d
cd ../../..
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