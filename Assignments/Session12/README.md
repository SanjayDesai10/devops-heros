# Kubernetes Ingress, ConfigMaps, and Secrets - Hands-on Lab

---

## Part 1: ConfigMaps — Decoupling Plain-Text Configuration (`Images01`)

### 1. Creating and Inspecting ConfigMap
![ConfigMap Inspection Part 1](./Images01/image.png)

### 2. Viewing Remaining ConfigMap Data
![ConfigMap Inspection Part 2](./Images01/image%20copy.png)

### 3. Reading ConfigMap Value Directly via JSONPath
![Read ConfigMap JSONPath](./Images01/image%20copy%202.png)

---

## Part 2: Secrets — Protecting Sensitive Credentials (`Images02`)

### 1. Inspecting Opaque Secret
![Get Secret](./Images02/image.png)

### 2. Decoding Secret Value for Validation
![Decode Secret](./Images02/image%20copy.png)

---

## Part 3: Ingress — L7 Traffic Routing & TLS Termination (`Images03`)

### 1. Path-Based Ingress Configuration
![Path-based Ingress](./Images03/image.png)

### 2. Generating Self-Signed TLS Certificate
![Generate TLS Certificate](./Images03/image%20copy.png)

### 3. Creating Kubernetes TLS Secret
![Create TLS Secret](./Images03/image%20copy%202.png)

### 4. Verifying TLS Secret Creation
![Verify TLS Secret](./Images03/image%20copy%203.png)

### 5. Applying Multi-Host Ingress with TLS
![Apply TLS Ingress](./Images03/image%20copy%204.png)

### 6. Testing Host-Based Routing and TLS via Curl
![Curl TLS and Multi-Host Ingress](./Images03/image%20copy%205.png)

---

## Part 4: Full Microservices Integration Demo (`Images04`)

### 1. Enabling Ingress Controller Addon on Minikube
![Enable Minikube Ingress](./Images04/image.png)

### 2. Creating Application ConfigMap
![Apply ConfigMap](./Images04/image%20copy.png)

### 3. Inspecting Injected Configuration Parameters
![Describe ConfigMap](./Images04/image%20copy%202.png)

### 4. Creating Database Secret
![Create Database Secret](./Images04/image%20copy%203.png)

### 5. Deploying Frontend Microservice
![Deploy Frontend Service](./Images04/image%20copy%204.png)

### 6. Deploying Backend API Microservice
![Deploy Backend Service](./Images04/image%20copy%205.png)

### 7. Verifying Backend Rollout Status
![Rollout Status Backend](./Images04/image%20copy%206.png)

### 8. Applying Ingress Routing Rules
![Configure Full Ingress](./Images04/image%20copy%207.png)

### 9. Mapping Local Domain in Hosts File
![Map Hosts Entry](./Images04/image%20copy%208.png)

### 10. Verifying Hosts File Configuration
![Verify Hosts File](./Images04/image%20copy%209.png)

### 11. Testing End-to-End API and Injected Environment Variables
![Verify Injected Env Vars](./Images04/image%20copy%2010.png)
