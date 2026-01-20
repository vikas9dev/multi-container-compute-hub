# ComputeHub | Multi-Container Hub

![Build Status](https://github.com/vikas9dev/multi-container-compute-hub/actions/workflows/deploy.yml/badge.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![AWS](https://img.shields.io/badge/AWS-FF9900.svg?logo=amazon-aws&logoColor=white)
![Elastic Beanstalk](https://img.shields.io/badge/AWS%20Elastic%20Beanstalk-FF9900.svg?logo=amazon-aws&logoColor=white)
![RDS Postgres](https://img.shields.io/badge/RDS%20Postgres-%23316192.svg?logo=postgresql&logoColor=white)
![ElastiCache Redis](https://img.shields.io/badge/ElastiCache%20Redis-%23DD0031.svg?logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?logo=nginx&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?logo=redis&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB)

## ✨ Preview

![ComputeHub Dashboard](assets/compute-hub-dashboard.png)

A high-performance, distributed system architecture for processing computational tasks at scale. ComputeHub demonstrates how to orchestrate a full-stack microservices environment using Docker, Redis for event-driven coordination, and Nginx for intelligent routing.

## Services

| Service | Docker Hub Image | Description |
| :--- | :--- | :--- |
| **Client** | [`vikas9dev/computehub-client`](https://hub.docker.com/r/vikas9dev/computehub-client) | Frontend React Application (Nginx-served) |
| **Server** | [`vikas9dev/computehub-server`](https://hub.docker.com/r/vikas9dev/computehub-server) | Backend Express API & Traffic Handler |
| **Worker** | [`vikas9dev/computehub-worker`](https://hub.docker.com/r/vikas9dev/computehub-worker) | Background Task Processor (Fibonacci) |
| **Nginx** | [`vikas9dev/computehub-nginx`](https://hub.docker.com/r/vikas9dev/computehub-nginx) | Primary Routing & Reverse Proxy |

## 🏗️ Architecture Overview

The system is built on a resilient, multi-container architecture designed for scalability and performance:

- **Frontend (React)**: Modern dashboard with a glassmorphism design.
- **API Gateway (Nginx)**: Handles routing between client assets and backend services.
- **Backend API (Express)**: Manages incoming requests and validates tasks.
- **Message Broker (Redis)**: Uses Pub/Sub to trigger background workers.
- **Compute Worker (Node.js)**: Dedicated service for heavy computational logic.
- **Data Persistence (Postgres)**: Final storage for completed task history.

### Production deployment topology (AWS)

```mermaid
%%{init: {'theme': 'dark'}}%%
graph TD
  Internet[Internet] --> EB[Elastic Beanstalk]

  subgraph EB_EC2[Elastic Beanstalk EC2]
    RN[Routing Nginx :80]
    CN[Client Nginx :3000]
    API[Express API :5000]
    W[Worker]
  end

  API --> RDS[RDS Postgres :5432]
  API --> EC[ElastiCache Redis :6379]
  W --> EC

  %% High-contrast styles for dark backgrounds
  style Internet fill:#222,stroke:#fff,stroke-width:2px,color:#fff
  style EB fill:#0f172a,stroke:#fff,stroke-width:2px,color:#fff
  style RN fill:#1e293b,stroke:#8b5cf6,stroke-width:2px,color:#fff
  style CN fill:#0f172a,stroke:#61dafb,stroke-width:2px,color:#fff
  style API fill:#0f172a,stroke:#f97316,stroke-width:2px,color:#fff
  style W fill:#0f172a,stroke:#06b6d4,stroke-width:2px,color:#fff
  style RDS fill:#1e293b,stroke:#10b981,stroke-width:2px,color:#fff
  style EC fill:#450a0a,stroke:#ef4444,stroke-width:2px,color:#fff
```

Detailed architecture information can be found in [ARCHITECTURE.md](https://github.com/vikas9dev/multi-container-compute-hub/blob/main/ARCHITECTURE.md).

## ⚡ Quick Start

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your machine.

### Run in Development
1. Clone the repository:
   ```bash
   git clone https://github.com/vikas9dev/multi-container-compute-hub.git
   cd multi-container-compute-hub
   ```
2. Start the orchestration with Docker Compose:
   ```bash
   docker compose up --build
   ```
3. Access the dashboard:
   👉 **http://localhost:3000**

## ☁️ AWS Deployment (Elastic Beanstalk + RDS + ElastiCache)

This project supports a production deployment on **AWS Elastic Beanstalk (Docker / Amazon Linux 2023)** using the root `docker-compose.yml`.

### Production architecture
- **Elastic Beanstalk** runs the application containers (`nginx`, `client`, `api`, `worker`) on an EC2 instance.
- **RDS (Postgres)** is used for persistent storage (history/audit log).
- **ElastiCache (Redis OSS)** is used for pub/sub + caching computed results.

### Required Elastic Beanstalk environment variables
Set these in Beanstalk **Environment properties**:

- `REDIS_HOST`: ElastiCache **Primary endpoint hostname only** (omit `:6379`)
- `REDIS_PORT`: `6379`
- `PGHOST`: RDS endpoint
- `PGPORT`: `5432`
- `PGUSER`: your DB user (example: `postgres`)
- `PGPASSWORD`: your DB password
- `PGDATABASE`: your DB name (example: `fibvalues`)

### Networking requirements (Security Groups)
To let Beanstalk talk to RDS/ElastiCache, attach the same security group to all three and allow:

- **TCP 5432** (Postgres) from **source = same security group**
- **TCP 6379** (Redis) from **source = same security group**

### Important: ElastiCache encryption setting
If **Transit encryption mode** is `Required`, the Redis client in this app (non‑TLS) may fail to connect and `/api/values/current` can time out.

Set **Transit encryption mode** to **Preferred**.

### CI/CD (GitHub Actions)
GitHub Actions builds/tests/pushes Docker images to Docker Hub and deploys to Beanstalk by uploading `docker-compose.yml` (see `.github/workflows/deploy.yml`).

## 🔧 Features
- **Event-Driven Workflow**: Real-time task queuing via Redis.
- **Scalable Workers**: Add more compute power by scaling the worker service.
- **Hot-Reloading Environment**: Seamless development with volume-mapped containers.
- **Resilient Infrastructure**: Automatic service restarts and robust error handling.
- **CI/CD Pipeline**: Fully automated testing and deployment workflow using GitHub Actions.

## 🛠️ Developed with
- **Docker & Docker Compose** (Orchestration)
- **Nginx** (Reverse Proxy & Routing)
- **Redis** (In-memory Cache & Pub/Sub)
- **PostgreSQL** (Relational Database)
- **Node.js / Express** (RESTful API)
- **React** (Modern UI Hooks & Component Architecture)
- **GitHub Actions** (CI/CD Automation)

---
