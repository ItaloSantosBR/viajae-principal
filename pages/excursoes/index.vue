<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="container-custom">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Excursões Disponíveis</h1>
        <p class="text-gray-600">
          Encontre a excursão perfeita para sua próxima aventura
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold">Filtros</h2>
              <button 
                @click="clearAllFilters" 
                class="text-primary hover:text-primary-600 text-sm font-medium"
              >
                Limpar Filtros
              </button>
            </div>
            
            <!-- Destination Filter -->
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-3">Destino</h3>
              <div class="relative">
                <input 
                  type="text" 
                  v-model="filters.destination" 
                  placeholder="Para onde você quer ir?" 
                  class="form-input pl-10 pr-4 py-2 w-full"
                  @input="applyFilters"
                />
                <Icon 
                  name="heroicons:map-pin" 
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                />
              </div>
            </div>
            
            <!-- Origin City Filter -->
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-3">Cidade de Origem</h3>
              <div class="relative">
                <input 
                  type="text" 
                  v-model="filters.originCity" 
                  placeholder="De onde você quer sair?" 
                  class="form-input pl-10 pr-4 py-2 w-full"
                  @input="applyFilters"
                />
                <Icon 
                  name="heroicons:truck" 
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                />
              </div>
            </div>
            
            <!-- Month Filter -->
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-3">Mês da Viagem</h3>
              <div class="grid grid-cols-3 gap-2">
                <button 
                  v-for="(month, index) in months" 
                  :key="index"
                  @click="toggleMonthFilter(index)"
                  class="px-2 py-1 text-sm rounded-md text-center"
                  :class="selectedMonth === index ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'"
                >
                  {{ month.substring(0, 3) }}
                </button>
              </div>
            </div>
            
            <!-- Duration Filter -->
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-3">Duração</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input 
                    type="checkbox" 
                    v-model="filters.duration.short" 
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    @change="applyFilters"
                  />
                  <span class="ml-2 text-gray-700">2-3 dias</span>
                </label>
                <label class="flex items-center">
                  <input 
                    type="checkbox" 
                    v-model="filters.duration.medium" 
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    @change="applyFilters"
                  />
                  <span class="ml-2 text-gray-700">4-5 dias</span>
                </label>
                <label class="flex items-center">
                  <input 
                    type="checkbox" 
                    v-model="filters.duration.long" 
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    @change="applyFilters"
                  />
                  <span class="ml-2 text-gray-700">6+ dias</span>
                </label>
              </div>
            </div>
            
            <!-- Price Range Filter -->
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-3">Faixa de Preço</h3>
              <div class="px-2">
                <div class="flex justify-between mb-2 text-sm text-gray-600">
                  <span>R$ {{ filters.price.min }}</span>
                  <span>R$ {{ filters.price.max }}</span>
                </div>
                <div class="relative mb-4">
                  <input 
                    type="range" 
                    v-model.number="filters.price.min" 
                    :min="priceRange.min" 
                    :max="priceRange.max" 
                    step="100"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    @change="applyFilters"
                  />
                  <input 
                    type="range" 
                    v-model.number="filters.price.max" 
                    :min="priceRange.min" 
                    :max="priceRange.max" 
                    step="100"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-4"
                    @change="applyFilters"
                  />
                </div>
              </div>
            </div>
            
            <!-- Category Filter -->
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-3">Categoria</h3>
              <div class="space-y-2">
                <label 
                  v-for="category in categories" 
                  :key="category.id" 
                  class="flex items-center"
                >
                  <input 
                    type="checkbox" 
                    v-model="filters.categories" 
                    :value="category.id" 
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    @change="applyFilters"
                  />
                  <span class="ml-2 text-gray-700">{{ category.name }}</span>
                </label>
              </div>
            </div>
            
            <!-- Agency Filter -->
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-3">Agência</h3>
              <div class="space-y-2">
                <label 
                  v-for="company in companies" 
                  :key="company.id" 
                  class="flex items-center"
                >
                  <input 
                    type="checkbox" 
                    v-model="filters.companies" 
                    :value="company.id" 
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    @change="applyFilters"
                  />
                  <span class="ml-2 text-gray-700">{{ company.name }}</span>
                </label>
              </div>
            </div>
            
            <!-- Rating Filter -->
            <div class="mb-6">
              <h3 class="text-lg font-medium mb-3">Avaliação</h3>
              <div class="space-y-2">
                <label 
                  v-for="rating in [5, 4, 3, 2, 1]" 
                  :key="rating" 
                  class="flex items-center"
                >
                  <input 
                    type="checkbox" 
                    v-model="filters.ratings" 
                    :value="rating" 
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    @change="applyFilters"
                  />
                  <span class="ml-2 flex items-center text-gray-700">
                    <span class="flex">
                      <Icon 
                        v-for="i in 5" 
                        :key="i" 
                        name="heroicons:star" 
                        class="w-4 h-4" 
                        :class="i <= rating ? 'text-primary' : 'text-gray-300'" 
                      />
                    </span>
                    <span v-if="rating === 5" class="ml-1">ou mais</span>
                  </span>
                </label>
              </div>
            </div>
            
            <!-- Included Services Filter -->
            <div>
              <h3 class="text-lg font-medium mb-3">Serviços Inclusos</h3>
              <div class="space-y-2">
                <label 
                  v-for="service in additionalServices" 
                  :key="service.id" 
                  class="flex items-center"
                >
                  <input 
                    type="checkbox" 
                    v-model="filters.services" 
                    :value="service.id" 
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    @change="applyFilters"
                  />
                  <span class="ml-2 text-gray-700">{{ service.name }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Search Results -->
        <div class="lg:col-span-3">
          <!-- Search and Sort Controls -->
          <div class="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row justify-between items-center">
            <div class="mb-4 sm:mb-0 w-full sm:w-auto">
              <div class="relative">
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  placeholder="Buscar excursões..." 
                  class="form-input pl-10 pr-4 py-2"
                  @input="applyFilters"
                />
                <Icon 
                  name="heroicons:magnifying-glass" 
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                />
              </div>
            </div>
            
            <div class="flex items-center w-full sm:w-auto">
              <label class="text-gray-700 mr-2 whitespace-nowrap">Ordenar por:</label>
              <select 
                v-model="sortOption" 
                class="form-input py-2" 
                @change="applyFilters"
              >
                <option value="price_asc">Menor Preço</option>
                <option value="price_desc">Maior Preço</option>
                <option value="date_asc">Data (mais próxima)</option>
                <option value="date_desc">Data (mais distante)</option>
                <option value="rating_desc">Melhor Avaliação</option>
                <option value="duration_asc">Menor Duração</option>
                <option value="duration_desc">Maior Duração</option>
              </select>
            </div>
          </div>
          
          <!-- Results Count -->
          <div class="mb-6">
            <p class="text-gray-600">
              {{ filteredExcursions.length }} excursões encontradas
              <span v-if="hasActiveFilters">
                com os filtros selecionados
              </span>
            </p>
          </div>
          
          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
          
          <!-- No Results -->
          <div v-else-if="filteredExcursions.length === 0" class="bg-white rounded-lg shadow-md p-8 text-center">
            <Icon name="heroicons:face-frown" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 class="text-xl font-bold mb-2">Nenhuma excursão encontrada</h3>
            <p class="text-gray-600 mb-6">
              Não encontramos excursões que correspondam aos seus filtros. Tente ajustar os critérios de busca.
            </p>
            <button @click="clearAllFilters" class="btn btn-primary">
              Limpar Filtros
            </button>
          </div>
          
          <!-- Results List -->
          <div v-else class="space-y-6">
            <div 
              v-for="excursion in paginatedExcursions" 
              :key="excursion.id" 
              class="bg-white rounded-lg shadow-md overflow-hidden group"
            >
              <div class="md:flex">
                <!-- Excursion Image -->
                <div class="md:w-1/3 relative overflow-hidden h-48 md:h-auto">
                  <img 
                    :src="getExcursionImage(excursion)" 
                    :alt="excursion.title" 
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                  />
                  <div class="absolute top-0 right-0 bg-primary text-white px-3 py-1 m-2 rounded-full text-sm font-medium">
                    {{ getCategoryName(excursion.category) }}
                  </div>
                </div>
                
                <!-- Excursion Details -->
                <div class="p-6 md:w-2/3 flex flex-col">
                  <div class="flex-grow">
                    <div class="flex justify-between items-start mb-2">
                      <h3 class="text-xl font-bold">{{ excursion.title }}</h3>
                      <div class="flex items-center">
                        <div class="flex text-primary mr-1">
                          <Icon v-for="i in 5" :key="i" name="heroicons:star" class="w-4 h-4" :class="i <= 4 ? 'text-primary' : 'text-gray-300'" />
                        </div>
                        <span class="text-sm text-gray-600">(12)</span>
                      </div>
                    </div>
                    
                    <div class="flex items-center text-gray-600 mb-2">
                      <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
                      <span>{{ excursion.destination }}</span>
                    </div>
                    
                    <div class="flex items-center text-gray-600 mb-2">
                      <Icon name="heroicons:truck" class="w-4 h-4 mr-1" />
                      <span>Saindo de: {{ excursion.originCity }}</span>
                    </div>
                    
                    <div class="flex items-center text-gray-600 mb-2">
                      <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
                      <span>{{ formatDateRange(excursion.startDate, excursion.endDate) }}</span>
                      <span class="mx-2">•</span>
                      <span>{{ getDurationDays(excursion.startDate, excursion.endDate) }} dias</span>
                    </div>
                    
                    <div class="flex items-center text-gray-600 mb-4">
                      <Icon name="heroicons:building-office-2" class="w-4 h-4 mr-1" />
                      <span>{{ excursion.companyName }}</span>
                    </div>
                    
                    <div class="flex flex-wrap gap-2 mb-4">
                      <span v-for="service in excursion.includedServices" :key="service" class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {{ getServiceName(service) }}
                      </span>
                    </div>
                    
                    <p class="text-gray-600 line-clamp-2 mb-4">{{ excursion.description }}</p>
                  </div>
                  
                  <div class="flex items-center justify-between mt-4">
                    <div>
                      <span class="text-2xl font-bold text-gray-900">R$ {{ excursion.price }}</span>
                      <span class="text-gray-600 text-sm">por pessoa</span>
                    </div>
                    
                    <NuxtLink :to="`/excursoes/${excursion.id}`" class="btn btn-primary">
                      Ver Detalhes
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Pagination -->
          <div v-if="filteredExcursions.length > 0" class="mt-8 flex justify-center">
            <div class="flex space-x-1">
              <button 
                @click="prevPage" 
                :disabled="currentPage === 1" 
                class="px-4 py-2 rounded-md"
                :class="currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'"
              >
                <Icon name="heroicons:chevron-left" class="w-5 h-5" />
              </button>
              
              <button 
                v-for="page in totalPages" 
                :key="page" 
                @click="goToPage(page)" 
                class="px-4 py-2 rounded-md"
                :class="currentPage === page ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
              >
                {{ page }}
              </button>
              
              <button 
                @click="nextPage" 
                :disabled="currentPage === totalPages" 
                class="px-4 py-2 rounded-md"
                :class="currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'"
              >
                <Icon name="heroicons:chevron-right" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useExcursionsStore } from '~/stores/excursions';

