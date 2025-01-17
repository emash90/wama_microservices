# WAMA Microservices

A **Rental Management System** designed to streamline rental property management, featuring robust tools for managing tenants, houses, and payments. This system uses **RabbitMQ** for inter-service communication and is deployed on **Google Cloud Run** via containerized microservices.

---

## Features

### Tenant Management
- Add tenants and automatically update house occupancy status using RabbitMQ.

### House Management
- Manage property data, track occupancy status, and view house details.

### Payment Management
- Track payments, calculate outstanding balances, and display monthly income reports.

---

## Architecture

### Microservices
- **Frontend**  
  Built with **React.js**, offering an intuitive and responsive user interface.
- **API Gateway**  
  Routes incoming requests to the appropriate backend services.
- **Tenant Service**  
  Handles all tenant-related operations.
- **House Service**  
  Manages house data, including status and details.
- **Payment Service**  
  Tracks rental payments, calculates balances, and reports income.

### Message Broker
- **RabbitMQ** facilitates communication between services, ensuring seamless updates (e.g., house occupancy).

### Deployment
- Hosted on **Google Cloud Run** for scalability, reliability, and high availability.

---

## Setup

### Prerequisites
Ensure the following tools are installed before starting:  
- **Docker**  
- **RabbitMQ**  
- **Google Cloud CLI**

### Local Development

1. Clone the Repository:  
   ```bash
   git clone <repository_url>
   cd wama_microservices
