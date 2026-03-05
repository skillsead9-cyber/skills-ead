#!/bin/bash

# Script de inicialização do SKILLS Educacional - AMBIENTE DE PRODUÇÃO
# Uso: ./start-prod.sh [start|stop|restart|logs|status]

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para exibir mensagens
print_message() {
    echo -e "${GREEN}[SKILLS PROD]${NC} $1"
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

# Verifica certificados SSL
check_ssl() {
    if [ ! -d "ssl" ] || [ ! -f "ssl/skills.crt" ] || [ ! -f "ssl/skills.key" ]; then
        print_warning "Certificados SSL não encontrados em ./ssl/"
        print_info "HTTPS não funcionará sem certificados."
        print_info "Para habilitar HTTPS:"
        print_info "  1. Crie o diretório: mkdir -p ssl"
        print_info "  2. Coloque os certificados:"
        print_info "     - ssl/skills.crt"
        print_info "     - ssl/skills.key"
        print_info "  3. Descomente as linhas de volume SSL no docker-compose.yml"
        echo ""
    else
        print_info "✓ Certificados SSL encontrados"
    fi
}

# Função para iniciar
start() {
    print_message "Iniciando ambiente de PRODUÇÃO..."
    
    # Cria diretórios necessários
    mkdir -p logs
    
    # Verifica certificados SSL
    check_ssl
    
    # Build e inicia os containers
    print_info "Construindo aplicação (isso pode levar alguns minutos)..."
    $DOCKER_COMPOSE_CMD -f docker-compose.yml build --no-cache
    
    print_info "Iniciando containers..."
    $DOCKER_COMPOSE_CMD -f docker-compose.yml up -d
    
    # Aguarda alguns segundos para o container iniciar
    sleep 5
    
    # Verifica se o container está rodando
    if docker ps | grep -q "skills-educacional-prod"; then
        print_message "✓ Ambiente de produção iniciado com sucesso!"
        echo ""
        print_info "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        print_info "🚀 Aplicação disponível em:"
        print_info "   HTTP:  http://localhost"
        if [ -f "ssl/skills.crt" ] && [ -f "ssl/skills.key" ]; then
            print_info "   HTTPS: https://localhost"
        else
            print_info "   HTTPS: (não configurado - veja avisos acima)"
        fi
        print_info "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        print_info "Comandos úteis:"
        print_info "  ./start-prod.sh logs    - Ver logs em tempo real"
        print_info "  ./start-prod.sh stop    - Parar o ambiente"
        print_info "  ./start-prod.sh restart - Reiniciar o ambiente"
        print_info "  ./start-prod.sh status  - Ver status do container"
        echo ""
        print_info "Logs salvos em: ./logs/"
        print_info "  - skills_access.log (acessos)"
        print_info "  - skills_error.log (erros)"
        echo ""
    else
        print_error "Falha ao iniciar o container. Verifique os logs:"
        print_info "  ./start-prod.sh logs"
        exit 1
    fi
}

# Função para parar
stop() {
    print_message "Parando ambiente de produção..."
    $DOCKER_COMPOSE_CMD -f docker-compose.yml down
    print_message "✓ Ambiente parado com sucesso!"
}

# Função para reiniciar
restart() {
    print_message "Reiniciando ambiente de produção..."
    $DOCKER_COMPOSE_CMD -f docker-compose.yml restart
    print_message "✓ Ambiente reiniciado com sucesso!"
    print_info "Aplicação disponível em:"
    print_info "  HTTP:  http://localhost"
    if [ -f "ssl/skills.crt" ] && [ -f "ssl/skills.key" ]; then
        print_info "  HTTPS: https://localhost"
    fi
}

# Função para exibir logs
logs() {
    print_info "Exibindo logs do ambiente de produção..."
    print_info "Pressione Ctrl+C para sair"
    echo ""
    $DOCKER_COMPOSE_CMD -f docker-compose.yml logs -f
}

# Função para exibir status
status() {
    print_info "Status do ambiente de produção:"
    echo ""
    
    if docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -q "skills-educacional-prod"; then
        docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep "skills-educacional-prod"
        echo ""
        print_message "✓ Container está rodando"
        print_info "Acesse:"
        print_info "  HTTP:  http://localhost"
        if [ -f "ssl/skills.crt" ] && [ -f "ssl/skills.key" ]; then
            print_info "  HTTPS: https://localhost"
        else
            print_info "  HTTPS: (não configurado)"
        fi
    else
        print_warning "Container não está rodando"
        print_info "Execute: ./start-prod.sh start"
    fi
}

# Função para rebuild completo
rebuild() {
    print_message "Fazendo rebuild completo do ambiente de produção..."
    print_warning "Isso pode levar vários minutos..."
    
    $DOCKER_COMPOSE_CMD -f docker-compose.yml down
    $DOCKER_COMPOSE_CMD -f docker-compose.yml build --no-cache
    $DOCKER_COMPOSE_CMD -f docker-compose.yml up -d
    
    print_message "✓ Rebuild concluído!"
    status
}

# Função para exibir ajuda
show_help() {
    echo "SKILLS Educacional - Script de Produção"
    echo ""
    echo "Uso: ./start-prod.sh [comando]"
    echo ""
    echo "Comandos:"
    echo "  start    Inicia o ambiente de produção (padrão)"
    echo "  stop     Para o ambiente"
    echo "  restart  Reinicia o ambiente"
    echo "  logs     Exibe os logs em tempo real"
    echo "  status   Exibe o status do container"
    echo "  rebuild  Faz rebuild completo (limpa cache)"
    echo "  help     Exibe esta ajuda"
    echo ""
    echo "Exemplos:"
    echo "  ./start-prod.sh        # Inicia o ambiente"
    echo "  ./start-prod.sh logs   # Ver logs"
    echo "  ./start-prod.sh stop   # Parar"
    echo "  ./start-prod.sh rebuild # Rebuild completo"
    echo ""
    echo "Nota: O primeiro build pode levar vários minutos."
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
    rebuild)
        rebuild
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
