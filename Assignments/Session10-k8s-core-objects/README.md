# Kubernetes Deployment Strategies - Hands-on Lab

---

## Strategy 1: Rolling Update (`Images-01`)

### 1. Deploying Version 1 Application & Service
![Deploy v1 Application & Service](./Images-01/image.png)

### 2. Verifying Rollout Status
![Rollout Status Check](./Images-01/image%20copy.png)

### 3. Verifying Pods & Version Labels
![Verify v1 Pods and Labels](./Images-01/image%20copy%202.png)

### 4. Exposing the Service via Minikube
![Minikube Service URL](./Images-01/image%20copy%204.png)

### 5. Accessing Version 1 in Browser
![Browser Verification v1](./Images-01/image%20copy%203.png)

### 6. Triggering Rolling Update to Version 2
![Trigger Rolling Update v2](./Images-01/image%20copy%205.png)

### 7. Real-Time Pod Replacement Watch
![Watch Rolling Update](./Images-01/image%20copy%206.png)

### 8. Verifying Version 2 Rollout Completion
![Verify v2 Rollout Completed](./Images-01/image%20copy%207.png)

### 9. Rollout History & Instant Rollback
![Rollout History and Undo](./Images-01/image%20copy%208.png)

---

## Strategy 2: Blue-Green Deployment (`Images02`)

### 1. Deploying Blue (v1) and Green (v2) Concurrently
![Deploy Blue and Green Environments](./Images02/image.png)

### 2. Pointing Service to Blue (v1 LIVE)
![Point Service to Blue](./Images02/image%20copy.png)

### 3. Browser Verification of Blue Environment
![Browser Verification Blue](./Images02/image%20copy%202.png)

### 4. Confirming Service Selector & Endpoints for Blue
![Confirm Blue Selector and Endpoints](./Images02/image%20copy%203.png)

### 5. Instant Switchover to Green (v2)
![Cutover Traffic to Green](./Images02/image%20copy%204.png)

### 6. Browser Verification of Green Environment
![Browser Verification Green](./Images02/image%20copy%205.png)

### 7. Confirming Green Service Selector
![Confirm Green Selector](./Images02/image%20copy%206.png)

### 8. Instant Rollback to Blue
![Rollback to Blue](./Images02/image%20copy%207.png)

---

## Strategy 3: Canary Deployment (`Images03`)

### 1. Deploying Stable Baseline (9 Pods = 90% Traffic)
![Deploy Stable v1](./Images03/image.png)

### 2. Deploying Canary (1 Pod = 10% Traffic)
![Deploy Canary v2](./Images03/image%20copy.png)

### 3. Scaling Canary Traffic to 30%
![Scale Canary to 30%](./Images03/image%20copy%202.png)

### 4. Promoting Canary to 100%
![Promote Canary to Full](./Images03/image%20copy%203.png)

### 5. Cleanup / Decommissioning Stable
![Cleanup Stable Deployment](./Images03/image%20copy%204.png)

---

## Strategy 4: Recreate Deployment (`Images04`)

### 1. Deploying Version 1 Application & Service
![Deploy v1 Recreate](./Images04/image.png)

### 2. Triggering Recreate Update & Watching Pods
![Watch Recreate Pod Termination](./Images04/image%20copy%202.png)

### 3. Downtime Window Verification (Zero Running Pods)
![Downtime Window in Pod Watch](./Images04/image%20copy.png)

### 4. Outage Observation via Continuous Curl
![Continuous Curl Proving Downtime](./Images04/image%20copy%203.png)

### 5. Rollback Demonstration
![Recreate Rollback Demonstration](./Images04/image%20copy%204.png)
