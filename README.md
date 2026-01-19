# 🚀 ComputeHub | Multi-Container Task Engine

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?logo=nginx&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?logo=redis&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB)

## ✨ Preview

![ComputeHub Dashboard](assets/compute-hub-dashboard.png)

A high-performance, distributed system architecture for processing computational tasks at scale. ComputeHub demonstrates how to orchestrate a full-stack microservices environment using Docker, Redis for event-driven coordination, and Nginx for intelligent routing.

## 🏗️ Architecture Overview

The system is built on a resilient, multi-container architecture designed for scalability and performance:

- **Frontend (React)**: Modern dashboard with a glassmorphism design.
- **API Gateway (Nginx)**: Handles routing between client assets and backend services.
- **Backend API (Express)**: Manages incoming requests and validates tasks.
- **Message Broker (Redis)**: Uses Pub/Sub to trigger background workers.
- **Compute Worker (Node.js)**: Dedicated service for heavy computational logic.
- **Data Persistence (Postgres)**: Final storage for completed task history.

Detailed architecture information can be found in [ARCHITECTURE.md](./ARCHITECTURE.md).

## ⚡ Quick Start

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your machine.

### Run in Development
1. Clone the repository:
   ```bash
   git clone https://github.com/[your-username]/multi-container-compute-hub.git
   cd multi-container-compute-hub
   ```
2. Start the orchestration with Docker Compose:
   ```bash
   docker compose up --build
   ```
3. Access the dashboard:
   👉 **http://localhost:3050**

## 🔧 Features
- **Event-Driven Workflow**: Real-time task queuing via Redis.
- **Scalable Workers**: Add more compute power by scaling the worker service.
- **Hot-Reloading Environment**: Seamless development with volume-mapped containers.
- **Resilient Infrastructure**: Automatic service restarts and robust error handling.

## 🛠️ Developed with
- **Docker & Docker Compose** (Orchestration)
- **Nginx** (Reverse Proxy & Routing)
- **Redis** (In-memory Cache & Pub/Sub)
- **PostgreSQL** (Relational Database)
- **Node.js / Express** (RESTful API)
- **React** (Modern UI Hooks & Component Architecture)

---
