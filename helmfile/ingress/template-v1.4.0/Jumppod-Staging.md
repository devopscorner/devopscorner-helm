## HelmChart version 1.4.0

### Template (`jumppod-template.yml`)

```yaml
---
repositories:
  - name: devopscorner-staging
    url: s3://devopscorner-helm-chart/staging

templates:
  default: &default
    namespace: devops-tools
    version: "1.4.0"

releases:
  - name: jumppod
    chart: devopscorner-staging/api
    values:
      - ./jumppod-values-v1.4.0.yml
    <<: *default
```

### Values (`jumppod-values-v1.4.0.yml`)

```yaml
replicaCount: 1

secret:
  enabled: false

configMap:
  enabled: true
  name: "jumppod-api"
  mountPath: /app/core/config
  readOnly: true
  data:
    .app.config.json : |-
      {
          "AppName": "Commons Service",
          "GRPCTimeout": 10,
          "CacheExpiry": 300,
          "CacheCleanup": 600,
          "DefaultPageLimit": 3,
          "ClientTimeout": 10
      }

image:
  repository: devopscorner/cicd
  pullPolicy: IfNotPresent
  tag: "alpine"

imagePullSecrets: []
nameOverride: "jumppod"
fullnameOverride: "jumppod"

serviceAccount:
  create: true
  annotations: {}
  name: jumppod
  namespace: devops-tools

service:
  type: ClusterIP
  ports:
    - name: http
      port: 80
      targetPort: 80
      protocol: TCP
    - name: ssh
      port: 2222
      targetPort: 22
      protocol: TCP

containers:
  ports:
    - name: http
      containerPort: 80
      protocol: TCP
    - name: ssh
      containerPort: 22
      protocol: TCP

ingress:
  enabled: true
  annotations:
    nginx.ingress.kubernetes.io/cors-allow-headers: '*'
    nginx.ingress.kubernetes.io/cors-allow-methods: '*'
    nginx.ingress.kubernetes.io/cors-allow-origin: '*'
    nginx.ingress.kubernetes.io/enable-cors: "true"
    nginx.ingress.kubernetes.io/affinity: cookie
    nginx.ingress.kubernetes.io/from-to-www-redirect: "true"
    kubernetes.io/ingress.class: nginx
    ingress.kubernetes.io/whitelist-source-range: 10.0.0.0/32
    # type of authentication
    nginx.ingress.kubernetes.io/auth-type: basic
    # name of the secret that contains the user/password definitions
    nginx.ingress.kubernetes.io/auth-secret: jumppods-auth
    # message to display with an appropriate context why the authentication is required
    nginx.ingress.kubernetes.io/auth-realm: 'Authentication Required - Jumppods'
  hosts:
    - host: jumppod.devops-tools.svc.cluster.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: jumppod-api
                port:
                  number: 80
  tls: []

application:
  enabled: true
  env:
    - name: HELM_TEMPLATE_NAME
      value: api

resources:
  limits:
    cpu: 200m
    memory: 200Mi
  requests:
    cpu: 140m
    memory: 170Mi

autoscaling:
  enabled: true
  minReplicas: 1
  maxReplicas: 5
  targetCPUUtilizationPercentage: 80
  targetMemoryUtilizationPercentage: 80

nodeSelector:
  enabled: true
  select:
    node: "devops-tools"

tolerations: []

affinity: {}

podAnnotations: {}

podSecurityContext: {}

securityContext: {}
```
