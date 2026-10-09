# GitOps Continuous Delivery with Argo CD - Hands-on Lab

A comprehensive hands-on guide exploring GitOps continuous delivery workflows on Kubernetes using Argo CD: creating local clusters with `kind`, installing Argo CD controllers and Custom Resource Definitions (CRDs), configuring Git as the single source of truth (`Git-Ops`), deploying declarative Argo CD Application CRDs, automating cluster state synchronization, managing application scaling directly through Git commits, and demonstrating Kubernetes automated drift correction and self-healing.

---

## Part 1: Kind Cluster Provisioning & Argo CD Installation

### 1. Creating Kubernetes Cluster with `kind` and Deploying Argo CD
Spin up a local Kubernetes cluster named `session20`, verify control-plane node readiness, create the `argocd` namespace, and apply the official Argo CD installation manifests.
```bash
kind create cluster --name session20
kubectl get nodes
kubectl create namespace argocd
kubectl apply -n argocd \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```
![Create Kind Cluster and Install Argo CD](./Images/image.png)

---

## Part 2: GitOps Source of Truth Repository Setup

### 1. Cloning the GitOps Source Repository
Clone the dedicated Git repository (`Git-Ops`) containing application deployment, service, and namespace declarations to serve as the immutable source of truth.
```bash
git clone https://github.com/SanjayDesai10/Git-Ops.git
```
![Clone GitOps Repository](./Images/image%20copy.png)

---

## Part 3: Argo CD Application Deployment & Initial Sync

### 1. Applying Argo CD Application Custom Resource
Apply the `argocd-application.yaml` manifest specifying the target repository URL, target cluster, destination namespace (`session20`), and sync policy. Verify the application reaches `Synced` and `Healthy` status.
```bash
kubectl apply -f app/argocd-application.yaml
kubectl get applications -n argocd
```
![Apply Argo CD Application and Verify Sync](./Images/image%20copy%202.png)

### 2. Inspecting In-Cluster Workloads in Destination Namespace
Inspect all resources automatically provisioned by Argo CD within the `session20` namespace, verifying pods, service, deployment, and replica sets.
```bash
kubectl get all -n session20
```
![Inspect Kubernetes Resources Managed by Argo CD](./Images/image%20copy%203.png)

---

## Part 4: Git-Driven Continuous Delivery & Automated Scaling

### 1. Modifying Desired State in Git Repository
Update the deployment replica count (`replicas: 3`) in `app/deployment.yaml`, commit the change, and push to GitHub remote repository on `main`.
```bash
git add .
git status
git commit -m "updated replicas"
git push origin main
```
![Commit and Push Desired State Change to Git](./Images/image%20copy%204.png)

### 2. Observing Real-Time Automatic Scaling in Kubernetes
Watch the Kubernetes deployment controller dynamically scale up pods from 2 to 3 replicas as Argo CD detects the commit drift and reconciles the cluster to the new Git state.
```bash
kubectl get deployment -n session20 -w
```
![Watch Automatic Deployment Scaling](./Images/image%20copy%205.png)

---

## Part 5: Cluster Drift Detection & Automated Self-Healing

### 1. Simulating Manual Configuration Drift
Manually scale the deployment down to 1 replica using `kubectl scale` to introduce configuration drift between the cluster and Git.
```bash
kubectl scale deployment session20-mini \
  -n session20 \
  --replicas=1
kubectl get deployment -n session20
```
![Simulate Configuration Drift via Manual Scaling](./Images/image%20copy%206.png)

### 2. Verifying Automated Self-Healing and State Reconciliation
Observe Argo CD's reconciliation loop detect that the cluster state diverged from Git. Argo CD automatically overrides the manual change, restoring the cluster back to 3 healthy running pods.
```bash
kubectl logs deployment/session20-mini -n session20
kubectl get pods -n session20
kubectl get application session20-mini -n argocd
```
![Verify Argo CD Self-Healing Restores Desired State](./Images/image%20copy%207.png)
