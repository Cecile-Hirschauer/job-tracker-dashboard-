# scripts/docker-dev.sh - Script pour simplifier le développement
#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🐳 Job Tracker Dashboard - Docker Setup${NC}"

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo -e "${RED}❌ Docker n'est pas en cours d'exécution${NC}"
        exit 1
    fi
}

# Function to start services
start_services() {
    echo -e "${YELLOW}🚀 Démarrage des services...${NC}"
    docker-compose up -d postgres redis

    echo -e "${YELLOW}⏳ Attente que PostgreSQL soit prêt...${NC}"
    docker-compose exec postgres pg_isready -U postgres -d jobtracker

    echo -e "${GREEN}✅ Services démarrés avec succès !${NC}"
    echo -e "${GREEN}📊 PostgreSQL: localhost:5432${NC}"
    echo -e "${GREEN}💾 Redis: localhost:6379${NC}"
    echo -e "${GREEN}🔧 PgAdmin: http://localhost:5050${NC}"
}

# Function to stop services
stop_services() {
    echo -e "${YELLOW}🛑 Arrêt des services...${NC}"
    docker-compose down
    echo -e "${GREEN}✅ Services arrêtés${NC}"
}

# Function to reset database
reset_db() {
    echo -e "${YELLOW}🔄 Réinitialisation de la base de données...${NC}"
    docker-compose down -v
    docker-compose up -d postgres
    echo -e "${GREEN}✅ Base de données réinitialisée${NC}"
}

# Main script
case "$1" in
    start)
        check_docker
        start_services
        ;;
    stop)
        stop_services
        ;;
    restart)
        check_docker
        stop_services
        start_services
        ;;
    reset)
        check_docker
        reset_db
        ;;
    logs)
        docker-compose logs -f
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|reset|logs}"
        echo "  start   - Démarre les services"
        echo "  stop    - Arrête les services"
        echo "  restart - Redémarre les services"
        echo "  reset   - Réinitialise la DB"
        echo "  logs    - Affiche les logs"
        exit 1
        ;;
esac
