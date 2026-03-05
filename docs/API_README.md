# 🎓 API RESTful - Sistema Escolar ERP

## 📋 Resumo da Implementação

Uma **API RESTful completa e documentada** foi criada para integração de banco de dados do Sistema Escolar. A API fornece endpoints para gerenciar todos os módulos da aplicação com autenticação, autorização e tratamento de erros robusto.

---

## ✨ Recursos Implementados

### 1️⃣ **Arquitetura RESTful Profissional**

- Endpoints organizados por recursos (Students, Employees, Users, etc.)
- Versionamento de API (`/api/v1`)
- Estrutura clara de respostas (sucesso/erro)
- HTTP status codes apropriados

### 2️⃣ **Autenticação e Autorização**

- Autenticação via sessão (Flask-Login)
- Controle de papel baseado em função (Role-Based Access Control)
- Verificação automática de permissões por endpoint
- Isolamento de dados por filial

### 3️⃣ **8 Módulos de Recursos Implementados**

#### 📚 Alunos (`/api/v1/students`)
- `GET` - Listar alunos com paginação
- `POST` - Criar novo aluno
- `GET {id}` - Obter detalhes
- `PUT {id}` - Atualizar aluno
- `DELETE {id}` - Remover aluno
- `POST {id}/activate` - Ativar aluno
- `POST {id}/deactivate` - Desativar aluno

#### 🏢 Filiais (`/api/v1/branches`)
- `GET` - Listar todas as filiais
- `POST` - Criar filial (admin)
- `GET {id}` - Obter detalhes
- `PUT {id}` - Atualizar filial (admin)
- `DELETE {id}` - Remover filial (admin)

#### 👥 Usuários (`/api/v1/users`)
- `GET` - Listar usuários
- `POST` - Criar usuário
- `GET {id}` - Obter detalhes
- `PUT {id}` - Atualizar usuário
- `DELETE {id}` - Remover usuário (admin)

#### 👨‍💼 Funcionários (`/api/v1/employees`)
- `GET` - Listar funcionários
- `POST` - Criar funcionário
- `GET {id}` - Obter detalhes
- `PUT {id}` - Atualizar funcionário
- `DELETE {id}` - Remover funcionário

#### 📖 Turmas (`/api/v1/classes`)
- `GET` - Listar turmas
- `POST` - Criar turma
- `GET {id}` - Obter detalhes
- `PUT {id}` - Atualizar turma
- `DELETE {id}` - Remover turma

#### 📚 Cursos (`/api/v1/courses`)
- `GET` - Listar cursos
- `POST` - Criar curso
- `GET {id}` - Obter detalhes
- `PUT {id}` - Atualizar curso
- `DELETE {id}` - Remover curso

#### 💰 Pagamentos (`/api/v1/payments`)
- `GET` - Listar pagamentos (financeiro/admin)
- `POST` - Registrar pagamento
- `GET {id}` - Obter detalhes

#### ✅ Presenças (`/api/v1/attendances`)
- `GET` - Listar presenças
- `POST` - Registrar presença
- `GET {id}` - Obter detalhes
- `PUT {id}` - Atualizar presença
- `DELETE {id}` - Remover presença
- `GET /enrollment/{id}` - Presenças de um aluno

### 4️⃣ **Documentação Interativa Swagger**

- Acessível em: `http://localhost:5000/api/docs`
- Swagger UI integrada com Flask-RESTX
- Tester interativo direto na interface
- Documentação automática de modelos

### 5️⃣ **Paginação Implementada**

- Suporte a `page` e `per_page` query parameters
- Resposta com metadados (total, pages, has_next, has_prev)
- Padrão: 20 itens por página
- Configurável por requisição

### 6️⃣ **Tratamento de Erros Robusto**

```json
{
  "success": false,
  "message": "Descrição do erro",
  "errors": {
    "field_name": ["Detalhes específico"]
  }
}
```

- Validação de entrada
- Mensagens de erro claras
- Status codes apropriados (400, 401, 403, 404, 500)

### 7️⃣ **Cliente Python Incluído**

- Arquivo: `api_client.py`
- Facilita integração com sistemas externos
- Tratamento de erros customizado
- Suporte para todos os endpoints

### 8️⃣ **Documentação Completa**

- **API_DOCUMENTATION.md** - Documentação detalhada de cada endpoint
- **GUIA_RAPIDO_API.md** - Guia prático de uso e exemplos
- **api_client.py** - Cliente Python reutilizável
- **test_api_endpoints.py** - Testes automatizados

---

## 📁 Estrutura de Arquivos Criados

```
app/
├── api/
│   ├── __init__.py              # Registro do blueprint da API
│   └── v1/
│       ├── __init__.py
│       ├── schemas.py           # Modelos de validação
│       ├── utils.py             # Utilitários (serialização, paginação)
│       └── resources/
│           ├── __init__.py
│           ├── students.py      # Endpoints de alunos
│           ├── branches.py      # Endpoints de filiais
│           ├── users.py         # Endpoints de usuários
│           ├── employees.py     # Endpoints de funcionários
│           ├── courses.py       # Endpoints de cursos
│           ├── classes.py       # Endpoints de turmas
│           ├── payments.py      # Endpoints de pagamentos
│           └── attendances.py   # Endpoints de presenças
│
API_DOCUMENTATION.md             # Documentação completa da API
GUIA_RAPIDO_API.md              # Guia rápido de uso
api_client.py                    # Cliente Python para integração
test_api_endpoints.py            # Testes automatizados
```