const route = useRoute();
const router = useRouter();
const excursionsStore = useExcursionsStore();

// Pagination
const currentPage = ref(1);
const itemsPerPage = 5;

// Search and filters
const searchQuery = ref('');
const selectedMonth = ref(null);
const sortOption = ref('date_asc');

// Price range
const priceRange = {
  min: 500,
  max: 5000
};

// Filters
const filters = ref({
  destination: '',
  originCity: '',
  duration: {
    short: false,  // 2-3 days
    medium: false, // 4-5 days
    long: false    // 6+ days
  },
  price: {
    min: priceRange.min,
    max: priceRange.max
  },
  categories: [],
  companies: [],
  ratings: [],
  services: []
});

// Data
const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const categories = computed(() => excursionsStore.categories);
const additionalServices = computed(() => excursionsStore.additionalServices);

// Mock companies data (would come from an API in a real app)
const companies = [
  { id: '1', name: 'Aventuras Marítimas' },
  { id: '2', name: 'Trilhas & Montanhas' },
  { id: '3', name: 'Diversão Total' }
];

// Computed properties
const loading = computed(() => excursionsStore.loading);
const error = computed(() => excursionsStore.error);

const hasActiveFilters = computed(() => {
  return selectedMonth.value !== null ||
    filters.value.destination.trim() !== '' ||
    filters.value.originCity.trim() !== '' ||
    filters.value.duration.short ||
    filters.value.duration.medium ||
    filters.value.duration.long ||
    filters.value.price.min > priceRange.min ||
    filters.value.price.max < priceRange.max ||
    filters.value.categories.length > 0 ||
    filters.value.companies.length > 0 ||
    filters.value.ratings.length > 0 ||
    filters.value.services.length > 0 ||
    searchQuery.value.trim() !== '';
});

