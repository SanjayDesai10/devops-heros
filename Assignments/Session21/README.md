# DevOps Final Capstone: TaskBoard Platform & Production Troubleshooting Guide

A comprehensive end-to-end DevOps capstone guide demonstrating the architecture, containerization, security scanning, infrastructure provisioning, automated delivery, observability, and systematic troubleshooting of **TaskBoard** — a production-grade microservices application stack.

---

## Part 1: Project Overview & Architecture

### 1. End-to-End System Architecture

```mermaid
flowchart TD
    subgraph 1. Development & Version Control
        DEV[Developer Laptop] -->|git commit & push| GITHUB[GitHub Repository]
    end

    subgraph 2. CI/CD & DevSecOps Pipeline
        GITHUB --> GHA[GitHub Actions Runner]
        GHA --> TEST[Pytest & Unit Tests]
        TEST --> SAST[SAST: CodeQL]
        SAST --> SCA[SCA: pip-audit]
        SCA --> SEC[Secret Scanning: Gitleaks]
        SEC --> DOCKER_BUILD[Multi-Stage Docker Builds]
        DOCKER_BUILD --> TRIVY[Trivy Container Scan]
        TRIVY --> GATE{Security Gate: High/Crit?}
        GATE -->|Passed| GHCR[Push to GHCR / Docker Hub]
    end

    subgraph 3. Infrastructure as Code
        TF[Terraform Engine] --> AWS_VPC[AWS VPC & Subnets]
        AWS_VPC --> AWS_EKS[AWS EKS Cluster]
    end

    subgraph 4. Kubernetes Workload Orchestration
        GHCR --> HELM[Helm Chart Package]
        HELM --> K8S[Kubernetes Cluster / Minikube]
        K8S --> INGRESS[Nginx Ingress Controller]
        INGRESS --> FE[React + Vite Frontend Pods]
        INGRESS --> BE[FastAPI Backend Pods]
        BE --> HPA[Horizontal Pod Autoscaler]
        BE --> DB[(PostgreSQL + PVC Storage)]
    end

    subgraph 5. Monitoring & GitOps
        BE --> PROM[Prometheus /metrics Scraper]
        PROM --> GRAF[Grafana Dashboards]
        GITHUB --> ARGOCD[Argo CD Controller]
        ARGOCD -->|Continuous Reconciliation| K8S
    end
```

### 2. Technologies Used Across the Stack

| Domain | Technology / Tool | Role in Architecture |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite, Vanilla CSS | Responsive SaaS task management user interface |
| **Backend** | Python 3.12+, FastAPI, Uvicorn | High-performance asynchronous REST API backend |
| **Database & ORM** | PostgreSQL 16, SQLAlchemy, Alembic | Relational data persistence & declarative schema migrations |
| **Testing** | Pytest, HTTPX, Pytest-cov | Automated unit testing & API integration test suites |
| **Containerization** | Docker, Multi-Stage Builds | Lightweight non-root container packaging |
| **Orchestration** | Docker Compose, Kubernetes, Minikube | Local orchestration and production container clustering |
| **Packaging** | Helm 3 | Templated, version-controlled Kubernetes release management |
| **CI/CD** | GitHub Actions | Automated build, test, scan, and deploy pipelines |
| **DevSecOps** | CodeQL, pip-audit, Trivy, Gitleaks | Multi-layer static analysis, vulnerability & secret scanning |
| **Infrastructure** | Terraform | Declarative AWS cloud infrastructure (VPC, EKS, IAM) |
| **Networking** | Nginx Ingress Controller, NodePort | Path-based HTTP traffic routing (`/` and `/api`) |
| **Autoscaling** | Kubernetes HPA, Metrics Server | Dynamic pod horizontal scaling based on CPU utilization |
| **Observability** | Prometheus, Grafana | Metric scraping, latency histograms, and visual dashboards |
| **GitOps** | Argo CD | Declarative Git-driven continuous delivery and self-healing |

---

## Part 2: Cloud Infrastructure & Kubernetes Object Model

### 1. Terraform Cloud Infrastructure
Infrastructure is codified using Terraform to provision the complete hosting environment in AWS:
- **VPC & Networking**: Dedicated VPC (`10.0.0.0/16`) spanning multiple Availability Zones with public and private subnets, NAT Gateways, and route tables.
- **EKS Cluster**: Managed Kubernetes control plane with auto-scaling worker node groups.
- **IAM Roles & Policies**: Service account IAM mapping for least-privilege AWS resource access.

### 2. Comprehensive Kubernetes Object Architecture
- **Namespaces**: Logical multi-tenancy and resource boundary (`taskboard`).
- **Deployments**: Manages replica sets for frontend (Nginx) and backend (FastAPI).
- **Services**: Stable ClusterIP networking enabling internal communication between microservices.
- **ConfigMaps & Secrets**: Externalized application configuration (`DATABASE_URL`, environment flags) and base64-encoded credentials.
- **Ingress**: Unified entrypoint routing `/` to the frontend and `/api` to the backend.
- **Horizontal Pod Autoscaler (HPA)**: Automatically scales backend replicas from 2 to 10 based on CPU thresholds (e.g., target 70%).
- **Liveness & Readiness Probes**:
  - `livenessProbe` (`GET /health`): Reboots deadlocked containers.
  - `readinessProbe` (`GET /ready`): Verifies database connectivity before directing client traffic.
