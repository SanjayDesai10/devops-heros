# DevOps Final Capstone: TaskBoard Microservices Platform - Hands-on Lab

A comprehensive hands-on guide for building, containerizing, testing, and deploying the **TaskBoard** SaaS application stack: orchestrating full-stack environments with Docker Compose (FastAPI backend, React/Vite frontend, and PostgreSQL database), verifying application health checks and Prometheus observability metrics (`/metrics`), configuring local backend virtual environments with Alembic database schema migrations and Uvicorn ASGI server, running automated API test suites using Pytest, creating secure non-root Docker backend containers and multi-stage frontend production builds, and deploying the application onto Kubernetes via Helm package management with Nginx Ingress routing.

---

## Part 1: Full-Stack Container Orchestration with Docker Compose

### 1. Launching Full-Stack Services with Docker Compose
Build and launch all application services simultaneously (FastAPI backend, React frontend, and PostgreSQL database container) using Docker Compose.
```bash
docker compose up --build
```
![Start Full Application Stack with Docker Compose](./Images/image.png)

### 2. Exploring TaskBoard SaaS Web Dashboard
Access the React web application at `http://localhost:3000` to interact with the project workspace, Kanban task filters, team member assignments, priority statuses, and system activity logs.
![TaskBoard Production Web Dashboard](./Images/image%20copy.png)

---

## Part 2: Backend Health, API Endpoints & Observability Metrics

### 1. Verifying Liveness and Swagger Documentation Endpoints
Test backend responsiveness via the `/health` endpoint and inspect the interactive Swagger OpenAPI specification interface at `/docs`.
```bash
# Verify backend health status
curl http://localhost:8000/health

# Inspect OpenAPI Swagger documentation
curl http://localhost:8000/docs
```
![Verify Backend Health and Swagger UI](./Images/image%20copy%202.png)

### 2. Scraping Prometheus Telemetry Metrics
Query the `/metrics` endpoint powered by `prometheus-fastapi-instrumentator` to verify exposure of HTTP latency, GC cycles, memory usage, and CPU counters.
```bash
curl http://localhost:8000/metrics
```
![Query Prometheus Metrics Endpoint](./Images/image%20copy%203.png)

---

## Part 3: Backend Local Setup, Database Migrations & ASGI Server

### 1. Setting Up Python Environment & Installing Dependencies
Set up an isolated Python environment for backend development and install FastAPI, SQLAlchemy ORM, Psycopg 3, Alembic, and Prometheus instrumentator.
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```
![Install Backend Dependencies in Virtual Environment](./Images/image%20copy%204.png)

### 2. Applying Alembic Migrations and Starting Uvicorn
Run declarative database migrations against PostgreSQL using Alembic, then start the Uvicorn ASGI server with live hot-reloading on port 8000.
```bash
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```
![Run Database Migrations and Start Uvicorn](./Images/image%20copy%205.png)

### 3. Testing Core API Routes via Command-Line
Perform curl requests against backend endpoints to ensure database connectivity and task serialization are functioning properly.
```bash
curl http://localhost:8000/health
curl http://localhost:8000/api/tasks
```
![Test Core REST Endpoints](./Images/image%20copy%206.png)

### 4. Exploring Interactive Swagger Documentation
Open `http://localhost:8000/docs` in the browser to view the OpenAPI 3.1 specification containing all task management, statistics, health, and metrics endpoints.
![FastAPI Swagger UI Schema Documentation](./Images/image%20copy%207.png)

---

## Part 4: Automated API Testing with Pytest

### 1. Executing Automated Test Suite
Run automated unit and integration tests using Pytest, testing API health, ready probes, task creation schema validation, task listing, and stats aggregation.
```bash
cd backend
pytest -v
```
![Run Pytest Automated Test Suite](./Images/image%20copy%208.png)

---

## Part 5: Production Containerization & Multi-Stage Builds

### 1. Building Backend Container Image
Build an optimized backend image using a non-root `appuser` (UID 10001) for container security compliance.
```bash
docker build -t taskboard-backend:local ./backend
```
![Build Backend Docker Container](./Images/image%20copy%209.png)

### 2. Running and Verifying Standalone Backend Container
Run the containerized backend with an environment variable pointing to the PostgreSQL database on the host machine.
```bash
docker run --rm -p 8000:8000 \
  -e DATABASE_URL='postgresql+psycopg://taskboard:taskboard@host.docker.internal:5432/taskboard' \
  taskboard-backend:local
```
![Run Backend Docker Container Standalone](./Images/image%20copy%2010.png)

### 3. Building Multi-Stage Frontend Container
Package the React frontend using a multi-stage Dockerfile: Node 22 compiles static assets into `dist/`, which are then served via an Alpine Nginx web server.
```bash
docker build -t taskboard-frontend:local ./frontend
```
![Multi-Stage Frontend Docker Build](./Images/image%20copy%2011.png)

### 4. Auditing Local Docker Images
Verify the built container images and compare image footprints (`taskboard-backend:local` at 326MB, `taskboard-frontend:local` at 76.3MB).
```bash
docker images | grep taskboard
```
![Audit Docker Image Sizes](./Images/image%20copy%2012.png)

### 5. Verifying Deployed Dashboard UI
Confirm end-to-end functionality of the TaskBoard user interface running across decoupled microservices.
![TaskBoard Production Web Dashboard](./Images/image%20copy%2013.png)

---

## Part 6: Kubernetes Namespace & Helm Deployment with Ingress

### 1. Creating Dedicated Kubernetes Namespace
Create the `taskboard` namespace in Kubernetes to isolate project workloads.
```bash
kubectl apply -f k8s/namespace.yaml
```
![Create Kubernetes Namespace](./Images/image%20copy%2014.png)

### 2. Enabling Ingress Addon and Deploying via Helm
Enable the Nginx Ingress controller in Minikube and deploy the complete microservices stack using Helm with environment-specific values (`values-dev.yaml`).
```bash
minikube addons enable ingress
helm upgrade --install taskboard ./helm/taskboard \
  -n taskboard \
  -f helm/taskboard/values-dev.yaml
```
![Deploy TaskBoard Stack with Helm and Ingress](./Images/image%20copy%2015.png)