const filteredExcursions = computed(() => {
  let result = [...excursionsStore.excursions];
  
  // Apply search query
  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(excursion => 
      excursion.title.toLowerCase().includes(query) ||
      excursion.description.toLowerCase().includes(query) ||
      excursion.destination.toLowerCase().includes(query)
    );
  }
  
  // Apply destination filter
  if (filters.value.destination.trim() !== '') {
    const destination = filters.value.destination.toLowerCase();
    result = result.filter(excursion => 
      excursion.destination.toLowerCase().includes(destination)
    );
  }
  
  // Apply origin city filter
  if (filters.value.originCity.trim() !== '') {
    const originCity = filters.value.originCity.toLowerCase();
    result = result.filter(excursion => 
      excursion.originCity && excursion.originCity.toLowerCase().includes(originCity)
    );
  }
  
  // Apply month filter
  if (selectedMonth.value !== null) {
    result = result.filter(excursion => {
      const startDate = new Date(excursion.startDate);
      return startDate.getMonth() === selectedMonth.value;
    });
  }
  
  // Apply duration filter
  if (filters.value.duration.short || filters.value.duration.medium || filters.value.duration.long) {
    result = result.filter(excursion => {
      const days = getDurationDays(excursion.startDate, excursion.endDate);
      
      if (filters.value.duration.short && days >= 2 && days <= 3) return true;
      if (filters.value.duration.medium && days >= 4 && days <= 5) return true;
      if (filters.value.duration.long && days >= 6) return true;
      
      return false;
    });
  }
  
  // Apply price filter
  result = result.filter(excursion => 
    excursion.price >= filters.value.price.min && 
    excursion.price <= filters.value.price.max
  );
  
  // Apply category filter
  if (filters.value.categories.length > 0) {
    result = result.filter(excursion => 
      filters.value.categories.includes(excursion.category)
    );
  }
  
  // Apply company filter
  if (filters.value.companies.length > 0) {
    result = result.filter(excursion => 
      filters.value.companies.includes(excursion.companyId)
    );
  }
  
  // Apply rating filter (mock implementation since we don't have real ratings)
  if (filters.value.ratings.length > 0) {
    // In a real app, you would filter by actual ratings
    // For now, we'll just filter randomly to demonstrate the UI
    const minRating = Math.min(...filters.value.ratings);
    result = result.filter(() => Math.random() > 0.3); // Random filter for demo
  }
  
  // Apply services filter
  if (filters.value.services.length > 0) {
    result = result.filter(excursion => 
      filters.value.services.every(service => 
        excursion.includedServices.includes(service)
      )
    );
  }
  
  // Apply sorting
  result = sortExcursions(result, sortOption.value);
  
  return result;
});

