# Docker Node MongoDB Example

> Simple example of a dockerized Node/Mongo app

## Quick Start

```bash
# Run in Docker
docker-compose up --build
# use -d flag to run in background

# Tear down
docker-compose down

# ROUTES
FILTER - http://localhost:3311/news/filter?start_date=&&end_date=
SORT options(acs, desc) - http://localhost:3311/news/sort?order= 
