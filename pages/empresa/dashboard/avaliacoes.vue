<template>
  <div>
    <NuxtLayout name="dashboard">
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Avaliações e Feedback</h1>
        <div class="flex space-x-2">
          <button class="btn btn-outline flex items-center">
            <Icon name="heroicons:arrow-down-tray" class="w-5 h-5 mr-1" />
            Exportar Relatório
          </button>
        </div>
      </div>
      
      <!-- Rating Summary -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <!-- Overall Rating -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="font-bold mb-4">Avaliação Geral</h3>
          
          <div class="flex items-center mb-6">
            <div class="text-5xl font-bold text-primary mr-4">4.8</div>
            <div>
              <div class="flex text-yellow-400 mb-1">
                <Icon v-for="i in 5" :key="i" name="heroicons:star" class="w-6 h-6" :class="i <= 5 ? 'text-yellow-400' : 'text-gray-300'" />
              </div>
              <div class="text-gray-500">Baseado em 156 avaliações</div>
            </div>
          </div>
          
          <div class="space-y-2">
            <div v-for="i in 5" :key="i" class="flex items-center">
              <div class="w-8 text-right mr-2">{{ 6-i }}</div>
              <div class="flex text-yellow-400">
                <Icon v-for="j in 5" :key="j" name="heroicons:star" class="w-4 h-4" :class="j <= (6-i) ? 'text-yellow-400' : 'text-gray-300'" />
              </div>
              <div class="flex-grow mx-2">
                <div class="h-2 bg-gray-200 rounded-full">
                  <div class="h-2 bg-primary rounded-full" :style="`width: ${getRatingPercentage(6-i)}%`"></div>
                </div>
              </div>
              <div class="w-8 text-left">{{ getRatingCount(6-i) }}</div>
            </div>
          </div>
        </div>
        
        <!-- Rating by Category -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="font-bold mb-4">Avaliação por Categoria</h3>
          
          <div class="space-y-4">
            <div v-for="category in ratingCategories" :key="category.name">
              <div class="flex justify-between mb-1">
                <span>{{ category.name }}</span>
                <span class="font-medium">{{ category.rating }}/5</span>
              </div>
              <div class="h-2 bg-gray-200 rounded-full">
                <div class="h-2 bg-primary rounded-full" :style="`width: ${(category.rating / 5) * 100}%`"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Rating by Excursion -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="font-bold mb-4">Melhores Excursões</h3>
          
          <div class="space-y-4">
            <div v-for="excursion in topExcursions" :key="excursion.id" class="flex items-center">
              <div class="h-10 w-10 flex-shrink-0 rounded overflow-hidden bg-gray-100 mr-3">
                <img :src="excursion.image" :alt="excursion.title" class="h-10 w-10 object-cover" />
              </div>
              <div class="flex-grow">
                <div class="font-medium text-sm">{{ excursion.title }}</div>
                <div class="flex text-yellow-400">
                  <Icon v-for="i in 5" :key="i" name="heroicons:star" class="w-4 h-4" :class="i <= excursion.rating ? 'text-yellow-400' : 'text-gray-300'" />
                  <span class="text-gray-500 text-xs ml-1">({{ excursion.reviewCount }})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Filters and Search -->
      <div class="bg-white rounded-lg shadow-md p-4 mb-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div class="flex items-center space-x-4">
            <div>
              <select v-model="ratingFilter" class="form-input py-2">
                <option value="all">Todas as avaliações</option>
                <option value="5">5 estrelas</option>
                <option value="4">4 estrelas</option>
                <option value="3">3 estrelas</option>
                <option value="2">2 estrelas</option>
                <option value="1">1 estrela</option>
              </select>
            </div>
            <div>
              <select v-model="excursionFilter" class="form-input py-2">
                <option value="all">Todas as excursões</option>
                <option v-for="excursion in topExcursions" :key="excursion.id" :value="excursion.id">
                  {{ excursion.title }}
                </option>
              </select>
            </div>
          </div>
          
          <div class="relative">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Buscar avaliações..." 
              class="form-input pl-10 pr-4 py-2 w-full md:w-64"
            />
            <Icon 
              name="heroicons:magnifying-glass" 
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
            />
          </div>
        </div>
      </div>
      
      <!-- Reviews List -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="font-bold">Avaliações Recentes</h3>
        </div>
        
        <div class="divide-y divide-gray-200">
          <div v-for="(review, index) in filteredReviews" :key="index" class="p-6">
            <div class="flex justify-between mb-2">
              <div class="flex items-center">
                <img :src="review.avatar" :alt="review.name" class="w-10 h-10 rounded-full mr-3" />
                <div>
                  <div class="font-medium">{{ review.name }}</div>
                  <div class="text-sm text-gray-500">{{ review.date }}</div>
                </div>
              </div>
              <div>
                <div class="flex text-yellow-400 justify-end">
                  <Icon v-for="i in 5" :key="i" name="heroicons:star" class="w-5 h-5" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'" />
                </div>
                <div class="text-sm text-gray-500 text-right">{{ review.excursion }}</div>
              </div>
            </div>
            
            <p class="text-gray-700 mb-4">{{ review.text }}</p>
            
            <div v-if="review.response" class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center mb-2">
                <div class="bg-primary-50 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <Icon name="heroicons:building-office-2" class="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div class="font-medium">Resposta da Empresa</div>
                  <div class="text-xs text-gray-500">{{ review.responseDate }}</div>
                </div>
              </div>
              <p class="text-gray-700">{{ review.response }}</p>
            </div>
            
            <div v-else class="flex justify-end">
              <button class="text-primary hover:text-primary-600 text-sm font-medium" @click="showReplyForm(index)">
                Responder
              </button>
            </div>
            
            <!-- Reply Form -->
            <div v-if="activeReplyIndex === index" class="mt-4">
              <textarea 
                v-model="replyText" 
                class="form-input w-full" 
                rows="3" 
                placeholder="Escreva sua resposta..."
              ></textarea>
              <div class="flex justify-end mt-2 space-x-2">
                <button class="btn btn-outline" @click="cancelReply">
                  Cancelar
                </button>
                <button class="btn btn-primary" @click="submitReply(index)">
                  Enviar Resposta
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex-1 flex justify-between sm:hidden">
              <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Anterior
              </button>
              <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Próxima
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Mostrando <span class="font-medium">1</span> a <span class="font-medium">5</span> de <span class="font-medium">{{ reviews.length }}</span> resultados
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span class="sr-only">Anterior</span>
                    <Icon name="heroicons:chevron-left" class="h-5 w-5" />
                  </button>
                  <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </button>
                  <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary text-sm font-medium text-white">
                    2
                  </button>
                  <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span class="sr-only">Próxima</span>
                    <Icon name="heroicons:chevron-right" class="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// State
