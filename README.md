# Victini  

Victini is a full-stack web application project  
that utilizes **Docker containers**.  

The project is split into two main parts:  
- **Frontend** → Vite + Tailwind  
- **Backend** → Hono + Postgres  

---

## Requirements  

Make sure these are installed before you begin:  
- [Node.js](https://nodejs.org/) (v20 or higher recommended)  
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)  
- [Git](https://git-scm.com/downloads)  

---

## Installation  

Clone the repository:  

```bash
git clone https://github.com/Beldumite/victini.git
cd victini

```

install all dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```
start the projects
```bash
docker compose up --build
```
stop the projecst
```bash
docker compose stop
```