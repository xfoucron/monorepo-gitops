# Docs

## Kustomize

We manage environment-specific configurations using Kustomize. \
This approach allows reusing shared resources across environments without duplication.

### Folder Structure

```
├── kustomization.yaml
├── base
│   ├── kustomization.yaml
│   └── ...
└── overlays
    ├── development
    │   ├── kustomization.yaml
    │   └── ...
    ├── production
    │   ├── kustomization.yaml
    │   └── ...
    └── staging
        ├── kustomization.yaml
        └── ...
```

- *base*: contains all the common manifests shared across environments.
- *overlays*: contains environment-specific configurations, patches, or resources.

### How to deploy

#### Locally

Apply to *all environments* :

```shell
kubectl apply --kustomize .
```

Apply to *a specific environment* (example: `production`):

```shell
kubectl apply --kustomize overlays/production
```