const ratingFilter = ref('all');
const excursionFilter = ref('all');
const searchQuery = ref('');
const activeReplyIndex = ref(null);
const replyText = ref('');

// Rating categories
const ratingCategories = [
  { name: 'Atendimento', rating: 4.9 },
  { name: 'Pontualidade', rating: 4.7 },
  { name: 'Conforto', rating: 4.6 },
  { name: 'Custo-benefício', rating: 4.5 },
  { name: 'Organização', rating: 4.8 }
];

// Top excursions
const topExcursions = [
  { 
    id: '1', 
    title: 'Fim de Semana em Ilhabela', 
    rating: 4.9, 
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1589449941811-aa0c96f2e4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: '3', 
    title: 'Thermas dos Laranjais', 
    rating: 4.8, 
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1582553081653-f515f2a9f2ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: '5', 
    title: 'Feriado em Paraty', 
    rating: 4.7, 
    reviewCount: 29,
    image: 'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: '4', 
    title: 'Campos do Jordão', 
    rating: 4.6, 
    reviewCount: 32,
    image: 'https://images.unsplash.com/photo-1595880500386-4b33c7ccf0f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  }
];

// Reviews
const reviews = ref([
  {
    name: 'Ana Silva',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    date: '15/04/2025',
    rating: 5,
    excursion: 'Fim de Semana em Ilhabela',
    excursionId: '1',
    text: 'Excursão incrível! Tudo muito bem organizado, desde o transporte até a hospedagem. O guia era muito atencioso e conhecedor. Recomendo muito!',
    response: 'Olá Ana, muito obrigado pela sua avaliação! Ficamos muito felizes em saber que você gostou da nossa excursão para Ilhabela. Esperamos vê-la em nossas próximas viagens!',
    responseDate: '16/04/2025'
  },
  {
    name: 'Carlos Oliveira',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: '12/04/2025',
    rating: 4,
    excursion: 'Thermas dos Laranjais',
    excursionId: '3',
    text: 'Ótima experiência! A hospedagem era confortável e as atividades muito bem planejadas. Só achei que o tempo livre poderia ser um pouco maior.',
    response: null,
    responseDate: null
  },
  {
    name: 'Mariana Costa',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: '10/04/2025',
    rating: 5,
    excursion: 'Feriado em Paraty',
    excursionId: '5',
    text: 'Levei minha família e todos adoraram! As crianças se divertiram muito e o hotel era excelente. Certamente faremos mais excursões com esta empresa.',
    response: 'Olá Mariana, agradecemos pelo feedback positivo! É sempre um prazer proporcionar momentos especiais para famílias como a sua. Estamos ansiosos para recebê-los em nossas próximas excursões!',
    responseDate: '11/04/2025'
  },
  {
    name: 'Pedro Santos',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    date: '05/04/2025',
    rating: 3,
    excursion: 'Campos do Jordão',
    excursionId: '4',
    text: 'A viagem foi boa, mas tivemos alguns problemas com o ar condicionado do ônibus. A hospedagem e os passeios foram bons, mas a experiência poderia ter sido melhor.',
    response: null,
    responseDate: null
  },
  {
    name: 'Juliana Mendes',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    date: '01/04/2025',
    rating: 5,
    excursion: 'Fim de Semana em Ilhabela',
    excursionId: '1',
    text: 'Simplesmente perfeito! A excursão superou todas as minhas expectativas. O local de hospedagem era incrível, com vista para o mar. Os passeios foram muito bem organizados e o guia era excelente.',
    response: null,
    responseDate: null
  }
]);

// Computed
const filteredReviews = computed(() => {
  let result = [...reviews.value];
  
  // Apply rating filter
  if (ratingFilter.value !== 'all') {
    const rating = parseInt(ratingFilter.value);
    result = result.filter(review => review.rating === rating);
  }
  
  // Apply excursion filter
  if (excursionFilter.value !== 'all') {
    result = result.filter(review => review.excursionId === excursionFilter.value);
  }
  
  // Apply search query
  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(review => 
      review.name.toLowerCase().includes(query) ||
      review.text.toLowerCase().includes(query) ||
      review.excursion.toLowerCase().includes(query)
    );
  }
  
  return result;
});

// Methods
const getRatingPercentage = (stars) => {
  // Mock data for rating distribution
  const percentages = {
    5: 70,
    4: 20,
    3: 7,
    2: 2,
    1: 1
  };
  
  return percentages[stars] || 0;
};

const getRatingCount = (stars) => {
  const total = 156; // Total number of reviews
  const percentage = getRatingPercentage(stars);
  return Math.round(total * percentage / 100);
};

const showReplyForm = (index) => {
  activeReplyIndex.value = index;
  replyText.value = '';
};

const cancelReply = () => {
  activeReplyIndex.value = null;
  replyText.value = '';
};

const submitReply = (index) => {
  if (replyText.value.trim() === '') return;
  
  // Update the review with the response
  reviews.value[index].response = replyText.value;
  reviews.value[index].responseDate = new Date().toLocaleDateString('pt-BR');
  
  // Reset form
  cancelReply();
};
</script>
