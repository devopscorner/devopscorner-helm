# DevOpsCorner Helm Chart

![all contributors](https://img.shields.io/github/contributors/devopscorner/devopscorner-helm)
![tags](https://img.shields.io/github/v/tag/devopscorner/devopscorner-helm?sort=semver)
![download all](https://img.shields.io/github/downloads/devopscorner/devopscorner-helm/total.svg)
![download latest](https://img.shields.io/github/downloads/devopscorner/devopscorner-helm/1.0/total)
![view](https://views.whatilearened.today/views/github/devopscorner/devopscorner-helm.svg)
![clone](https://img.shields.io/badge/dynamic/json?color=success&label=clone&query=count&url=https://github.com/devopscorner/devopscorner-helm/blob/master/clone.json?raw=True&logo=github)
![issues](https://img.shields.io/github/issues/devopscorner/devopscorner-helm)
![pull requests](https://img.shields.io/github/issues-pr/devopscorner/devopscorner-helm)
![forks](https://img.shields.io/github/forks/devopscorner/devopscorner-helm)
![stars](https://img.shields.io/github/stars/devopscorner/devopscorner-helm)
[![License: CC BY-NC 4.0](https://img.shields.io/github/license/devopscorner/devopscorner-helm)](https://img.shields.io/github/license/devopscorner/devopscorner-helm)

Helm chart for devopscorner services (Semantic Version)

## Prerequirements

- Helm

  ```
  ### Linux ###
  $ curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
  $ chmod 700 get_helm.sh
  $ ./get_helm.sh

  ### MacOS ###
  $ brew install helm
  ```

- Helmfile

  ```
  wget https://github.com/roboll/helmfile/releases/download/v0.139.7/helmfile_linux_amd64
  chmod +x helmfile_linux_amd64
  sudo mv helmfile_linux_amd64 /usr/local/bin/helmfile
  ```

- Helm Plugins

  ```
  helm plugin install https://github.com/databus23/helm-diff
  helm plugin install https://github.com/hypnoglow/helm-s3.git
  ```

- Added Mandatory Repository

  ```
  helm repo add stable https://charts.helm.sh/stable
  helm repo update
  ```

## Helm Repository

- Check Repository Helm

  ```
  helm repo list
  ----
  NAME            URL
  stable          https://charts.helm.sh/stable
  ```

- Adding Repository Helm

  ```
  ### LAB ###
  helm s3 init s3://devopscorner-helm-chart/lab
  AWS_REGION=ap-southeast-1 helm repo add devopscorner-lab s3://devopscorner-helm-chart/lab

  ### STAGING ###
  helm s3 init s3://devopscorner-helm-chart/staging
  AWS_REGION=ap-southeast-1 helm repo add devopscorner-staging s3://devopscorner-helm-chart/staging

  ### PRODUCTION ###
  helm s3 init s3://devopscorner-helm-chart/prod
  AWS_REGION=ap-southeast-1 helm repo add devopscorner s3://devopscorner-helm-chart/prod

  helm repo update
  ```

## Testing Helm

- Testing the chart template

  ```
  helm template ./api -f api/values.yaml
  helm template ./backend -f backend/values.yaml
  helm template ./frontend -f frontend/values.yaml
  helm template ./svcrole -f svcrole/values.yaml
  ```

## Create Helm Template

- Create a zip package of helm chart

  ```
  helm package api
  helm package backend
  helm package frontend
  helm package svcrole
  ```

## Update Helm Template

- Push chart into private repository

  ```
  ### LAB ###
  helm s3 push api-[version].tgz devopscorner-lab --force
  helm s3 push backend-[version].tgz devopscorner-lab --force
  helm s3 push frontend-[version].tgz devopscorner-lab --force
  helm s3 push svcrole-[version].tgz devopscorner-lab --force

  ### STAGING ###
  helm s3 push api-[version].tgz devopscorner-staging --force
  helm s3 push backend-[version].tgz devopscorner-staging --force
  helm s3 push frontend-[version].tgz devopscorner-staging --force
  helm s3 push svcrole-[version].tgz devopscorner-staging --force
  ---
  ### PRODUCTION ###
  helm s3 push api-[version].tgz devopscorner --force
  helm s3 push backend-[version].tgz devopscorner --force
  helm s3 push frontend-[version].tgz devopscorner --force
  helm s3 push svcrole-[version].tgz devopscorner --force
  ```

## Changing Version Helm

- Update `version` value in Chart Template `Chart.yaml`

  ```
  apiVersion: v1
  name: api
  description: A Helm chart for Kubernetes

  # A chart can be either an 'application' or a 'library' chart.
  #
  # Application charts are a collection of templates that can be packaged into versioned archives
  # to be deployed.
  #
  # Library charts provide useful utilities or functions for the chart developer. They're included as
  # a dependency of application charts to inject those utilities and functions into the rendering
  # pipeline. Library charts do not define any templates and therefore cannot be deployed.
  type: application

  # This is the chart version. This version number should be incremented each time you make changes
  # to the chart and its templates, including the app version.
  # Versions are expected to follow Semantic Versioning (https://semver.org/)
  version: 0.3.0     ### Change HERE

  # This is the version number of the application being deployed. This version number should be
  # incremented each time you make changes to the application. Versions are not expected to
  # follow Semantic Versioning. They should reflect the version the application is using.
  # It is recommended to use it with quotes.
  appVersion: "1.16.0"
  ```

## HELM Template Structure

```
lab
├── api
│   ├── Chart.yaml
│   ├── api.yaml
│   ├── templates
│   │   ├── _helpers.tpl
│   │   ├── clusterrole.yaml
│   │   ├── configmap.yaml
│   │   ├── deployment.yaml
│   │   ├── hpa.yaml
│   │   ├── ingress.yaml
│   │   ├── secret.yaml
│   │   ├── service.yaml
│   │   └── serviceaccount.yaml
│   └── values.yaml
├── backend
│   ├── Chart.yaml
│   ├── backend.yaml
│   ├── templates
│   │   ├── _helpers.tpl
│   │   ├── clusterrole.yaml
│   │   ├── configmap.yaml
│   │   ├── deployment.yaml
│   │   ├── hpa.yaml
│   │   ├── ingress.yaml
│   │   ├── secret.yaml
│   │   ├── service.yaml
│   │   └── serviceaccount.yaml
│   └── values.yaml
├── configmap
│   ├── Chart.yaml
│   ├── configmap.yaml
│   ├── templates
│   │   ├── _helpers.tpl
│   │   └── configmap.yaml
│   └── values.yaml
├── frontend
│   ├── Chart.yaml
│   ├── frontend.yaml
│   ├── templates
│   │   ├── _helpers.tpl
│   │   ├── clusterrole.yaml
│   │   ├── configmap.yaml
│   │   ├── deployment.yaml
│   │   ├── hpa.yaml
│   │   ├── ingress.yaml
│   │   ├── secret.yaml
│   │   ├── service.yaml
│   │   └── serviceaccount.yaml
│   └── values.yaml
├── helm-pack-lab.sh
├── helm-push-lab.sh
├── secretref
│   ├── Chart.yaml
│   ├── secretref.yaml
│   ├── templates
│   │   ├── _helpers.tpl
│   │   └── secret.yaml
│   └── values.yaml
...
...
├── stateful
│   ├── Chart.yaml
│   ├── stateful.yaml
│   ├── templates
│   │   ├── _helpers.tpl
│   │   ├── clusterrole.yaml
│   │   ├── configmap.yaml
│   │   ├── deployment.yaml
│   │   ├── hpa.yaml
│   │   ├── ingress.yaml
│   │   ├── pv.yaml
│   │   ├── pvc.yaml
│   │   ├── secret.yaml
│   │   ├── service.yaml
│   │   └── serviceaccount.yaml
│   └── values.yaml
└── svcrole
    ├── Chart.yaml
    ├── templates
    │   ├── _helpers.tpl
    │   ├── clusterrole.yaml
    │   ├── rolebinding.yaml
    │   └── serviceaccount.yaml
    └── values.yaml

26 directories, 140 files
```

## Service HELM Template

- Structure on services repo

```
_infra/
   dev/
      helmfile.yaml
      values/
            api/values.yaml
            backend/values.yaml
            frontend/values.yaml
            svcrole/values.yaml
```

## ECR Deployment

- ECR Login

  ```
  aws ecr get-login-password --region [AWS_REGION] | docker login --username AWS --password-stdin [ERC_PATH]
  ---
  aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin [AWS_ACCOUNT].dkr.ecr.ap-southeast-1.amazonaws.com
  ```

- ECR Build

  ```
  docker build [DOCKERFILE_PATH] -t [DOCKER_IMAGE_NAME]:[TAG]
  ---
  docker build . -t zeroc0d3/laravel-kubernetes:latest
  docker build /home/ubuntu/Dockerfile -t zeroc0d3/laravel-kubernetes:latest
  ```

- ECR Push

  ```
  docker tag [DOCKER_IMAGE_NAME]:[TAG] [ECR_PATH]/[DOCKER_IMAGE_NAME]:[TAG]
  docker push [ECR_PATH]/[DOCKER_IMAGE_NAME]:[TAG]
  ---
  docker tag devopscorner/laravel-kubernetes:latest [AWS_ACCOUNT].dkr.ecr.ap-southeast-1.amazonaws.com/devopscorner/laravel-kubernetes:latest
  docker push [AWS_ACCOUNT].dkr.ecr.ap-southeast-1.amazonaws.com/devopscorner/laravel-kubernetes:latest
  ```

- ECR Pull

  ```
  docker pull [ECR_PATH]/[DOCKER_IMAGE_NAME]:[TAG]
  ---
  docker pull [AWS_ACCOUNT].dkr.ecr.ap-southeast-1.amazonaws.com/devopscorner/laravel-kubernetes:latest
  ```

## Copyright

- Author: **DevOps Corner**
- License: **Apache v2**