---

## 🚀 Como Usar

### 1. Instalar Dependências

```bash
cd "d:\Sistema escolar"
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 2. Iniciar Servidor

```bash
python run.py
```

### 3. Acessar Documentação

**Swagger UI Interativa**: http://localhost:5000/api/docs

### 4. Testar Endpoints

#### Com cURL:
```bash
# Login
curl -c cookies.txt -d "username=admin&password=senha123" \
  http://localhost:5000/login

# Listar alunos
curl -b cookies.txt \
  "http://localhost:5000/api/v1/students?page=1"

# Criar aluno
curl -b cookies.txt -X POST \
  -H "Content-Type: application/json" \
  -d '{"registration_number":"MAT001","first_name":"João","last_name":"Silva","branch_id":1}' \
  http://localhost:5000/api/v1/students
```

#### Com Python:
```python
from api_client import SchoolAPIClient

client = SchoolAPIClient("http://localhost:5000", "admin", "senha123")

# Listar alunos
students = client.get_students()

# Criar aluno
new_student = client.create_student({
    "registration_number": "MAT001",
    "first_name": "João",
    "last_name": "Silva",
    "branch_id": 1
})

# Registrar presença
attendance = client.create_attendance({
    "enrollment_id": 1,
    "class_subject_id": 1,
    "attendance_date": "2026-02-28",
    "status": "presente"
})
```

---

## 🔐 Segurança

- ✅ Autenticação obrigatória em todos os endpoints
- ✅ Autorização baseada em papel
- ✅ Validação de entrada
- ✅ Isolamento de dados por filial
- ✅ Proteção contra SQL injection (via SQLAlchemy)
- ✅ Senhas hashadas com werkzeug.security

---

## 📊 Exemplos de Integração

### Sincronizar com Excel
```python
import pandas as pd
from api_client import SchoolAPIClient

df = pd.read_excel("alunos.xlsx")
client = SchoolAPIClient("http://localhost:5000", "admin", "senha123")

for _, row in df.iterrows():
    client.create_student({
        "registration_number": row['matricula'],
        "first_name": row['nome'],
        "last_name": row['sobrenome'],
        "email": row['email'],
        "branch_id": 1
    })
```

### Sincronizar com API Terceira
```python
import requests
from api_client import SchoolAPIClient

external_api = "https://api.external.com/students"
students = requests.get(external_api).json()

client = SchoolAPIClient("http://localhost:5000", "admin", "senha123")
for student in students:
    client.create_student({
        "registration_number": student['id'],
        "first_name": student['first_name'],
        "last_name": student['last_name'],
        "email": student['email'],
        "branch_id": 1
    })
```

---

## 🧪 Testes

Executar testes automatizados:

```bash
pip install pytest
python -m pytest test_api_endpoints.py -v
```

Testes cobrem:
- ✅ Autenticação e autorização
- ✅ CRUD operations
- ✅ Validação de dados
- ✅ Tratamento de erros
- ✅ Paginação
- ✅ Duplicação de dados

---

## 📚 Documentação Detalhada

### [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
Documentação completa com:
- Descrição de cada endpoint
- Query parameters
- Body esperado em cada requisição
- Exemplos de respostas
- Códigos de erro
- Tratamento de erros

### [GUIA_RAPIDO_API.md](GUIA_RAPIDO_API.md)
Guia prático com:
- Passos para iniciar
- Exemplos de uso em Python, cURL, JavaScript
- Como testar com Postman
- Sincronização com sistemas externos
- Boas práticas
- Troubleshooting

### [api_client.py](api_client.py)
Cliente Python com:
- Métodos para cada endpoint
- Tratamento de erros customizado
- Autenticação automática
- Exemplos de uso inclusos

---

## ✅ Checklist de Implementação

- ✅ Estrutura RESTful
- ✅ 8 módulos de recursos
- ✅ Autenticação e autorização
- ✅ Paginação
- ✅ Validação de dados
- ✅ Tratamento de erros
- ✅ Documentação Swagger
- ✅ Cliente Python
- ✅ Testes automatizados
- ✅ Documentação em Markdown
- ✅ Exemplos de integração
- ✅ Guia rápido de uso

---

## 🔗 Links Importantes

| Recurso | URL/Arquivo |
|---------|------------|
| Documentação Swagger | http://localhost:5000/api/docs |
| API Base | http://localhost:5000/api/v1 |
| Documentação Completa | [API_DOCUMENTATION.md](API_DOCUMENTATION.md) |
| Guia Rápido | [GUIA_RAPIDO_API.md](GUIA_RAPIDO_API.md) |
| Cliente Python | [api_client.py](api_client.py) |
| Testes | [test_api_endpoints.py](test_api_endpoints.py) |

---

## 📝 Próximos Passos (Opcional)

- [ ] Implementar rate limiting
- [ ] Adicionar autenticação por token (JWT)
- [ ] Cache com Redis
- [ ] Webhooks para eventos
- [ ] GraphQL endpoint
- [ ] API keys para terceiros

---

**Data de Criação**: 28 de Fevereiro de 2026  
**Versão**: 1.0.0  
**Status**: ✅ Completo e Documentado