const paginatedExcursions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredExcursions.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredExcursions.value.length / itemsPerPage);
});

// Methods
const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const startDay = start.getDate();
  const endDay = end.getDate();
  const month = months[start.getMonth()];
  const year = start.getFullYear();
  
  return `${startDay} a ${endDay} de ${month}, ${year}`;
};

const getDurationDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Including the start day
};

const getCategoryName = (categoryId) => {
  const category = categories.value.find(c => c.id === categoryId);
  return category ? category.name : '';
};

const getServiceName = (serviceId) => {
  const service = additionalServices.value.find(s => s.id === serviceId);
  return service ? service.name : '';
};

const getExcursionImage = (excursion) => {
  if (!excursion.images || excursion.images.length === 0) {
    return `https://source.unsplash.com/random/800x600/?travel,${excursion.category}`;
  }
  
  const imagePath = excursion.images[0];
  if (imagePath.startsWith('/images/')) {
    return `https://source.unsplash.com/random/800x600/?travel,${excursion.category}`;
  }
  
  return imagePath;
};

const sortExcursions = (excursions, option) => {
  const sorted = [...excursions];
  
  switch (option) {
    case 'price_asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'date_asc':
      sorted.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      break;
    case 'date_desc':
      sorted.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      break;
    case 'rating_desc':
      // In a real app, you would sort by actual ratings
      // For now, we'll just keep the original order
      break;
    case 'duration_asc':
      sorted.sort((a, b) => {
        const daysA = getDurationDays(a.startDate, a.endDate);
        const daysB = getDurationDays(b.startDate, b.endDate);
        return daysA - daysB;
      });
      break;
    case 'duration_desc':
      sorted.sort((a, b) => {
        const daysA = getDurationDays(a.startDate, a.endDate);
        const daysB = getDurationDays(b.startDate, b.endDate);
        return daysB - daysA;
      });
      break;
  }
  
  return sorted;
};

