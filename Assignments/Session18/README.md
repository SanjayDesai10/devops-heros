# Infrastructure as Code with Terraform & AWS S3 - Hands-on Lab

A comprehensive hands-on guide covering Infrastructure as Code (IaC) principles using HashiCorp Terraform: initializing backend and provider plugins, formatting and validating HCL code, generating and reviewing execution plans, provisioning an AWS S3 bucket with tagging strategies, inspecting managed infrastructure in the Terraform state file, querying outputs, verifying created cloud resources via AWS CLI, and safely managing resource destruction.

---

## Part 1: Terraform Workflow Initialization & Code Validation

### 1. Initializing Providers, Formatting HCL, and Validating Configuration
Initialize Terraform working directory with the AWS provider plugin (`hashicorp/aws v6.66.0`), format configuration files to canonical conventions, and validate syntax and schema rules.
```bash
terraform init
terraform fmt
terraform validate
```
![Initialize, Format, and Validate Terraform](./Images/image.png)

### 2. Generating and Inspecting Execution Plan
Execute `terraform plan` to determine the actions necessary to achieve the desired infrastructure state without directly modifying cloud resources.
```bash
terraform plan
```
- **Target Resource**: `aws_s3_bucket.devops553`
- **Target Bucket**: `yatri10147`
- **Target Region**: `ap-south-1`
- **Force Destroy**: `true`

---

## Part 2: Infrastructure Provisioning with `terraform apply`

### 1. Applying Configuration & Reviewing Resource Metadata
Apply the execution plan to provision the Amazon S3 bucket on AWS with standardized resource tags (`Environment`, `ManagedBy`, `Name`, `Project`).
```bash
terraform apply
```
![Apply Terraform Infrastructure Plan](./Images/image%20copy.png)

---

## Part 3: State Management & Resource Inspection

### 1. Querying Managed Resources in State File
List all resources tracked within the Terraform state file using `terraform state list` to confirm state synchronization.
```bash
terraform state list
```
![List Resources in Terraform State](./Images/image%20copy%202.png)

### 2. Deep Inspection of Resource Attributes via `state show`
Inspect all read-only and computed attributes of the provisioned bucket, including its Amazon Resource Name (ARN), regional endpoint, canonical user grants, and server-side encryption settings.
```bash
terraform state show aws_s3_bucket.devops553
```
![Show Detailed Resource State Attributes](./Images/image%20copy%203.png)

---

## Part 4: Outputs, AWS CLI Verification & Clean Destruction

### 1. Querying Terraform Output Variables
Extract key infrastructure attributes defined in `outputs.tf` for consumption by external automation or downstream services.
```bash
terraform output
```
```text
bucket_arn    = "arn:aws:s3:::yatri10147"
bucket_name   = "yatri10147"
bucket_region = "ap-south-1"
```

### 2. Verifying Cloud Resources via AWS CLI
Directly query AWS S3 using the AWS Command Line Interface to independently verify bucket existence and accessibility.
```bash
aws s3 ls
```

### 3. Reviewing Teardown Plan with `terraform plan -destroy`
Generate a speculative destruction plan to preview which resources will be purged upon teardown before executing `terraform destroy`.
```bash
terraform plan -destroy
```
![Query Outputs, Verify via AWS CLI, and Preview Destroy Plan](./Images/image%20copy%204.png)
