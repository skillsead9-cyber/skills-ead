/**
 * Serviços mockados para simulação de API
 * Todas as funções retornam Promises simulando chamadas assíncronas
 */

// Simula delay de rede
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Mock de autenticação
 */
export const mockAuth = {
  async login(credentials) {
    await delay(1000)
    
    // Simula validação
    if (credentials.email === 'admin@skills.com' && credentials.password === 'admin123') {
      return {
        data: {
          token: 'mock_token_' + Date.now(),
          user: {
            id: 1,
            name: 'Aluno Demo',
            email: credentials.email,
            role: 'student'
          }
        }
      }
    }
    
    throw new Error('Credenciais inválidas')
  },

  async logout() {
    await delay(300)
    return { data: { message: 'Logout realizado com sucesso' } }
  },

  async getCurrentUser() {
    await delay(500)
    return {
      data: {
        id: 1,
        name: 'Aluno Demo',
        email: 'admin@skills.com',
        role: 'student'
      }
    }
  }
}

/**
 * Mock de cursos
 */
export const mockCursos = {
  async getAll() {
    await delay(800)
    return {
      data: [
        {
          id: 1,
          titulo: 'Introdução ao Desenvolvimento Web',
          descricao: 'Curso completo sobre HTML, CSS e JavaScript',
          progresso: 65,
          imagem: 'https://via.placeholder.com/300x200?text=Curso+1',
          modulos: 8,
          horas: 40
        },
        {
          id: 2,
          titulo: 'Vue.js Avançado',
          descricao: 'Aprofundamento em Composition API e Pinia',
          progresso: 30,
          imagem: 'https://via.placeholder.com/300x200?text=Curso+2',
          modulos: 6,
          horas: 30
        },
        {
          id: 3,
          titulo: 'Design System com Vuetify',
          descricao: 'Criação de interfaces modernas com Material Design',
          progresso: 80,
          imagem: 'https://via.placeholder.com/300x200?text=Curso+3',
          modulos: 5,
          horas: 25
        }
      ]
    }
  },

  async getById(id) {
    await delay(500)
    return {
      data: {
        id: parseInt(id),
        titulo: 'Curso Detalhado',
        descricao: 'Descrição completa do curso',
        progresso: 50,
        imagem: 'https://via.placeholder.com/800x400?text=Curso+Detalhado',
        modulos: [
          { id: 1, titulo: 'Módulo 1', concluido: true },
          { id: 2, titulo: 'Módulo 2', concluido: true },
          { id: 3, titulo: 'Módulo 3', concluido: false }
        ]
      }
    }
  }
}

/**
 * Mock de upload de arquivos
 */
export const mockUpload = {
  async uploadFile(file) {
    await delay(2000)
    
    // Simula progresso (seria feito via eventos em implementação real)
    return {
      data: {
        id: Date.now(),
        filename: file.name,
        size: file.size,
        url: `https://mock-storage.skills.com/files/${file.name}`,
        uploadedAt: new Date().toISOString()
      }
    }
  },

  async uploadMultiple(files) {
    await delay(3000)
    return {
      data: files.map((file, index) => ({
        id: Date.now() + index,
        filename: file.name,
        size: file.size,
        url: `https://mock-storage.skills.com/files/${file.name}`,
        uploadedAt: new Date().toISOString()
      }))
    }
  }
}

/**
 * Mock de atividades
 */
export const mockAtividades = {
  async getAll() {
    await delay(600)
    return {
      data: [
        {
          id: 1,
          titulo: 'Entrega de Projeto Final',
          descricao: 'Desenvolver uma aplicação completa',
          dataEntrega: '2024-03-15',
          status: 'pendente'
        },
        {
          id: 2,
          titulo: 'Quiz de Revisão',
          descricao: 'Teste seus conhecimentos',
          dataEntrega: '2024-03-18',
          status: 'pendente'
        }
      ]
    }
  }
}

/**
 * Mock de mensagens/notificações
 */
export const mockMensagens = {
  async getAll() {
    await delay(400)
    return {
      data: [
        {
          id: 1,
          titulo: 'Bem-vindo ao SKILLS!',
          conteudo: 'Sua conta foi criada com sucesso.',
          lida: false,
          data: new Date().toISOString()
        }
      ]
    }
  }
}
