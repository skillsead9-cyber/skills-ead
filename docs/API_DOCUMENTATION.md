# 📚 Documentação da API RESTful - Sistema Escolar ERP

## Índice
- [Visão Geral](#visão-geral)
- [Autenticação](#autenticação)
- [Estrutura de Respostas](#estrutura-de-respostas)
- [Endpoints](#endpoints)
- [Exemplos de Uso](#exemplos-de-uso)
- [Tratamento de Erros](#tratamento-de-erros)
- [Paginação](#paginação)

---

## Visão Geral

A API RESTful do Sistema Escolar permite integração completa com o banco de dados da instituição. A API está documentada com **Swagger/OpenAPI** e acessível em:

- **URL Base**: `http://localhost:5000/api/v1`
- **Documentação Interativa (Swagger UI)**: `http://localhost:5000/api/docs`
- **Documentação OpenAPI JSON**: `http://localhost:5000/api/v1/swagger.json`

### Versão
- **Versão da API**: 1.0
- **Data de Criação**: 2026-02-28

---

## Autenticação

Todos os endpoints requerem **autenticação via sessão** (Flask-Login).

### Como Autenticar

1. **Fazer login via interface web**:
```bash
POST /login
Content-Type: application/x-www-form-urlencoded

username=seu_usuario&password=sua_senha
```

2. **Usar cookies de sessão**: Após login, os cookies de sessão automaticamente autenticam as requisições de API.

3. **Verificação de Permissão**: A API verifica automaticamente o papel do usuário para cada operação.

---

## Estrutura de Respostas

### Sucesso (2xx)

```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@example.com",
    "created_at": "2026-02-28T10:30:00"
  }
}
```

### Erro (4xx, 5xx)

```json
{
  "success": false,
  "message": "Descrição do erro",
  "errors": {
    "field_name": ["Detalhes do erro"]
  }
}
```

---

## Endpoints

### 📚 ALUNOS (Students)

#### 1. Listar Alunos
```
GET /api/v1/students
```

**Query Parameters**:
| Parâmetro | Tipo | Descrição | Padrão |
|-----------|------|-----------|--------|
| page | int | Número da página | 1 |
| per_page | int | Itens por página | 20 |
| active_only | bool | Apenas alunos ativos | false |

**Autenticação**: Requerida
**Permissão**: Qualquer usuário autenticado

**Exemplo**:
```bash
curl -X GET "http://localhost:5000/api/v1/students?page=1&per_page=20&active_only=false" \
  -H "Content-Type: application/json" \
  --cookie "session=..."
```

**Resposta Sucesso (200)**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "registration_number": "MAT001",
        "first_name": "João",
        "last_name": "Silva",
        "cpf": "123.456.789-00",
        "email": "joao@example.com",
        "birth_date": "2006-05-15",
        "gender": "M",
        "address": "Rua A, 123",
        "city": "São Paulo",
        "state": "SP",
        "branch_id": 1,
        "enrollment_status": "ativa",
        "is_active": true,
        "created_at": "2026-02-28T10:30:00"
      }
    ],
    "total": 150,
    "pages": 8,
    "current_page": 1,
    "per_page": 20,
    "has_next": true,
    "has_prev": false
  }
}
```

---

#### 2. Criar Aluno
```
POST /api/v1/students
```

**Body Esperado**:
```json
{
  "registration_number": "MAT002",
  "first_name": "Maria",
  "last_name": "Santos",
  "cpf": "987.654.321-00",
  "email": "maria@example.com",
  "phone": "(11) 99999-8888",
  "birth_date": "2006-08-20",
  "gender": "F",
  "address": "Rua B, 456",
  "city": "São Paulo",
  "state": "SP",
  "zip_code": "01234-567",
  "branch_id": 1,
  "enrollment_status": "ativa"
}
```

**Resposta Sucesso (201)**:
```json
{
  "success": true,
  "message": "Aluno criado com sucesso",
  "data": {
    "id": 2,
    "registration_number": "MAT002",
    ...
  }
}
```

**Possíveis Erros**:
- `400`: registration_number duplicado
- `400`: Filial inválida
- `400`: Campos obrigatórios faltando

---

#### 3. Obter Detalhes do Aluno
```
GET /api/v1/students/{id}
```

**Parâmetros**:
- `id` (int): ID do aluno

**Exemplo**:
```bash
curl -X GET "http://localhost:5000/api/v1/students/1" \
  --cookie "session=..."
```

**Resposta Sucesso (200)**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "registration_number": "MAT001",
    ...
  }
}
```

---

#### 4. Atualizar Aluno
```
PUT /api/v1/students/{id}
```

**Body Esperado** (apenas campos a atualizar):
```json
{
  "first_name": "João Gabriel",
  "email": "joao.gabriel@example.com",
  "phone": "(11) 99999-9999",
  "enrollment_status": "ativa"
}
```

**Resposta Sucesso (200)**:
```json
{
  "success": true,
  "data": {...}
}
```

---

#### 5. Deletar Aluno
```
DELETE /api/v1/students/{id}
```

**Resposta Sucesso (200)**:
```json
{
  "success": true,
  "message": "Aluno removido com sucesso"
}
```

---

#### 6. Ativar Aluno
```
POST /api/v1/students/{id}/activate
```

**Resposta Sucesso (200)**:
```json
{
  "success": true,
  "message": "Aluno ativado com sucesso",
  "data": {...}
}
```

---

#### 7. Desativar Aluno
```
POST /api/v1/students/{id}/deactivate
```

**Resposta Sucesso (200)**:
```json
{
  "success": true,
  "message": "Aluno desativado com sucesso",
  "data": {...}
}
```

---

### 🏢 FILIAIS (Branches)

#### 1. Listar Filiais
```
GET /api/v1/branches
```

**Query Parameters**:
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| page | int | Número da página |
| per_page | int | Itens por página |
| active_only | bool | Apenas filiais ativas |

**Permissão**: Administrador vê todas; Usuários normais veem apenas sua filial

**Exemplo**:
```bash
curl -X GET "http://localhost:5000/api/v1/branches?page=1" \
  --cookie "session=..."
```

---

#### 2. Criar Filial
```
POST /api/v1/branches
```

**Permissão**: Apenas Administrador

**Body Esperado**:
```json
{
  "code": "SP001",
  "name": "Matriz São Paulo",
  "address": "Av. Paulista, 1000",
  "city": "São Paulo",
  "state": "SP",
  "zip_code": "01000-000",
  "phone": "(11) 3333-3333",
  "email": "sp@example.com",
  "cnpj": "12.345.678/0001-90",
  "principal_name": "Prof. Dr. João",
  "is_active": true
}
```

**Campos Obrigatórios**: code, name, address, city, state, cnpj

**Resposta Sucesso (201)**:
```json
{
  "success": true,
  "message": "Filial criada com sucesso",
  "data": {...}
}
```

---

#### 3. Obter Detalhes da Filial
```
GET /api/v1/branches/{id}
```

**Permissão**: Administrador vê todas; Usuários veem apenas sua filial

---

#### 4. Atualizar Filial
```
PUT /api/v1/branches/{id}
```

**Permissão**: Apenas Administrador

**Body Esperado** (campos a atualizar):
```json
{
  "name": "Matriz São Paulo - Atualizada",
  "principal_name": "Prof. Dr. Maria",
  "phone": "(11) 3333-4444"
}
```

---

#### 5. Deletar Filial
```
DELETE /api/v1/branches/{id}
```

**Permissão**: Apenas Administrador

---

### 👥 USUÁRIOS (Users)

#### 1. Listar Usuários
```
GET /api/v1/users
```

**Query Parameters**:
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| page | int | Número da página |
| per_page | int | Itens por página |

**Nota**: A senha nunca é retornada nas respostas

---

#### 2. Criar Usuário
```
POST /api/v1/users
```

**Permissão**: Administrador ou Diretor

**Body Esperado**:
```json
{
  "employee_id": "FUNC001",
  "username": "joao.silva",
  "email": "joao.silva@example.com",
  "first_name": "João",
  "last_name": "Silva",
  "password": "SenhaSegura123!",
  "role": "professor",
  "branch_id": 1,
  "phone": "(11) 99999-8888",
  "is_active": true
}
```

**Papéis Disponíveis**:
- `administrador`
- `diretor`
- `gerente_financeiro`
- `professor`
- `funcionario`
- `responsavel`

---

#### 3. Atualizar Usuário
```
PUT /api/v1/users/{id}
```

**Permissão**: 
- Usuário pode atualizar seus próprios dados
- Administrador pode atualizar qualquer usuário
- Apenas Administrador pode alterar papel e status

**Body Esperado**:
```json
{
  "first_name": "João Gabriel",
  "email": "joao.gabriel@example.com",
  "phone": "(11) 99999-9999",
  "password": "NovaSenha123!"
}
```

---

#### 4. Deletar Usuário
```
DELETE /api/v1/users/{id}
```

**Permissão**: Apenas Administrador

---

### 👨‍💼 FUNCIONÁRIOS (Employees)

#### 1. Listar Funcionários
```
GET /api/v1/employees
```

**Filtros Disponíveis**:
- Administrador vê todos
- Outros usuários veem apenas o da sua filial

---

#### 2. Criar Funcionário
```
POST /api/v1/employees
```

**Permissão**: Administrador ou Diretor

**Body Esperado**:
```json
{
  "employee_id": "EMP001",
  "first_name": "Carlos",
  "last_name": "Oliveira",
  "cpf": "111.222.333-44",
  "rg": "12.345.678-9",
  "birth_date": "1985-03-15",
  "gender": "M",
  "email": "carlos@example.com",
  "phone": "(11) 99999-7777",
  "address": "Rua C, 789",
  "employee_type_id": 1,
  "branch_id": 1,
  "department_id": null,
  "position": "Professor de Matemática",
  "hire_date": "2020-01-15",
  "salary": 3000.00,
  "is_active": true
}
```

**Campos Obrigatórios**: employee_id, first_name, last_name, cpf, hire_date, branch_id

---

#### 3. Atualizar Funcionário
```
PUT /api/v1/employees/{id}
```

**Permissão**: Administrador ou Diretor

**Campos Atualizáveis**: first_name, last_name, email, phone, position, salary, termination_date, is_active

---

#### 4. Deletar Funcionário
```
DELETE /api/v1/employees/{id}
```

**Permissão**: Apenas Administrador

---

### 📚 CURSOS (Courses)

#### 1. Listar Cursos
```
GET /api/v1/courses
```

**Query Parameters**:
| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| active_only | bool | Apenas cursos ativos |

---

#### 2. Criar Curso
```
POST /api/v1/courses
```

**Permissão**: Administrador ou Diretor

**Body Esperado**:
```json
{
  "code": "MAT2024",
  "name": "Matemática - 2024",
  "description": "Curso de Matemática Avançada",
  "full_price": 500.00,
  "branch_id": 1,
  "is_active": true
}
```

**Campos Obrigatórios**: code, name, full_price, branch_id

---

#### 3. Atualizar Curso
```
PUT /api/v1/courses/{id}
```

**Campos Atualizáveis**: name, description, full_price, is_active

---

#### 4. Deletar Curso
```
DELETE /api/v1/courses/{id}
```

**Permissão**: Apenas Administrador

---

### 📖 TURMAS (Classes)

#### 1. Listar Turmas
```
GET /api/v1/classes
```

---

#### 2. Criar Turma
```
POST /api/v1/classes
```

**Permissão**: Administrador ou Diretor

**Body Esperado**:
```json
{
  "code": "1A",
  "name": "Turma 1-A",
  "level": "1º ano",
  "shift": "Matutino",
  "max_students": 40,
  "classroom": "Sala 101",
  "teacher_id": 1,
  "academic_year_id": 1,
  "branch_id": 1,
  "is_active": true
}
```

**Turnos Válidos**: Matutino, Vespertino, Noturno

**Campos Obrigatórios**: code, name, level, shift, academic_year_id, branch_id

---

#### 3. Atualizar Turma
```
PUT /api/v1/classes/{id}
```

---

#### 4. Deletar Turma
```
DELETE /api/v1/classes/{id}
```

---

### 💰 PAGAMENTOS (Payments)

#### 1. Listar Pagamentos
```
GET /api/v1/payments
```

**Permissão**: Apenas Administrador e Gerente Financeiro

---

#### 2. Registrar Pagamento
```
POST /api/v1/payments
```

**Permissão**: Apenas Administrador e Gerente Financeiro

**Body Esperado**:
```json
{
  "reference_number": "PAG001-2026",
  "installment_id": 1,
  "amount": 250.00,
  "payment_date": "2026-02-28",
  "payment_method": "transfer",
  "receipt_number": "REC123456",
  "notes": "Pagamento recebido sem problemas"
}
```

**Métodos de Pagamento Válidos**:
- cash (dinheiro)
- check (cheque)
- transfer (transferência)
- card (cartão)

**Campos Obrigatórios**: reference_number, installment_id, amount, payment_date

**Lógica Automática**:
- Atualiza `paid_amount` da parcela
- Marca parcela como "pago" ou "parcial"

---

#### 3. Obter Detalhes do Pagamento
```
GET /api/v1/payments/{id}
```

---

### ✅ PRESENÇAS (Attendances)

#### 1. Listar Presenças
```
GET /api/v1/attendances
```

**Permissão**: Apenas Professor e Administrador

---

#### 2. Registrar Presença
```
POST /api/v1/attendances
```

**Permissão**: Professor e Administrador

**Body Esperado**:
```json
{
  "enrollment_id": 1,
  "class_subject_id": 1,
  "attendance_date": "2026-02-28",
  "status": "presente",
  "notes": "Aluno presente na aula"
}
```

**Status Válidos**:
- presente
- ausente
- justificado
- falta_prevista

**Lógica Especial**:
- Se presença já existe, a requisição atualiza em vez de criar nova
- Registra automaticamente o professor como `observed_by`

---

#### 3. Atualizar Presença
```
PUT /api/v1/attendances/{id}
```

**Campos Atualizáveis**: status, notes

---

#### 4. Deletar Presença
```
DELETE /api/v1/attendances/{id}
```

**Permissão**: Apenas Administrador

---

#### 5. Listar Presenças de Uma Matrícula
```
GET /api/v1/attendances/enrollment/{enrollment_id}
```

**Retorna**: Todas as presenças registradas para um aluno em uma turma

---

## Exemplos de Uso

### Python (requests)

```python
import requests
import json

# URL base da API
BASE_URL = "http://localhost:5000/api/v1"
session = requests.Session()

# 1. Fazer login
login_response = session.post(
    "http://localhost:5000/login",
    data={
        "username": "admin",
        "password": "senha123"
    }
)
print("Login:", login_response.status_code)

# 2. Listar alunos
response = session.get(f"{BASE_URL}/students?page=1&per_page=20")
print("Alunos:", response.json())

# 3. Criar novo aluno
new_student = {
    "registration_number": "MAT003",
    "first_name": "Pedro",
    "last_name": "Costa",
    "email": "pedro@example.com",
    "branch_id": 1
}
response = session.post(
    f"{BASE_URL}/students",
    json=new_student,
    headers={"Content-Type": "application/json"}
)
print("Novo aluno criado:", response.json())

# 4. Atualizar aluno
update_data = {
    "email": "pedro.costa@example.com"
}
response = session.put(
    f"{BASE_URL}/students/3",
    json=update_data,
    headers={"Content-Type": "application/json"}
)
print("Aluno atualizado:", response.json())

# 5. Registrar presença
attendance = {
    "enrollment_id": 1,
    "class_subject_id": 1,
    "attendance_date": "2026-02-28",
    "status": "presente"
}
response = session.post(
    f"{BASE_URL}/attendances",
    json=attendance,
    headers={"Content-Type": "application/json"}
)
print("Presença registrada:", response.json())
```

### cURL

```bash
# 1. Login
curl -c cookies.txt -d "username=admin&password=senha123" \
  http://localhost:5000/login

# 2. Listar alunos
curl -b cookies.txt \
  "http://localhost:5000/api/v1/students?page=1"

# 3. Criar aluno
curl -b cookies.txt -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "registration_number": "MAT003",
    "first_name": "Pedro",
    "last_name": "Costa",
    "email": "pedro@example.com",
    "branch_id": 1
  }' \
  http://localhost:5000/api/v1/students

# 4. Atualizar aluno
curl -b cookies.txt -X PUT \
  -H "Content-Type: application/json" \
  -d '{"email": "pedro.costa@example.com"}' \
  http://localhost:5000/api/v1/students/3

# 5. Registrar presença
curl -b cookies.txt -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "enrollment_id": 1,
    "class_subject_id": 1,
    "attendance_date": "2026-02-28",
    "status": "presente"
  }' \
  http://localhost:5000/api/v1/attendances
```

### JavaScript (Fetch)

```javascript
const BASE_URL = "http://localhost:5000/api/v1";

// 1. Login
async function login() {
  const formData = new FormData();
  formData.append('username', 'admin');
  formData.append('password', 'senha123');
  
  const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    credentials: 'include',
    body: formData
  });
  return response.ok;
}

// 2. Listar alunos
async function listStudents(page = 1) {
  const response = await fetch(
    `${BASE_URL}/students?page=${page}&per_page=20`,
    { credentials: 'include' }
  );
  return response.json();
}

// 3. Criar aluno
async function createStudent(studentData) {
  const response = await fetch(`${BASE_URL}/students`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentData)
  });
  return response.json();
}

// 4. Atualizar aluno
async function updateStudent(studentId, updates) {
  const response = await fetch(`${BASE_URL}/students/${studentId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  return response.json();
}

// Uso
(async () => {
  await login();
  const students = await listStudents();
  console.log(students);
})();
```

---

## Tratamento de Erros

### Códigos de Status HTTP

| Código | Significado | Exemplo |
|--------|-------------|---------|
| 200 | OK - Sucesso | GET, PUT |
| 201 | Created - Recurso criado | POST bem-sucedido |
| 400 | Bad Request - Dados inválidos | Campo faltando |
| 401 | Unauthorized - Não autenticado | Sem login |
| 403 | Forbidden - Sem permissão | Papel insuficiente |
| 404 | Not Found - Recurso não existe | ID inválido |
| 500 | Internal Server Error | Erro do servidor |

### Estrutura de Erro

```json
{
  "success": false,
  "message": "Descrição do erro",
  "errors": {
    "field_name": ["Detalhes específico do erro"]
  }
}
```

### Exemplos de Tratamento

```python
# Python
response = session.post(f"{BASE_URL}/students", json=student_data)

if response.status_code == 201:
    print("Sucesso:", response.json())
elif response.status_code == 400:
    print("Dados inválidos:", response.json()['message'])
elif response.status_code == 401:
    print("Autenticação necessária")
elif response.status_code == 403:
    print("Sem permissão")
elif response.status_code == 404:
    print("Recurso não encontrado")
else:
    print("Erro:", response.status_code, response.json())
```

---

## Paginação

Todos os endpoints que retornam listas suportam paginação.

### Parâmetros

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| page | integer | 1 | Número da página |
| per_page | integer | 20 | Itens por página |

### Estrutura da Resposta

```json
{
  "success": true,
  "data": {
    "items": [...],
    "total": 150,
    "pages": 8,
    "current_page": 1,
    "per_page": 20,
    "has_next": true,
    "has_prev": false
  }
}
```

### Exemplo

```bash
# Primeira página
curl -b cookies.txt "http://localhost:5000/api/v1/students?page=1&per_page=10"

# Segunda página
curl -b cookies.txt "http://localhost:5000/api/v1/students?page=2&per_page=10"

# 50 itens por página
curl -b cookies.txt "http://localhost:5000/api/v1/students?page=1&per_page=50"
```

---

## Segurança

### Boas Práticas

1. **Sempre use HTTPS** em produção
2. **Nunca exponha credenciais** no código
3. **Valide dados do cliente** antes de enviar para API
4. **Use variáveis de ambiente** para configurações sensíveis
5. **Implemente rate limiting** para produção
6. **Registre todas as operações** (audit logs)
7. **Revogue tokens/sessões** após logout

### CORS

Adicione em `app/__init__.py` se necessário:

```python
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    # ... outras configurações
    
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:3000"],
            "methods": ["GET", "POST", "PUT", "DELETE"],
            "allow_headers": ["Content-Type"]
        }
    })
