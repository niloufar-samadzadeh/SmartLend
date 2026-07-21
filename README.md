# SmartLend

![.NET](https://img.shields.io/badge/.NET-10-512BD4?logo=dotnet)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql)
![Python](https://img.shields.io/badge/Python-FastAPI-009688?logo=fastapi)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker)
![Railway](https://img.shields.io/badge/Deploy-Railway-0B0D0E)

SmartLend is a full-stack loan application and risk-assessment platform that combines a modern lending workflow with AI-powered risk scoring.

The application allows users to create accounts, submit loan applications, review their application history, and track lending decisions. Administrators can review all submitted applications and approve or reject them through a dedicated management dashboard.

## Live Demo

- **Frontend:** https://smartlend-frontend-production.up.railway.app/
- **API:** https://api-production-1ff4.up.railway.app/
- **API documentation:** Swagger UI is available when running the API locally in Development mode.

> The application is deployed on Railway. The first request may take slightly longer if a service is waking from an inactive state.

## Highlights

- Secure JWT-based authentication and role-based authorization
- User and administrator dashboards
- Loan application submission and tracking
- AI-powered risk scoring through a separate Python microservice
- Administrative approval and rejection workflow
- PostgreSQL persistence with Entity Framework Core migrations
- Centralized exception handling and structured validation responses
- Responsive, modern fintech-inspired interface
- Containerized services and cloud deployment

## Screenshots


### Authentication

![SmartLend login page](docs/screenshots/login.png)

### User Dashboard

![SmartLend user dashboard](docs/screenshots/dashboard.png)

### Loan Application

![SmartLend loan application form](docs/screenshots/application.png)

### Admin Dashboard

![SmartLend admin dashboard](docs/screenshots/admin-dashboard.png)

## Architecture

SmartLend uses a service-oriented architecture with independently deployed frontend, backend, database, and machine-learning services.

```text
React Frontend
      |
      | HTTPS / REST
      v
ASP.NET Core Web API
      |
      +--------------------+
      |                    |
      v                    v
PostgreSQL          FastAPI Risk Service
                         |
                         v
                  Machine-Learning Model
```

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Material UI
- React Router
- Axios

### Backend

- C#
- ASP.NET Core Web API
- Entity Framework Core
- JWT authentication
- Swagger / OpenAPI
- Npgsql

### Machine Learning Service

- Python
- FastAPI
- Scikit-learn
- Uvicorn

### Database and Deployment

- PostgreSQL
- Docker
- Railway
- GitHub

## Core Features

### Authentication and Authorization

Users can register and sign in using JWT-based authentication. Protected routes require a valid token, while administrative routes additionally verify the administrator role.

### Loan Application Workflow

Authenticated users can submit information including:

- Monthly income
- Employment status
- Employment history
- Requested loan amount
- Loan purpose
- Existing debt
- Credit-history length

The API validates the request before storing it and requesting a risk score from the machine-learning service.

### AI Risk Assessment

The ASP.NET Core API communicates with a separately deployed FastAPI service. The service evaluates application data and returns a risk score used in the lending workflow.

### User Dashboard

Users can:

- View total, approved, pending, and rejected applications
- Review recent submissions
- Track risk scores and current application statuses
- Start a new loan application

### Administrator Dashboard

Administrators can:

- Review applications submitted by all users
- View financial information and risk scores
- Approve pending applications
- Reject applications
- Monitor application statistics

### Error Handling and Validation

The API includes centralized exception handling and returns consistent responses for validation and runtime errors.

Example validation response:

```json
{
  "message": "Validation failed.",
  "errors": {
    "LoanAmount": [
      "Loan amount must be greater than zero."
    ]
  }
}
```

## Project Structure

```text
SmartLend/
├── SmartLend.Api/             # ASP.NET Core API, controllers and middleware
├── SmartLend.Core/            # Application services and business logic
├── SmartLend.Domain/          # Domain entities and enums
├── SmartLend.Infrastructure/  # EF Core, PostgreSQL and data access
├── frontend/                  # React and TypeScript client
├── ml-service/                # FastAPI risk-scoring service
├── docker-compose.yml
└── README.md
```


## Running Locally

### Prerequisites

Install:

- .NET SDK
- Node.js and npm
- Python 3
- Docker Desktop
- PostgreSQL, or use the provided Docker configuration

### 1. Clone the Repository

```bash
git clone https://github.com/niloufar-samadzadeh/SmartLend.git
cd SmartLend
```

### 2. Start PostgreSQL

Using Docker Compose:

```bash
docker compose up -d
```

Example local connection:

```text
Host=localhost
Port=5432
Database=SmartLendDb
Username=postgres
Password=SmartLend123!
```

Do not use development credentials in production.

### 3. Configure the API

Configure secrets from the repository root or API project directory:

```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=SmartLendDb;Username=postgres;Password=SmartLend123!" --project SmartLend.Api
dotnet user-secrets set "Jwt:Key" "replace-with-a-long-development-secret" --project SmartLend.Api
dotnet user-secrets set "Jwt:Issuer" "SmartLend.Api" --project SmartLend.Api
dotnet user-secrets set "Jwt:Audience" "SmartLend.Client" --project SmartLend.Api
dotnet user-secrets set "Services:RiskScoringUrl" "http://localhost:8000" --project SmartLend.Api
```

Run the API:

```bash
dotnet restore
dotnet run --project SmartLend.Api
```

Entity Framework Core migrations are applied automatically when the API starts.

### 4. Start the Machine-Learning Service

```bash
cd ml-service
python -m venv .venv
```

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Adjust the Uvicorn module path if the FastAPI entry file uses a different name.

### 5. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

During local development, Vite proxies `/api` requests to the ASP.NET Core API.

For production builds, configure:

```text
VITE_API_BASE_URL=https://your-api-domain.example/api
```

## Production Configuration

The deployed environment requires values equivalent to:

### API

```text
ConnectionStrings__DefaultConnection
Jwt__Key
Jwt__Issuer
Jwt__Audience
Services__RiskScoringUrl
Cors__AllowedOrigins__0
```

### Frontend

```text
VITE_API_BASE_URL
```

### Machine-Learning Service

The FastAPI service must listen on the port supplied by the hosting platform.

## Build and Verification

Backend:

```bash
dotnet build
```

Frontend:

```bash
cd frontend
npm run build
```

Machine-learning service:

```bash
cd ml-service
python -m compileall .
```

## Security Notes

- Passwords should only be stored as secure hashes.
- JWT signing keys must never be committed to source control.
- Production credentials should be stored as Railway variables or another secret-management system.
- CORS should allow only trusted frontend origins.
- Development credentials shown in this README are examples only.

## Future Improvements

- Automated administrator seeding
- Pagination, filtering, and search
- Decision audit history
- Rejection reasons and review notes
- Automated backend and frontend tests
- Refresh-token support
- CI/CD verification with GitHub Actions
- Improved model evaluation and explainability

## What This Project Demonstrates

SmartLend demonstrates practical experience with:

- Designing a modular full-stack application
- Building RESTful APIs with ASP.NET Core
- Implementing authentication and role-based access control
- Integrating .NET and Python microservices
- Managing relational data with PostgreSQL and EF Core
- Creating responsive React interfaces with TypeScript
- Containerizing and deploying distributed services
- Handling validation, failures, and external-service communication

## Author

**Niloufar Samadzadeh**

- GitHub: https://github.com/niloufar-samadzadeh
- LinkedIn: https://www.linkedin.com/in/niloufar-samadzadeh/

## License

This project is provided for portfolio and educational purposes.

Copyright © 2026 Niloufar Samadzadeh. All rights reserved.

