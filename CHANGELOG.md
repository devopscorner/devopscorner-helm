# DevOpsCorner Helm

Helm chart for devopscorner services (Semantic Version)

## Prerequirements

- [Helm](https://helm.sh/docs/intro/install/) CLI
- [Helmfile](https://github.com/roboll/helmfile) CLI


## Version 1.4

### Features

- Migrate from `v1beta1` to `v1` from `ingress`
  ```
  {{- if semverCompare ">=1.14-0" .Capabilities.KubeVersion.GitVersion -}}
  apiVersion: networking.k8s.io/v1
  {{- else -}}
  apiVersion: extensions/v1
  {{- end }}
  ```
- Use version `1.2.0` & `1.3.0` HelmChart template for Kubernetes version 1.19+ <= 1.21
- Use version `1.4.0` HelmChart template for Kubernetes version 1.22+
- Changes Ingress:
  ```
  hosts:
    - host: jumppod.devops-tools.svc.cluster.local
      http:
        paths:
          - path: /
            backend:
              serviceName: jumppod-api
              servicePort: 80
  ```
  to:
  ```
  hosts:
    - host: jumppod.devops-tools.svc.cluster.local
      http:
        paths:
          - path: /
            pathType: Prefix   # Prefix -or - ImplementationSpecific
            backend:
              service:
                name: jumppod-api
                port:
                  number: 80
  ```
- Added cronjob for jumppods

## Version 1.3

### Features

- Fixing overide helm release jumppods
- Added template `staging` & `prod`


## Version 1.2

### Features

- Added Jumppods (Jump Host Pods) for maintenance EKS inside pods (`curl`, `wget`, `telnet`, `ping`, etc), securing with basic-auth access inside ingress-nginx
- Telnet
  - Alpine
      ```
      busybox-extras telnet [host] [port]
      ```
  - Ubuntu
     ```
     telnet [host] [port]
     ```
  - AWS Linux (CodeBuild)
     ```
     telnet [host] [port]
     ```

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
