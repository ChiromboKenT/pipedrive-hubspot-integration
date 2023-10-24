# Pipedrive-Hubspot Integration

his repository contains the code for the Pipedrive-Hubspot integration service. The service listens for webhooks from both Pipedrive and Hubspot and performs the necessary synchronization between the two platforms.

## Table of Contents
- Getting Started
  - Prerequisites
  - Running Locally
  - Running with Docker
- Deployment with GitHub Actions
- API Endpoints
- Contributing
License

## Getting Started
### Prerequisites
- Node.js
- Docker (for running in a container)
- A .env file with the necessary environment variables
```bash
HUBSPOT_ACCESS_KEY=
RETRY_TIMES=3
PIPEDRIVE_URL=https://api.pipedrive.com/v1
PIPEDRIVE_API_TOKEN=
NODE_ENV=development
HEROKU_APP_NAME=pipedrive-hubspot-integration
HEROKU_REGISTRY_URL=registry.heroku.com/pipedrive-hubspot-integration/web
HEROKU_API_KEY
```
### Running Locally
1. Clone the repository
```bash
git clone https://github.com/yourusername/pipedrive-hubspot-integration.git
cd pipedrive-hubspot-integration
```
2. Install the dependencies
```bash
npm i
```
3. Start server
```bash
npm run dev
```

### Running with Docker
1. Build the Docker Image
```bash
docker build -t pipedrive-hubspot-integration .
```
2. Run the container
```bash
docker run -p 3000:3000 pipedrive-hubspot-integration
```

### Deployment with GitHub Actions
This repository is set up with a GitHub Actions workflow that automatically deploys the service to Heroku upon pushing to the main branch or manually triggering the workflow.

To deploy:

1. Set up the necessary secrets in your GitHub repository:
- HEROKU_API_KEY: Your Heroku API key.
- (Any other environment variables required by the application.)

2. Push to the main branch or manually trigger the workflow from the "Actions" tab in your GitHub repository.

### API Endpoints
Create a Contact in Hubspot and pipedrive
