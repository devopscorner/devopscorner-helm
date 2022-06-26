# DevOpsCorner Helm

Helm chart for devopscorner services (Semantic Version)

## Prerequirements

- [Helm](https://helm.sh/docs/intro/install/) CLI
- [Helmfile](https://github.com/roboll/helmfile) CLI


## Version 1.2

### Features

- Added Jumppods (Jump Host Pods) for maintenance EKS inside pods (`curl`, `wget`, `telnet`, `ping`, etc), securing with basic-auth access inside ingress-nginx

---

## Version 1.1

### Features

- Added integration external ConfigMap (shared config) into environment container (pods)

- Helmfile (PoC Deployment)
  - Jumppods [Ingress-ALB](helmfile/ingress/jumppod-ingress-alb.yml)
  - Jumppods [Ingress-Nginx](helmfile/ingress/jumppod-ingress-nginx.yml)
  - [Ingress ALB](helmfile/ingress/ingress-alb.yml)
  - [Ingress NGINX](helmfile/ingress/ingress-nginx.yml)

- [Websocket](helmfile/websocket) (PoC Deployment)

---

## Version 1.0

### Features

- HelmChart Template
  - API
  - Backend
  - Frontend
  - ConfigMap
  - SecretRef
  - Stateful
  - SVCRole
  - Spinnaker-API
  - Spinnaker-Backend
  - Spinnaker-Frontend
  - Spinnaker-ConfigMap
  - Spinnaker-SecretRef
  - Spinnaker-Stateful

- Jenkins Pipeline
  - Pack
  - Push
  - Deploy

- Helmfile (PoC Deployment)
  - Jumppods
  - [Ingress ALB](helmfile/ingress-alb.yml)
  - [Ingress NGINX](helmfile/ingress-nginx.yml)
