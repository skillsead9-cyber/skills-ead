#!/bin/bash

# Script de inicialização do SKILLS Educacional
# Uso: ./start.sh [dev|prod|stop|restart|logs]

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para exibir mensagens
print_message() {
    echo -e "${GREEN}[SKILLS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERRO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[AVISO]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Verifica se o Docker está instalado e rodando
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker não está instalado. Por favor, instale o Docker primeiro."
        exit 1
    fi

    if ! docker info &> /dev/null; then
        print_error "Docker não está rodando. Por favor, inicie o Docker primeiro."
        exit 1
    fi
}

# Verifica se o Docker Compose está instalado e define o comando a usar
DOCKER_COMPOSE_CMD=""

check_docker_compose() {
    # Verifica se docker compose (subcomando - versão moderna) está disponível
    if docker compose version &> /dev/null 2>&1; then
        DOCKER_COMPOSE_CMD="docker compose"
    # Fallback para docker-compose (versão antiga standalone)
    elif command -v docker-compose &> /dev/null 2>&1; then
        DOCKER_COMPOSE_CMD="docker-compose"
        print_warning "Usando docker-compose (versão antiga). Considere atualizar para 'docker compose'."
    else
        print_error "Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
        exit 1
    fi
}

# Função para iniciar em modo desenvolvimento
start_dev() {
    print_message "Iniciando ambiente de DESENVOLVIMENTO..."
    
    # Cria diretórios necessários
    mkdir -p logs
    
    # Verifica se node_modules existe localmente (opcional - Docker cuida das dependências)
    if [ ! -d "node_modules" ] && command -v npm &> /dev/null; then
        print_info "node_modules não encontrado. Instalando dependências localmente (opcional)..."
        npm install || print_warning "Falha ao instalar localmente, mas o Docker instalará dentro do container."
    elif [ ! -d "node_modules" ]; then
        print_info "node_modules não encontrado localmente. O Docker instalará as dependências dentro do container."
    fi
    
    # Inicia os containers
    $DOCKER_COMPOSE_CMD -f docker-compose.dev.yml up -d --build
    
    print_message "Ambiente de desenvolvimento iniciado!"
    print_info "Aplicação disponível em: http://localhost:3000"
    print_info "Para ver os logs: ./start.sh logs dev"
    print_info "Para parar: ./start.sh stop dev"
}

# Função para iniciar em modo produção
start_prod() {
    print_message "Iniciando ambiente de PRODUÇÃO..."
    
    # Cria diretórios necessários
    mkdir -p logs
    
    # Verifica certificados SSL (opcional)
    if [ ! -d "ssl" ]; then
        print_warning "Diretório 'ssl' não encontrado. HTTPS não funcionará sem certificados."
        print_info "Para habilitar HTTPS, coloque os certificados em ./ssl/skills.crt e ./ssl/skills.key"
        print_info "E descomente as linhas de volume SSL no docker-compose.yml"
    fi
    
    # Build e inicia os containers
    $DOCKER_COMPOSE_CMD -f docker-compose.yml up -d --build
    
    print_message "Ambiente de produção iniciado!"
    print_info "Aplicação disponível em:"
    print_info "  - HTTP:  http://localhost"
    print_info "  - HTTPS: https://localhost (se certificados estiverem configurados)"
    print_info "Para ver os logs: ./start.sh logs prod"
    print_info "Para parar: ./start.sh stop prod"
}

# Função para parar os containers
stop_containers() {
    local mode=$1
    
    if [ "$mode" == "dev" ]; then
        print_message "Parando ambiente de desenvolvimento..."
        $DOCKER_COMPOSE_CMD -f docker-compose.dev.yml down
    elif [ "$mode" == "prod" ]; then
        print_message "Parando ambiente de produção..."
        $DOCKER_COMPOSE_CMD -f docker-compose.yml down
    else
        print_message "Parando todos os ambientes..."
        $DOCKER_COMPOSE_CMD -f docker-compose.dev.yml down 2>/dev/null || true
        $DOCKER_COMPOSE_CMD -f docker-compose.yml down 2>/dev/null || true
    fi
    
    print_message "Containers parados!"
}

# Função para reiniciar os containers
restart_containers() {
    local mode=$1
    
    if [ "$mode" == "dev" ]; then
        print_message "Reiniciando ambiente de desenvolvimento..."
        $DOCKER_COMPOSE_CMD -f docker-compose.dev.yml restart
    elif [ "$mode" == "prod" ]; then
        print_message "Reiniciando ambiente de produção..."
        $DOCKER_COMPOSE_CMD -f docker-compose.yml restart
    else
        print_error "Especifique o modo: dev ou prod"
        exit 1
    fi
    
    print_message "Containers reiniciados!"
}

# Função para exibir logs
show_logs() {
    local mode=$1
    
    if [ "$mode" == "dev" ]; then
        $DOCKER_COMPOSE_CMD -f docker-compose.dev.yml logs -f
    elif [ "$mode" == "prod" ]; then
        $DOCKER_COMPOSE_CMD -f docker-compose.yml logs -f
    else
        print_error "Especifique o modo: dev ou prod"
        exit 1
    fi
}

# Função para exibir status
show_status() {
    print_info "Status dos containers:"
    echo ""
    
    if docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -q "skills-educacional"; then
        docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep "skills-educacional"
    else
        print_warning "Nenhum container SKILLS está rodando."
    fi
}

# Função para exibir ajuda
show_help() {
    echo "SKILLS Educacional - Script de Gerenciamento"
    echo ""
    echo "Uso: ./start.sh [comando] [modo]"
    echo ""
    echo "Comandos:"
    echo "  dev          Inicia o ambiente de desenvolvimento"
    echo "  prod         Inicia o ambiente de produção"
    echo "  stop [modo]  Para os containers (dev, prod ou ambos se omitido)"
    echo "  restart [modo] Reinicia os containers (dev ou prod)"
    echo "  logs [modo]  Exibe os logs em tempo real (dev ou prod)"
    echo "  status       Exibe o status dos containers"
    echo "  help         Exibe esta ajuda"
    echo ""
    echo "Exemplos:"
    echo "  ./start.sh dev           # Inicia desenvolvimento"
    echo "  ./start.sh prod          # Inicia produção"
    echo "  ./start.sh stop dev      # Para desenvolvimento"
    echo "  ./start.sh logs prod     # Ver logs de produção"
    echo ""
}

# Main
check_docker
check_docker_compose

case "${1:-help}" in
    dev)
        start_dev
        ;;
    prod)
        start_prod
        ;;
    stop)
        stop_containers "${2:-all}"
        ;;
    restart)
        restart_containers "$2"
        ;;
    logs)
        show_logs "$2"
        ;;
    status)
        show_status
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Comando inválido: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
