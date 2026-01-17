# Deployment Workflow with GitHub Actions

## Detailed Guide

For a comprehensive step-by-step guide on setting up deployment workflows with GitHub Actions, including code examples and best practices, check out this tutorial:

**[Deployment Workflow with GitHub Action 🚢](https://dev.to/wildanzr/deployment-workflow-with-github-action-14nm)**

The tutorial covers:

- Complete workflow configuration
- Docker container registry setup
- Environment variable management
- SSH deployment strategies
- Troubleshooting common issues

### Workflow Overview

The deployment process consists of two main jobs:

1. **Build and Push**: Builds the Docker image and pushes it to GitHub Container Registry
2. **Deploy**: Pulls the latest image on your VPS and restarts the application with updated environment variables

### Setting Up Deployment

To set up automated deployment for your project:

1. **Create workflow file** in `.github/workflows/staging.yaml`
2. **Configure GitHub Environment** in repository settings
3. **Add required secrets**:
   - `VPS_STAGING_HOST`: Your VPS server address
   - `VPS_STAGING_USER`: SSH username
   - `VPS_STAGING_KEY`: SSH private key
   - Environment variables from your `.env.example` file
4. **Push to staging branch** to trigger the workflow

## License

This project is licensed under the MIT License - see the package.json file for details.

---

**Wildanzrrr** - Built with ❤️ using NestJS
