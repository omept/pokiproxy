# Pokémon API Proxy Service

This project is a scalable Nestjs application that acts as a proxy service for fetching Pokémon data from the PokéAPI. The app demonstrates modern backend development practices, including:
- Request timeouts and performance logging.
- Dockerization for easy deployment.

## Features
1. **Fetch Pokémon Data**: Retrieves a list of Pokémon from the PokéAPI with caching to reduce external API calls.
2. **Request Timeout**: Ensures that PokéAPI requests do not hang indefinitely.
3. **Performance Logging**: Logs the duration of each API request to aid in debugging and performance monitoring.
5. **Dockerized Deployment**: Fully containerized setup for consistent environments across development and production.

---

## Project Structure
```
src/
├── modules/
│   ├── pokemon/
│   │   ├── controllers/
│   │   │   └── pokemon.controller.ts  # Controller handling HTTP requests
│   │   ├── services/
│   │   │   └── pokemon.service.ts     # Service handling business logic
│   │   ├── pipes/
│   │   │   └── is-positive.pipe.ts     # Pipe for transforming query param
│   │   ├── types/
│   │   │   └── pokemon-response.ts     # Interface defination for pokemon service response
├── main.ts                            # Application entry point
├── app.module.ts                      # Root module
├── app.controller.ts                  # Root controller
├── app.service.ts                     # Root service

```

---

## Setup and Installation

### Prerequisites
- Node.js v18 or later
- Docker & Docker Compose

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/omept/pokiproxy.git
   cd pokiproxy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```


3. Run the development server:
   ```bash
   npm run start:dev
   ```

4. Access the application at `http://localhost:3000/api/pokemons`. or by applying a filter `http://localhost:3000/api/pokemons?limit=100&page=1`

* page and limit are positive numbers and defaults to 1 and 10 respectively.

### Dockerized Deployment

1. Build the Docker image:
   ```bash
   docker compose build -d
   ```

2. Run the container:
   ```bash
   docker compose up -d
   ```

3. Access the application at `http://localhost:3000/api/pokemons`. Or by applying a filter `http://localhost:3000/api/pokemons?limit=100&page=1`

* page and limit are positive numbers and defaults to 1 and 10 respectively.
---

## API Details

### Endpoint
`GET /api/pokemons`

### Description
Fetches a list of Pokémon from the PokéAPI. Results are cached for 60 minutes to reduce API calls.

### Query Params
limit: number (defaults to 10)
page: number (defaults to 1)


### Response Example
```json
{
  "count": 1118,
  "results": [
    { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
    { "name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/" },
    ...
  ]
}
```

---

## Key Features Implementation

### 1. **External Request Call Timeout and Performance Logging**

### 2. **Dockerization**
- The `Dockerfile` and `docker-compose.yml` define the container environment and services for seamless deployment.
- Exposes port `3000` for application access.

---

## Packages Used
- **Nest.js**: Nodejs framework.
- **Axios**: HTTP client for making requests to the PokéAPI.
- **NodeCache**: Caching library for reducing redundant API calls.
- **Docker**: Containerization platform for deployment.

---

## Testing

1. **Jest Testing**:
   - Run jest test with `npm run test`
2. **Manual Testing**:
   - Access the endpoint at `http://localhost:3000/api/pokemons` to verify data retrieval and logging.

3. **Docker Testing**:
   - Ensure the app runs successfully in a containerized environment with `docker-compose`.

---

## Time Spent
- Initial Setup: 1 hours
- Api endpoint, Request Timeout, and Logging: 2 hour
- Dockerization: 1 hours
- Documentation: 2 hour
- **Total**: 6 hours

---
