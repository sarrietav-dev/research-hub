# Research-Hub

API Endpoints: [<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/25495148-783b1dd4-9108-4c0a-bac5-2dbe5be29453?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D25495148-783b1dd4-9108-4c0a-bac5-2dbe5be29453%26entityType%3Dcollection%26workspaceId%3Da4ce8c89-01f1-4b1f-91bb-6a89a7c1db44)

## How to run the backend

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js v20.9.0](https://nodejs.org/en/)

### Steps

1. Clone the repository
2. Run `npm install` in the server directory
3. Run `docker-compose up db -d` in the root directory
4. Run `npm run prisma:migrate:dev` in the server directory
5. Run `npm run prisma:seed` in the server directory if you want to seed the database
6. Run `docker-compose up server` in the root directory
