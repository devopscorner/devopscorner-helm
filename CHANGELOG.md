# DevOpsCorner Helm - v1.0

Helm chart for devopscorner services (Semantic Version)

## Prerequirements

- [Helm](https://helm.sh/docs/intro/install/) CLI
- [Helmfile](https://github.com/roboll/helmfile) CLI

## Features

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
