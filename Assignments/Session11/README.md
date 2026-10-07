# Kubernetes Service Types - Hands-on Lab

---

## Service 1: ClusterIP Service (`Images01`)

### 1. Deploying Backend Web Application
![Deploy Backend Application](./Images01/image.png)

### 2. Deploying the ClusterIP Service
![Deploy ClusterIP Service](./Images01/image%20copy.png)

### 3. Inspecting Service Endpoints
![Inspect Endpoints](./Images01/image%20copy%202.png)

### 4. Deploying Test Curl Client Pod
![Deploy Curl Client Pod](./Images01/image%20copy%203.png)

### 5. Testing Internal Service DNS Resolution
![DNS Short Name Resolution](./Images01/image%20copy%204.png)

### 6. Testing Full FQDN Resolution
![FQDN Resolution](./Images01/image%20copy%205.png)

### 7. Port Forwarding for Local Access
![Port Forward Service](./Images01/image%20copy%207.png)

### 8. Browser Verification via Port Forward
![Browser Verification ClusterIP](./Images01/image%20copy%206.png)

---

## Service 2: NodePort Service (`Images02`)

### 1. Deploying Backend Web Application
![Deploy Backend Application](./Images02/image.png)

### 2. Deploying NodePort Service
![Deploy NodePort Service](./Images02/image%20copy.png)

### 3. Identifying Node IP Address
![Identify Node IP](./Images02/image%20copy%202.png)

### 4. Creating Minikube Service Tunnel
![Minikube NodePort Tunnel](./Images02/image%20copy%204.png)

### 5. Browser Verification via NodePort
![Browser Verification NodePort](./Images02/image%20copy%203.png)

---

## Service 3: LoadBalancer Service (`Images03`)

### 1. Deploying Application & LoadBalancer Service
![Deploy LoadBalancer Application & Service](./Images03/image.png)

### 2. Provisioning External IP via Minikube Tunnel
![Minikube Tunnel Execution](./Images03/image%20copy%202.png)

### 3. Exposing and Accessing LoadBalancer URL
![Minikube LoadBalancer Access](./Images03/image%20copy%203.png)

### 4. Browser Verification via LoadBalancer
![Browser Verification LoadBalancer](./Images03/image%20copy.png)

---

## Service 4: ExternalName Service (`Images04`)

### 1. Deploying ExternalName Service
![Deploy ExternalName Service](./Images04/image.png)

### 2. Deploying DNS Test Client Pod
![Deploy DNS Client Pod](./Images04/image%20copy.png)

### 3. Verifying CNAME DNS Resolution
![Nslookup CNAME Resolution](./Images04/image%20copy%202.png)

### 4. Testing HTTP Connection to External Service
![ExternalName Curl Test](./Images04/image%20copy%203.png)

---

## Service 5: Headless Service (`Images05`)

### 1. Deploying Headless Service
![Deploy Headless Service](./Images05/image.png)

### 2. Deploying StatefulSet with Predictable Identities
![Deploy StatefulSet](./Images05/image%20copy.png)

### 3. Deploying Headless DNS Client Pod
![Deploy Headless DNS Client](./Images05/image%20copy%202.png)

### 4. Verifying Multiple Direct Pod IPs in DNS Lookup
![Direct Pod IPs DNS Resolution](./Images05/image%20copy%203.png)

### 5. Accessing Individual Pod via Predictable DNS Record
![Direct Stateful Pod Access](./Images05/image%20copy%204.png)