const toggleMonthFilter = (month) => {
  selectedMonth.value = selectedMonth.value === month ? null : month;
  applyFilters();
};

const applyFilters = () => {
  // Reset to first page when filters change
  currentPage.value = 1;
  
  // Update URL with filter parameters
  updateUrlParams();
};

const clearAllFilters = () => {
  searchQuery.value = '';
  selectedMonth.value = null;
  sortOption.value = 'date_asc';
  
  filters.value = {
    destination: '',
    originCity: '',
    duration: {
      short: false,
      medium: false,
      long: false
    },
    price: {
      min: priceRange.min,
      max: priceRange.max
    },
    categories: [],
    companies: [],
    ratings: [],
    services: []
  };
  
  applyFilters();
};

const updateUrlParams = () => {
  const query = {};
  
  if (searchQuery.value) query.q = searchQuery.value;
  if (filters.value.destination) query.destino = filters.value.destination;
  if (filters.value.originCity) query.origem = filters.value.originCity;
  if (selectedMonth.value !== null) query.mes = selectedMonth.value;
  if (sortOption.value !== 'date_asc') query.ordenar = sortOption.value;
  
  if (filters.value.categories.length > 0) query.categorias = filters.value.categories.join(',');
  if (filters.value.services.length > 0) query.servicos = filters.value.services.join(',');
  
  // Only add duration filters if any are selected
  if (filters.value.duration.short || filters.value.duration.medium || filters.value.duration.long) {
    const durations = [];
    if (filters.value.duration.short) durations.push('curta');
    if (filters.value.duration.medium) durations.push('media');
    if (filters.value.duration.long) durations.push('longa');
    query.duracao = durations.join(',');
  }
  
  // Only add price if it's different from the default range
  if (filters.value.price.min > priceRange.min || filters.value.price.max < priceRange.max) {
    query.preco = `${filters.value.price.min}-${filters.value.price.max}`;
  }
  
  if (filters.value.companies.length > 0) query.empresas = filters.value.companies.join(',');
  if (filters.value.ratings.length > 0) query.avaliacao = filters.value.ratings.join(',');
  
  if (currentPage.value > 1) query.pagina = currentPage.value;
  
  router.push({ query });
};

const loadFiltersFromUrl = () => {
  const query = route.query;
  
  if (query.q) searchQuery.value = query.q;
  if (query.destino) filters.value.destination = query.destino;
  if (query.origem) filters.value.originCity = query.origem;
  if (query.mes) selectedMonth.value = parseInt(query.mes);
  if (query.ordenar) sortOption.value = query.ordenar;
  
  if (query.categorias) filters.value.categories = query.categorias.split(',');
  if (query.servicos) filters.value.services = query.servicos.split(',');
  
  if (query.duracao) {
    const durations = query.duracao.split(',');
    filters.value.duration.short = durations.includes('curta');
    filters.value.duration.medium = durations.includes('media');
    filters.value.duration.long = durations.includes('longa');
  }
  
  if (query.preco) {
    const [min, max] = query.preco.split('-').map(Number);
    filters.value.price.min = min;
    filters.value.price.max = max;
  }
  
  if (query.empresas) filters.value.companies = query.empresas.split(',');
  if (query.avaliacao) filters.value.ratings = query.avaliacao.split(',').map(Number);
  
  if (query.pagina) currentPage.value = parseInt(query.pagina);
};

// Pagination methods
const goToPage = (page) => {
  currentPage.value = page;
  updateUrlParams();
  window.scrollTo(0, 0);
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    updateUrlParams();
    window.scrollTo(0, 0);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    updateUrlParams();
    window.scrollTo(0, 0);
  }
};

// Watch for route changes to update filters
watch(() => route.query, () => {
  loadFiltersFromUrl();
}, { deep: true });

// Fetch data
onMounted(async () => {
  await excursionsStore.fetchExcursions();
  loadFiltersFromUrl();
});
</script>