- **Persistent Volume Claims (PVC)**: Reliable storage allocation for the PostgreSQL database.

---

## Part 3: Hands-on Lab Walkthrough

### 1. Full-Stack Container Orchestration with Docker Compose
Build and launch all application services simultaneously (FastAPI backend, React frontend, and PostgreSQL database container) using Docker Compose.
```bash
docker compose up --build
```
![Start Full Application Stack with Docker Compose](./Images/image.png)

### 2. Exploring TaskBoard SaaS Web Dashboard
Access the React web application at `http://localhost:3000` to interact with the project workspace, Kanban task filters, team member assignments, priority statuses, and system activity logs.
![TaskBoard Production Web Dashboard](./Images/image%20copy.png)

### 3. Verifying Liveness and Swagger Documentation Endpoints
Test backend responsiveness via the `/health` endpoint and inspect the interactive Swagger OpenAPI specification interface at `/docs`.
```bash
# Verify backend health status
curl http://localhost:8000/health

# Inspect OpenAPI Swagger documentation
curl http://localhost:8000/docs
```
![Verify Backend Health and Swagger UI](./Images/image%20copy%202.png)

### 4. Scraping Prometheus Telemetry Metrics
Query the `/metrics` endpoint powered by `prometheus-fastapi-instrumentator` to verify exposure of HTTP latency, GC cycles, memory usage, and CPU counters.
```bash
curl http://localhost:8000/metrics
```
![Query Prometheus Metrics Endpoint](./Images/image%20copy%203.png)

### 5. Setting Up Python Environment & Installing Dependencies
Set up an isolated Python environment for backend development and install FastAPI, SQLAlchemy ORM, Psycopg 3, Alembic, and Prometheus instrumentator.
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```
![Install Backend Dependencies in Virtual Environment](./Images/image%20copy%204.png)

### 6. Applying Alembic Migrations and Starting Uvicorn
Run declarative database migrations against PostgreSQL using Alembic, then start the Uvicorn ASGI server with live hot-reloading on port 8000.
```bash
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```
![Run Database Migrations and Start Uvicorn](./Images/image%20copy%205.png)

### 7. Testing Core API Routes via Command-Line
Perform curl requests against backend endpoints to ensure database connectivity and task serialization are functioning properly.
```bash
curl http://localhost:8000/health
curl http://localhost:8000/api/tasks
```
![Test Core REST Endpoints](./Images/image%20copy%206.png)

### 8. Exploring Interactive Swagger Documentation
Open `http://localhost:8000/docs` in the browser to view the OpenAPI 3.1 specification containing all task management, statistics, health, and metrics endpoints.
![FastAPI Swagger UI Schema Documentation](./Images/image%20copy%207.png)

### 9. Executing Automated API Test Suite with Pytest
Run automated unit and integration tests using Pytest, testing API health, ready probes, task creation schema validation, task listing, and stats aggregation.
```bash
cd backend
pytest -v
```
![Run Pytest Automated Test Suite](./Images/image%20copy%208.png)

### 10. Building Secure Backend Docker Container Image
Build an optimized backend image using a non-root `appuser` (UID 10001) for container security compliance.
```bash
docker build -t taskboard-backend:local ./backend
```
![Build Backend Docker Container](./Images/image%20copy%209.png)

### 11. Running and Verifying Standalone Backend Container
Run the containerized backend with an environment variable pointing to the PostgreSQL database on the host machine.
```bash
docker run --rm -p 8000:8000 \
  -e DATABASE_URL='postgresql+psycopg://taskboard:taskboard@host.docker.internal:5432/taskboard' \
  taskboard-backend:local
```
![Run Backend Docker Container Standalone](./Images/image%20copy%2010.png)

### 12. Building Multi-Stage Frontend Container
Package the React frontend using a multi-stage Dockerfile: Node 22 compiles static assets into `dist/`, which are then served via an Alpine Nginx web server.
```bash
docker build -t taskboard-frontend:local ./frontend
```
![Multi-Stage Frontend Docker Build](./Images/image%20copy%2011.png)

### 13. Auditing Local Docker Images
Verify the built container images and compare image footprints (`taskboard-backend:local` at 326MB, `taskboard-frontend:local` at 76.3MB).
```bash
docker images | grep taskboard
```
![Audit Docker Image Sizes](./Images/image%20copy%2012.png)

### 14. Verifying Deployed Dashboard UI
Confirm end-to-end functionality of the TaskBoard user interface running across decoupled microservices.
![TaskBoard Production Web Dashboard](./Images/image%20copy%2013.png)

### 15. Creating Dedicated Kubernetes Namespace
Create the `taskboard` namespace in Kubernetes to isolate project workloads.
```bash
kubectl apply -f k8s/namespace.yaml
```
![Create Kubernetes Namespace](./Images/image%20copy%2014.png)