```

---

## Integração com Terceiros

### Exemplo: Sincronizar com Sistema Externo

```python
import requests
import json
from datetime import datetime

class SchoolAPIClient:
    def __init__(self, base_url, username, password):
        self.base_url = base_url
        self.session = requests.Session()
        self.login(username, password)
    
    def login(self, username, password):
        """Fazer login no sistema"""
        response = self.session.post(
            f"{self.base_url}/login",
            data={"username": username, "password": password}
        )
        if response.status_code != 200:
            raise Exception("Falha ao fazer login")
    
    def get_students(self, branch_id, page=1):
        """Obter lista de alunos"""
        response = self.session.get(
            f"{self.base_url}/api/v1/students",
            params={"page": page}
        )
        return response.json()
    
    def create_student(self, student_data):
        """Criar novo aluno"""
        response = self.session.post(
            f"{self.base_url}/api/v1/students",
            json=student_data
        )
        return response.json()
    
    def sync_students(self, external_students):
        """Sincronizar alunos de sistema externo"""
        for ext_student in external_students:
            student_data = {
                "registration_number": ext_student["id"],
                "first_name": ext_student["first_name"],
                "last_name": ext_student["last_name"],
                "email": ext_student["email"],
                "branch_id": 1
            }
            try:
                result = self.create_student(student_data)
                print(f"✓ Aluno {ext_student['id']} sincronizado")
            except Exception as e:
                print(f"✗ Erro ao sincronizar {ext_student['id']}: {e}")

# Uso
client = SchoolAPIClient(
    "http://localhost:5000",
    "admin",
    "senha123"
)

# Sincronizar dados de sistema externo
external_data = [
    {"id": "EXT001", "first_name": "Ana", "last_name": "Silva", "email": "ana@ext.com"},
    {"id": "EXT002", "first_name": "Bruno", "last_name": "Santos", "email": "bruno@ext.com"},
]

client.sync_students(external_data)
```

---

## Suporte

Para dúvidas ou problemas com a API:

1. **Consultar Swagger UI**: `http://localhost:5000/api/docs`
2. **Verificar logs**: Arquivo `app.log`
3. **Testar endpoints**: Use ferramentas como Postman ou Insomnia
4. **Contactar suporte**: suporte@example.com

---

**Última atualização**: 28 de Fevereiro de 2026
**Versão da API**: 1.0.0
