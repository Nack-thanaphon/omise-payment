# Makefile for managing Docker Compose services

.PHONY: all dev prod deploy database-init database-reset stop clean logs build

all: dev

dev:
	@echo "Starting services in development mode..."
	docker-compose -f docker-compose.yml up --build -d
	@echo "Services are running. Access frontend at http://localhost/ and backend at http://localhost/hello-api/"

prod:
	@echo "Starting services in production mode..."
	docker-compose -f docker-compose.prod.yml up --build -d
	@echo "Production services are running. Ensure your domain is configured in nginx/nginx.conf."

deploy:
	@echo "Deploying services (requires docker swarm or kubernetes configuration not covered here)..."
	# Example for Docker Swarm:
	# docker stack deploy -c docker-compose.prod.yml --with-registry-auth myapp
	@echo "Deployment complete. Remember to configure your production environment variables."

database-init:
	@echo "Initializing database..."
	docker-compose -f docker-compose.yml exec postgres psql -U postgres -d payment_service -f /docker-entrypoint-initdb.d/init-db.sql
	@echo "Database initialization complete."

database-reset:
	@echo "Resetting database..."
	docker-compose -f docker-compose.yml down -v postgres
	@echo "Database reset complete. Run 'make dev' or 'make prod' to recreate with initial data."

stop:
	@echo "Stopping all services..."
	docker-compose -f docker-compose.yml down

clean:
	@echo "Stopping and removing all services, volumes, and dangling images..."
	docker-compose -f docker-compose.yml down -v --rmi all --remove-orphans
	docker volume prune -f

logs:
	@echo "Viewing service logs (Ctrl+C to exit)..."
	docker-compose -f docker-compose.yml logs -f

build:
	@echo "Building all service images..."
	docker-compose -f docker-compose.yml build