### 16. Enabling Ingress Addon and Deploying via Helm
Enable the Nginx Ingress controller in Minikube and deploy the complete microservices stack using Helm with environment-specific values (`values-dev.yaml`).
```bash
minikube addons enable ingress
helm upgrade --install taskboard ./helm/taskboard \
  -n taskboard \
  -f helm/taskboard/values-dev.yaml
```
![Deploy TaskBoard Stack with Helm and Ingress](./Images/image%20copy%2015.png)

---

## Part 4: Production Troubleshooting Challenge & Systematic Framework

### 1. Five-Step Systematic Troubleshooting Methodology

```mermaid
flowchart LR
    S1[1. Detect & Identify] --> S2[2. Inspect Logs & Resources]
    S2 --> S3[3. Isolate Root Cause]
    S3 --> S4[4. Apply Remediation]
    S4 --> S5[5. Verify & Document]
```

1. **Detect & Identify**: Observe unexpected status codes, failing probes, or Pod status changes (`CrashLoopBackOff`, `ImagePullBackOff`, `Pending`).
2. **Inspect Logs & Resources**: Run `kubectl describe pod <name>`, `kubectl logs <name> --previous`, and audit chronological cluster events (`kubectl get events --sort-by=.lastTimestamp`).
3. **Isolate Root Cause**: Determine if the failure originates from code, environment configurations, container images, network routing, or storage locks.
4. **Apply Remediation**: Correct the manifest, adjust resource allocations, fix application code, or patch dependencies.
5. **Verify & Document**: Confirm healthy probe returns (`1/1 Running`), verify traffic flow, and document post-mortem learnings.

---

### 2. Real-World Troubleshooting Scenarios & Solutions

#### Scenario A: `ImagePullBackOff` / `ErrImagePull`
- **Symptom**: Pod fails to start, displaying `ImagePullBackOff`.
- **Investigation**:
  ```bash
  kubectl describe pod <broken-pod>
  # Events shows: Failed to pull image "taskboard-backend:nonexistent-tag": rpc error: code = NotFound
  ```
- **Root Cause**: Typo in the container image name, nonexistent image tag in registry, or missing image pull secret for private repositories.
- **Fix**: Update the deployment manifest or Helm `values.yaml` with the correct verified tag and ensure `imagePullSecrets` is configured.
- **Verification**: `kubectl get pods -w` shows container transition to `Running`.

#### Scenario B: `CrashLoopBackOff` (Application Exit)
- **Symptom**: Pod transitions from `Running` to `Error`, then enters `CrashLoopBackOff`.
- **Investigation**:
  ```bash
  kubectl logs <broken-pod> --previous
  ```
- **Root Cause**: Database connection failure on startup (`could not translate host name "postgres"`), missing required environment variables, or unhandled exceptions.
- **Fix**: Verify ConfigMaps and Secrets, ensure database is initialized and healthy, and check networking DNS reachability.
- **Verification**: Pod runs with zero restarts and passes `/ready` probe.

#### Scenario C: Broken Service Routing (Zero Endpoints)
- **Symptom**: Clients receive HTTP 503 or connection timeouts when querying the service.
- **Investigation**:
  ```bash
  kubectl get service <service-name>
  kubectl get endpoints <service-name>
  # Endpoints: <none>
  kubectl get pods --show-labels
  ```
- **Root Cause**: Selector mismatch between `service.spec.selector` (`app: taskboard-backend`) and the actual Pod label (`app.kubernetes.io/name: backend`).
- **Fix**: Align the Service selector labels with the Pod template metadata labels.
- **Verification**: `kubectl get endpoints <service-name>` immediately registers the Pod IP addresses.

#### Scenario D: Ingress 404 / 502 Bad Gateway
- **Symptom**: Ingress URL returns HTTP 404 Not Found or HTTP 502 Bad Gateway.
- **Investigation**:
  ```bash
  kubectl describe ingress taskboard-ingress -n taskboard
  kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx
  ```
- **Root Cause**: Missing rewrite annotations (`nginx.ingress.kubernetes.io/rewrite-target: /`), incorrect path prefix matching, or backend Service port mismatch.
- **Fix**: Correct the Ingress path specifications and ensure target service port matches the backend service port definition.

---

## Part 5: Lessons Learned & Production Takeaways

1. **Shift Security Left**: Running SAST, SCA, and container vulnerability scanning inside the PR build cycle catches critical vulnerabilities before code ever touches a shared cluster.
2. **Immutable Artifacts**: Tagging container images with the Git commit SHA guarantees 100% traceability from production containers back to the exact line of code in version control.
3. **Decouple Configuration from Code**: Utilizing Kubernetes ConfigMaps and Secrets prevents sensitive credentials from leaking into Git repositories or container layers.
4. **Declarative GitOps is Superior**: Managing infrastructure and application deployments via Git eliminates configuration drift and allows instant rollbacks with `git revert`.
5. **Observability Beyond Uptime**: Structured logging and Prometheus telemetry metrics are essential to detect silent memory leaks, thread pool starvation, and database query latency before outages occur.
