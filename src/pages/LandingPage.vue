<template>
  <div class="landing-page">
    <!-- Header Fixo -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <!-- Logo fora da navbar para usar altura maxima do header -->
      <div  class="absolute left-0 px-3 py-3 top-0 bottom-0 z-10 ml-3  flex items-center">
        <img 
          src="/logo-skills.png" 
          alt="Grupo Transformar - SKILLS Educacional" 
          class="h-full w-auto object-contain"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
        />
        <div class="hidden font-bold text-xl text-primary">
          Grupo Transformar
        </div>
      </div>

      <nav class="container mx-auto px-4 py-4 pl-24 md:pl-40 flex items-center justify-between">

        <!-- Menu de Navegação (Desktop) -->
        <ul class="hidden md:flex items-center space-x-6">
          <li>
            <a href="#sobre" class="text-gray-700 hover:text-primary transition-colors font-medium">
              Sobre
            </a>
          </li>
          <li>
            <a href="#como-funciona" class="text-gray-700 hover:text-primary transition-colors font-medium">
              Como Funciona
            </a>
          </li>
          <li>
            <a href="#depoimentos" class="text-gray-700 hover:text-primary transition-colors font-medium">
              Depoimentos
            </a>
          </li>
          <li>
            <a href="#contato" class="text-gray-700 hover:text-primary transition-colors font-medium">
              Contato
            </a>
          </li>
        </ul>

        <!-- Botões de Ação -->
        <div class="flex items-center space-x-4">
          <router-link
            to="/login"
            class="text-gray-700 hover:text-primary font-medium transition-colors px-4 py-2"
          >
            Login
          </router-link>
          <button 
            @click="scrollToForm"
            class="bg-secondary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary-dark transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Fazer Matrícula
          </button>
        </div>

        <!-- Menu Mobile Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden text-gray-700 focus:outline-none"
          aria-label="Menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      <!-- Menu Mobile -->
      <div 
        v-if="mobileMenuOpen"
        class="md:hidden bg-white border-t shadow-lg"
      >
        <ul class="container mx-auto px-4 py-4 space-y-3">
          <li>
            <a href="#sobre" @click="mobileMenuOpen = false" class="block text-gray-700 hover:text-primary font-medium">
              Sobre
            </a>
          </li>
          <li>
            <a href="#como-funciona" @click="mobileMenuOpen = false" class="block text-gray-700 hover:text-primary font-medium">
              Como Funciona
            </a>
          </li>
          <li>
            <a href="#depoimentos" @click="mobileMenuOpen = false" class="block text-gray-700 hover:text-primary font-medium">
              Depoimentos
            </a>
          </li>
          <li>
            <a href="#contato" @click="mobileMenuOpen = false" class="block text-gray-700 hover:text-primary font-medium">
              Contato
            </a>
          </li>
          <li class="pt-4 border-t">
            <router-link
              to="/login"
              @click="mobileMenuOpen = false"
              class="block text-center bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              Login
            </router-link>
          </li>
        </ul>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary via-primary-dark to-primary">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <!-- Conteúdo Textual -->
          <div class="text-white">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Conclua seu Ensino Médio de Forma
              <span class="text-accent"> Rápida e Segura</span>
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-gray-200">
              <strong>Grupo Transformar</strong><br>
              Educação que transforma vidas através da plataforma <strong>SKILLS Educacional</strong>.
            </p>
            <div class="flex flex-wrap gap-4 mb-8">
              <div class="flex items-center space-x-2">
                <svg class="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium">100% Online</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium">Certificado Válido</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium">Suporte Personalizado</span>
              </div>
            </div>
          </div>

          <!-- Formulário de Captação -->
          <div class="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-2 text-center">
              Quero Garantir Minha Vaga
            </h2>
            <p class="text-gray-600 text-center mb-6">
              Preencha seus dados e nossa equipe entrará em contato!
            </p>
            
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <label for="nome" class="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo
                </label>
                <input
                  id="nome"
                  v-model="form.nome"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label for="whatsapp" class="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp
                </label>
                <input
                  id="whatsapp"
                  v-model="form.whatsapp"
                  type="tel"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition"
                  placeholder="seu@email.com"
                />
              </div>

              <button
                type="submit"
                :disabled="submitting"
                class="w-full bg-secondary text-white py-4 rounded-lg font-bold text-lg hover:bg-secondary-dark transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!submitting">Garantir Minha Vaga Agora</span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              </button>

              <p class="text-xs text-gray-500 text-center">
                Ao enviar, você concorda com nossa
                <a href="#politica" class="text-secondary hover:underline">Política de Privacidade</a>
              </p>
            </form>

            <!-- Mensagem de Sucesso -->
            <div 
              v-if="showSuccess"
              class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <p class="text-green-800 font-medium text-center">
                ✓ Cadastro realizado com sucesso! Entraremos em contato em breve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção: Por que escolher a SKILLS? -->
    <section id="sobre" class="py-16 md:py-24 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Por que escolher o <span class="text-primary">Grupo Transformar</span>?
        </h2>
        <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Somos uma instituição comprometida com a transformação de vidas através da educação de qualidade, utilizando a plataforma SKILLS Educacional.
        </p>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Card 1: 100% Online -->
          <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow transform hover:-translate-y-1">
            <div class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">100% Online</h3>
            <p class="text-gray-600">
              Ambiente Virtual de Aprendizagem moderno e intuitivo. Estude quando e onde quiser.
            </p>
          </div>

          <!-- Card 2: Certificado Válido -->
          <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow transform hover:-translate-y-1">
            <div class="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Certificado Válido</h3>
            <p class="text-gray-600">
              Autorizado pela Lei nº 14.063/2020. Seu certificado tem validade nacional e é reconhecido pelo MEC.
            </p>
          </div>

          <!-- Card 3: Suporte Personalizado -->
          <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow transform hover:-translate-y-1">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Suporte Personalizado</h3>
            <p class="text-gray-600">
              Equipe dedicada para acompanhar seu progresso e tirar todas as suas dúvidas.
            </p>
          </div>

          <!-- Card 4: Conclusão Acelerada -->
          <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow transform hover:-translate-y-1">
            <div class="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Conclusão Acelerada</h3>
            <p class="text-gray-600">
              Flexibilidade para concluir seus estudos no seu próprio ritmo, de forma eficiente.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção: O que é o EJA Ensino Médio? -->
    <section id="como-funciona" class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          O que é o <span class="text-primary">EJA Ensino Médio</span>?
        </h2>
        <p class="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          O EJA (Educação de Jovens e Adultos) é uma modalidade de ensino que permite a conclusão do Ensino Médio para pessoas que não tiveram a oportunidade de estudar na idade adequada ou precisam retomar os estudos.
        </p>

        <!-- Linha do Tempo -->
        <div class="max-w-4xl mx-auto">
          <div class="grid md:grid-cols-4 gap-6">
            <!-- Etapa 1 -->
            <div class="text-center">
              <div class="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span class="text-3xl font-bold text-white">1</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Matrícula</h3>
              <p class="text-gray-600">
                Faça sua matrícula de forma rápida e descomplicada, totalmente online.
              </p>
            </div>

            <!-- Etapa 2 -->
            <div class="text-center">
              <div class="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span class="text-3xl font-bold text-white">2</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Estudo na Plataforma</h3>
              <p class="text-gray-600">
                Acesse conteúdos, videoaulas e materiais didáticos na nossa plataforma moderna.
              </p>
            </div>

            <!-- Etapa 3 -->
            <div class="text-center">
              <div class="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span class="text-3xl font-bold text-white">3</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Avaliação</h3>
              <p class="text-gray-600">
                Realize avaliações online com acompanhamento e suporte da nossa equipe.
              </p>
            </div>

            <!-- Etapa 4 -->
            <div class="text-center">
              <div class="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span class="text-3xl font-bold text-white">4</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Certificado</h3>
              <p class="text-gray-600">
                Receba seu certificado válido e reconhecido nacionalmente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção: Depoimentos -->
    <section id="depoimentos" class="py-16 md:py-24 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          O que nossos alunos dizem
        </h2>
        <p class="text-center text-gray-600 mb-12">
          Histórias reais de transformação através da educação
        </p>

        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <!-- Depoimento 1 -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <div class="ml-4">
                <h4 class="font-bold text-gray-800">Maria Silva</h4>
                <p class="text-sm text-gray-600">São Paulo, SP</p>
              </div>
            </div>
            <div class="flex mb-2">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-gray-700 italic">
              "Consegui concluir meus estudos e realizar meu sonho de entrar na faculdade. A plataforma é muito fácil de usar e o suporte é excelente!"
            </p>
          </div>

          <!-- Depoimento 2 -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                J
              </div>
              <div class="ml-4">
                <h4 class="font-bold text-gray-800">João Santos</h4>
                <p class="text-sm text-gray-600">Rio de Janeiro, RJ</p>
              </div>
            </div>
            <div class="flex mb-2">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-gray-700 italic">
              "Estudar online foi a melhor escolha que fiz. Consegui conciliar trabalho e estudos, e agora tenho meu certificado em mãos!"
            </p>
          </div>

          <!-- Depoimento 3 -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div class="ml-4">
                <h4 class="font-bold text-gray-800">Ana Costa</h4>
                <p class="text-sm text-gray-600">Belo Horizonte, MG</p>
              </div>
            </div>
            <div class="flex mb-2">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-gray-700 italic">
              "A SKILLS transformou minha vida. Hoje tenho mais oportunidades no mercado de trabalho graças ao meu certificado!"
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção: Confiança e Garantias -->
    <section class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Confiança e Credibilidade
          </h2>
          
          <div class="grid md:grid-cols-2 gap-8 items-center mb-12">
            <!-- Logo Grupo Transformar -->
            <div class="bg-gray-50 rounded-xl p-8">
              <h3 class="text-xl font-bold text-gray-800 mb-4">Grupo Transformar</h3>
              <p class="text-gray-600">
                Instituição sólida e comprometida com a educação de qualidade. Utilizamos a plataforma SKILLS Educacional para oferecer o melhor ensino.
              </p>
            </div>

            <!-- Certificado Autorizado -->
            <div class="bg-accent/10 rounded-xl p-8 border-2 border-accent">
              <div class="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">Certificado Autorizado</h3>
              <p class="text-gray-600">
                Autorizado pela Lei nº 14.063/2020. Seu certificado tem validade nacional e é reconhecido pelo MEC.
              </p>
            </div>
          </div>

          <!-- Badges de Confiança -->
          <div class="flex flex-wrap justify-center gap-4">
            <div class="bg-primary text-white px-6 py-3 rounded-lg font-semibold">
              ✓ Autorizado pelo MEC
            </div>
            <div class="bg-secondary text-white px-6 py-3 rounded-lg font-semibold">
              ✓ Certificado Válido
            </div>
            <div class="bg-accent text-white px-6 py-3 rounded-lg font-semibold">
              ✓ 100% Online
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer id="contato" class="bg-primary text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <!-- Sobre -->
          <div>
            <h3 class="text-xl font-bold mb-4">Grupo Transformar</h3>
            <p class="text-gray-300 mb-4">
              Educação que transforma vidas. Plataforma SKILLS Educacional.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-300 hover:text-accent transition-colors" aria-label="Facebook">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-300 hover:text-accent transition-colors" aria-label="Instagram">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Links Úteis -->
          <div>
            <h3 class="text-xl font-bold mb-4">Links Úteis</h3>
            <ul class="space-y-2">
              <li>
                <a href="#sobre" class="text-gray-300 hover:text-accent transition-colors">Sobre Nós</a>
              </li>
              <li>
                <a href="#como-funciona" class="text-gray-300 hover:text-accent transition-colors">Como Funciona</a>
              </li>
              <li>
                <a href="#depoimentos" class="text-gray-300 hover:text-accent transition-colors">Depoimentos</a>
              </li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h3 class="text-xl font-bold mb-4">Legal</h3>
            <ul class="space-y-2">
              <li>
                <a href="#politica" class="text-gray-300 hover:text-accent transition-colors">Política de Privacidade</a>
              </li>
              <li>
                <a href="#termos" class="text-gray-300 hover:text-accent transition-colors">Termos de Uso</a>
              </li>
            </ul>
          </div>

          <!-- Contato -->
          <div>
            <h3 class="text-xl font-bold mb-4">Contato</h3>
            <ul class="space-y-2 text-gray-300">
              <li class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>contato@skills.educacional</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>(00) 0000-0000</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
                <span>WhatsApp</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-700 pt-8 text-center text-gray-300">
          <p>&copy; 2026 Grupo Transformar. Todos os direitos reservados.</p>
          <p class="mt-2">Plataforma SKILLS Educacional - Educação que transforma vidas.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estado do formulário
const form = ref({
  nome: '',
  whatsapp: '',
  email: ''
})

const submitting = ref(false)
const showSuccess = ref(false)
const mobileMenuOpen = ref(false)

// Função para enviar formulário
const handleSubmit = async () => {
  submitting.value = true
  
  try {
    // Simulação de envio (substituir por chamada real de API)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Dados do formulário:', form.value)
    
    // Aqui você faria a chamada real para a API
    // await api.post('/leads', form.value)
    
    showSuccess.value = true
    form.value = { nome: '', whatsapp: '', email: '' }
    
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
  } catch (error) {
    console.error('Erro ao enviar formulário:', error)
    alert('Erro ao enviar formulário. Tente novamente.')
  } finally {
    submitting.value = false
  }
}

// Função para scroll suave até o formulário
const scrollToForm = () => {
  const formElement = document.querySelector('form')
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    mobileMenuOpen.value = false
  }
}
</script>

<style>
/* Estilos customizados usando as cores da identidade visual */
.landing-page {
  font-family: 'Inter', 'Montserrat', 'Poppins', sans-serif;
}

/* Scroll suave */
html {
  scroll-behavior: smooth;
}

/* Animações */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.landing-page section {
  animation: fadeIn 0.6s ease-out;
}
</style>
