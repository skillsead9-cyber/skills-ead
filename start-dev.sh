#!/bin/bash

# Script de inicialização do SKILLS Educacional - AMBIENTE DE DESENVOLVIMENTO
# Uso: ./start-dev.sh [start|stop|restart|logs|status]

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para exibir mensagens
print_message() {
    echo -e "${GREEN}[SKILLS DEV]${NC} $1"
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

# Função para iniciar
start() {
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
    print_info "Construindo e iniciando containers..."
    $DOCKER_COMPOSE_CMD -f docker-compose.dev.yml up -d --build
    
    # Aguarda alguns segundos para o container iniciar
    sleep 3
    
    # Verifica se o container está rodando
    if docker ps | grep -q "skills-educacional-dev"; then
        print_message "✓ Ambiente de desenvolvimento iniciado com sucesso!"
        echo ""
        print_info "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        print_info "🚀 Aplicação disponível em:"
        print_info "   http://localhost:3000"
        print_info "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        print_info "Comandos úteis:"
        print_info "  ./start-dev.sh logs    - Ver logs em tempo real"
        print_info "  ./start-dev.sh stop    - Parar o ambiente"
        print_info "  ./start-dev.sh restart - Reiniciar o ambiente"
        echo ""
        print_info "Para ver os logs agora, execute:"
        print_info "  ./start-dev.sh logs"
    else
        print_error "Falha ao iniciar o container. Verifique os logs:"
        print_info "  ./start-dev.sh logs"
        exit 1
    fi
}

# Função para parar
stop() {
    print_message "Parando ambiente de desenvolvimento..."
    $DOCKER_COMPOSE_CMD -f docker-compose.dev.yml down
    print_message "✓ Ambiente parado com sucesso!"
}

# Função para reiniciar
restart() {
    print_message "Reiniciando ambiente de desenvolvimento..."
    $DOCKER_COMPOSE_CMD -f docker-compose.dev.yml restart
    print_message "✓ Ambiente reiniciado com sucesso!"
    print_info "Aplicação disponível em: http://localhost:3000"
}

# Função para exibir logs
logs() {
    print_info "Exibindo logs do ambiente de desenvolvimento..."
    print_info "Pressione Ctrl+C para sair"
    echo ""
    $DOCKER_COMPOSE_CMD -f docker-compose.dev.yml logs -f
}

# Função para exibir status
status() {
    print_info "Status do ambiente de desenvolvimento:"
    echo ""
    
    if docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -q "skills-educacional-dev"; then
        docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep "skills-educacional-dev"
        echo ""
        print_message "✓ Container está rodando"
        print_info "Acesse: http://localhost:3000"
    else
        print_warning "Container não está rodando"
        print_info "Execute: ./start-dev.sh start"
    fi
}

# Função para exibir ajuda
show_help() {
    echo "SKILLS Educacional - Script de Desenvolvimento"
    echo ""
    echo "Uso: ./start-dev.sh [comando]"
    echo ""
    echo "Comandos:"
    echo "  start    Inicia o ambiente de desenvolvimento (padrão)"
    echo "  stop     Para o ambiente"
    echo "  restart  Reinicia o ambiente"
    echo "  logs     Exibe os logs em tempo real"
    echo "  status   Exibe o status do container"
    echo "  help     Exibe esta ajuda"
    echo ""
    echo "Exemplos:"
    echo "  ./start-dev.sh        # Inicia o ambiente"
    echo "  ./start-dev.sh logs   # Ver logs"
    echo "  ./start-dev.sh stop   # Parar"
    echo ""
}

# Main
check_docker
check_docker_compose

case "${1:-start}" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    logs)
        logs
        ;;
    status)
        status
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
