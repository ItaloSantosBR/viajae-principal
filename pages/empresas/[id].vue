<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Loading state -->
    <div v-if="loading" class="py-20 flex justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
    
    <!-- Error state -->
    <div v-else-if="error" class="container-custom py-20 text-center">
      <div class="bg-red-50 text-red-600 p-6 rounded-lg max-w-2xl mx-auto">
        <Icon name="heroicons:exclamation-circle" class="w-12 h-12 mx-auto mb-4" />
        <h2 class="text-xl font-bold mb-2">Empresa não encontrada</h2>
        <p>{{ error }}</p>
        <NuxtLink to="/excursoes" class="btn btn-primary mt-4">
          Ver Todas as Excursões
        </NuxtLink>
      </div>
    </div>
    
    <!-- Company profile -->
    <div v-else>
      <!-- Hero section -->
      <div class="relative bg-gray-900 text-white">
        <div class="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
        <div class="absolute inset-0 bg-cover bg-center" :style="`background-image: url('${company.coverImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}');`"></div>
        
        <div class="container-custom relative z-20 py-16 md:py-24">
          <div class="flex items-center mb-6">
            <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center mr-6 shadow-lg">
              <img 
                v-if="company.logo" 
                :src="company.logo" 
                :alt="company.name" 
                class="w-16 h-16 object-contain"
              />
              <Icon 
                v-else 
                name="heroicons:building-office-2" 
                class="w-12 h-12 text-primary"
              />
            </div>
            
            <div>
              <h1 class="text-3xl md:text-4xl font-bold">{{ company.name }}</h1>
              <div class="flex items-center mt-2">
                <div class="flex text-primary mr-2">
                  <Icon v-for="i in 5" :key="i" name="heroicons:star" class="w-5 h-5" :class="i <= company.rating ? 'text-primary' : 'text-gray-300'" />
                </div>
                <span class="text-white/90">{{ company.rating }} ({{ company.reviewCount }} avaliações)</span>
              </div>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-4 mb-6">
            <div class="flex items-center bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
              <span>{{ company.location }}</span>
            </div>
            <div class="flex items-center bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
              <span>Desde {{ company.foundedYear }}</span>
            </div>
            <div class="flex items-center bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              <Icon name="heroicons:user-group" class="w-4 h-4 mr-1" />
              <span>{{ companyExcursions.length }} excursões disponíveis</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Main content -->
      <div class="container-custom py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left column: Company info -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div class="p-6">
                <h2 class="text-2xl font-bold mb-4">Sobre a Empresa</h2>
                <p class="text-gray-700 mb-6">{{ company.description }}</p>
                
                <h3 class="text-xl font-bold mb-3">Contato</h3>
                <ul class="space-y-3 mb-6">
                  <li class="flex items-start">
                    <Icon name="heroicons:envelope" class="w-5 h-5 mt-0.5 text-primary mr-2" />
                    <span class="text-gray-700">{{ company.email }}</span>
                  </li>
                  <li class="flex items-start">
                    <Icon name="heroicons:phone" class="w-5 h-5 mt-0.5 text-primary mr-2" />
                    <span class="text-gray-700">{{ company.phone }}</span>
                  </li>
                  <li class="flex items-start">
                    <Icon name="heroicons:map-pin" class="w-5 h-5 mt-0.5 text-primary mr-2" />
                    <span class="text-gray-700">{{ company.address }}</span>
                  </li>
                </ul>
                
                <h3 class="text-xl font-bold mb-3">Redes Sociais</h3>
                <div class="flex space-x-4">
                  <a v-if="company.facebook" :href="company.facebook" target="_blank" class="text-gray-600 hover:text-primary">
                    <Icon name="mdi:facebook" class="w-6 h-6" />
                  </a>
                  <a v-if="company.instagram" :href="company.instagram" target="_blank" class="text-gray-600 hover:text-primary">
                    <Icon name="mdi:instagram" class="w-6 h-6" />
                  </a>
                  <a v-if="company.website" :href="company.website" target="_blank" class="text-gray-600 hover:text-primary">
                    <Icon name="heroicons:globe-alt" class="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Company stats -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div class="p-6">
                <h2 class="text-2xl font-bold mb-4">Estatísticas</h2>
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-gray-50 p-4 rounded-lg text-center">
                    <div class="text-3xl font-bold text-primary">{{ company.excursionsCount }}</div>
                    <div class="text-gray-600">Excursões</div>
                  </div>
                  <div class="bg-gray-50 p-4 rounded-lg text-center">
                    <div class="text-3xl font-bold text-primary">{{ company.destinationsCount }}</div>
                    <div class="text-gray-600">Destinos</div>
                  </div>
                  <div class="bg-gray-50 p-4 rounded-lg text-center">
                    <div class="text-3xl font-bold text-primary">{{ company.clientsCount }}+</div>
                    <div class="text-gray-600">Clientes</div>
                  </div>
                  <div class="bg-gray-50 p-4 rounded-lg text-center">
                    <div class="text-3xl font-bold text-primary">{{ company.yearsActive }}</div>
                    <div class="text-gray-600">Anos de experiência</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Reviews summary -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="p-6">
                <h2 class="text-2xl font-bold mb-4">Avaliações</h2>
                <div class="flex items-center mb-4">
                  <div class="text-4xl font-bold text-primary mr-4">{{ company.rating }}</div>
                  <div>
                    <div class="flex text-primary">
                      <Icon v-for="i in 5" :key="i" name="heroicons:star" class="w-6 h-6" :class="i <= company.rating ? 'text-primary' : 'text-gray-300'" />
                    </div>
                    <div class="text-gray-600">{{ company.reviewCount }} avaliações</div>
                  </div>
                </div>
                
                <div class="space-y-2 mb-6">
                  <div v-for="i in 5" :key="i" class="flex items-center">
                    <div class="w-12 text-right mr-2">{{ 6-i }} stars</div>
                    <div class="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        class="h-full bg-primary" 
                        :style="`width: ${getReviewPercentage(6-i)}%`"
                      ></div>
                    </div>
                    <div class="w-12 text-left ml-2">{{ getReviewCount(6-i) }}</div>
                  </div>
                </div>
                
                <NuxtLink :to="`/empresas/${companyId}/avaliacoes`" class="text-primary hover:text-primary-600 font-medium flex items-center justify-center">
                  Ver todas as avaliações
                  <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-1" />
                </NuxtLink>
              </div>
            </div>
          </div>
          
          <!-- Right column: Excursions -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                  <h2 class="text-2xl font-bold">Excursões Disponíveis</h2>
                  
                  <div class="flex items-center">
                    <label class="text-gray-700 mr-2 whitespace-nowrap">Ordenar por:</label>
                    <select 
                      v-model="sortOption" 
                      class="form-input py-2" 
                      @change="sortExcursions"
                    >
                      <option value="date_asc">Data (mais próxima)</option>
                      <option value="date_desc">Data (mais distante)</option>
                      <option value="price_asc">Menor Preço</option>
                      <option value="price_desc">Maior Preço</option>
                      <option value="duration_asc">Menor Duração</option>
                      <option value="duration_desc">Maior Duração</option>
                    </select>
                  </div>
                </div>
                
                <!-- Filter by category -->
                <div class="mb-6">
                  <div class="flex flex-wrap gap-2">
                    <button 
                      @click="filterByCategory('')" 
                      class="px-3 py-1 rounded-full text-sm"
                      :class="selectedCategory === '' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                    >
                      Todas
                    </button>
                    <button 
                      v-for="category in categories" 
                      :key="category.id"
                      @click="filterByCategory(category.id)" 
                      class="px-3 py-1 rounded-full text-sm"
                      :class="selectedCategory === category.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                    >
                      {{ category.name }}
                    </button>
                  </div>
                </div>
                
                <!-- No excursions -->
                <div v-if="filteredExcursions.length === 0" class="text-center py-8">
                  <Icon name="heroicons:calendar" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 class="text-xl font-bold mb-2">Nenhuma excursão encontrada</h3>
                  <p class="text-gray-600">
                    Não há excursões disponíveis para os filtros selecionados.
                  </p>
                </div>
                
                <!-- Excursions list -->
                <div v-else class="space-y-6">
                  <div 
                    v-for="excursion in filteredExcursions" 
                    :key="excursion.id" 
                    class="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
                  >
                    <div class="md:flex">
                      <!-- Excursion Image -->
                      <div class="md:w-1/3 relative overflow-hidden h-48 md:h-auto rounded-lg mb-4 md:mb-0 md:mr-6">
                        <img 
                          :src="getExcursionImage(excursion)" 
                          :alt="excursion.title" 
                          class="w-full h-full object-cover" 
                        />
                        <div class="absolute top-0 right-0 bg-primary text-white px-3 py-1 m-2 rounded-full text-sm font-medium">
                          {{ getCategoryName(excursion.category) }}
                        </div>
                      </div>
                      
                      <!-- Excursion Details -->
                      <div class="md:w-2/3 flex flex-col">
                        <div class="flex-grow">
                          <h3 class="text-xl font-bold mb-2">{{ excursion.title }}</h3>
                          
                          <div class="flex items-center text-gray-600 mb-2">
                            <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
                            <span>{{ excursion.destination }}</span>
                          </div>
                          
                          <div class="flex items-center text-gray-600 mb-2">
                            <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
                            <span>{{ formatDateRange(excursion.startDate, excursion.endDate) }}</span>
                            <span class="mx-2">•</span>
                            <span>{{ getDurationDays(excursion.startDate, excursion.endDate) }} dias</span>
                          </div>
                          
                          <div class="flex flex-wrap gap-2 mb-3">
                            <span v-for="service in excursion.includedServices" :key="service" class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                              {{ getServiceName(service) }}
                            </span>
                          </div>
                          
                          <p class="text-gray-600 line-clamp-2 mb-4">{{ excursion.description }}</p>
                        </div>
                        
                        <div class="flex items-center justify-between mt-2">
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
              </div>
            </div>
            
            <!-- Testimonials -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="p-6">
                <h2 class="text-2xl font-bold mb-6">O que Dizem Nossos Clientes</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div v-for="(testimonial, index) in testimonials" :key="index" class="bg-gray-50 p-4 rounded-lg">
                    <div class="flex items-center mb-4">
                      <div class="flex text-primary">
                        <Icon v-for="i in 5" :key="i" name="heroicons:star" class="w-5 h-5" :class="i <= testimonial.rating ? 'text-primary' : 'text-gray-300'" />
                      </div>
                    </div>
                    <p class="text-gray-700 mb-4">{{ testimonial.text }}</p>
                    <div class="flex items-center">
                      <img :src="testimonial.avatar" :alt="testimonial.name" class="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <h4 class="font-medium">{{ testimonial.name }}</h4>
                        <p class="text-sm text-gray-500">{{ testimonial.excursion }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="text-center mt-6">
                  <NuxtLink :to="`/empresas/${companyId}/avaliacoes`" class="btn btn-outline">
                    Ver Todas as Avaliações
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useExcursionsStore } from '~/stores/excursions';
import { useCompaniesStore } from '~/stores/companies';

const route = useRoute();
const companyId = route.params.id;
const excursionsStore = useExcursionsStore();
const companiesStore = useCompaniesStore();

// State
const loading = ref(true);
const error = ref(null);
const sortOption = ref('date_asc');
const selectedCategory = ref('');

// Fetch company data
const company = computed(() => companiesStore.getCompanyById(companyId));

// Get company excursions
const companyExcursions = computed(() => {
  return excursionsStore.excursions.filter(excursion => excursion.companyId === companyId);
});

// Filtered excursions
const filteredExcursions = computed(() => {
  let result = [...companyExcursions.value];
  
  // Filter by category
  if (selectedCategory.value) {
    result = result.filter(excursion => excursion.category === selectedCategory.value);
  }
  
  // Apply sorting
  result = sortExcursionsList(result, sortOption.value);
  
  return result;
});

// Categories
const categories = computed(() => excursionsStore.categories);

// Testimonials
const testimonials = [
  {
    name: 'Ana Silva',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    text: 'Minha experiência com a excursão para Ilhabela foi incrível! Tudo muito bem organizado, desde o transporte até a hospedagem. Recomendo muito!',
    rating: 5,
    excursion: 'Fim de Semana em Ilhabela'
  },
  {
    name: 'Carlos Oliveira',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'A viagem para a Serra da Mantiqueira superou minhas expectativas. Os guias eram muito conhecedores e a hospedagem era confortável.',
    rating: 4,
    excursion: 'Expedição Serra da Mantiqueira'
  },
  {
    name: 'Mariana Costa',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Levei minha família para o Thermas dos Laranjais e foi uma experiência inesquecível. As crianças adoraram e o hotel era excelente!',
    rating: 5,
    excursion: 'Thermas dos Laranjais'
  },
  {
    name: 'Pedro Santos',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    text: 'Viagem muito bem organizada, com ótimo custo-benefício. A empresa cumpriu tudo o que prometeu e ainda superou expectativas.',
    rating: 5,
    excursion: 'Fim de Semana em Campos do Jordão'
  }
];

// Methods
const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
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
  const service = excursionsStore.additionalServices.find(s => s.id === serviceId);
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

const sortExcursions = () => {
  // This function is called when the sort option changes
  // The actual sorting is done in the computed property
};

const sortExcursionsList = (excursions, option) => {
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

const filterByCategory = (categoryId) => {
  selectedCategory.value = categoryId;
};

const getReviewPercentage = (stars) => {
  // Mock function to get percentage of reviews with a specific star rating
  switch(stars) {
    case 5: return 70;
    case 4: return 20;
    case 3: return 7;
    case 2: return 2;
    case 1: return 1;
    default: return 0;
  }
};

const getReviewCount = (stars) => {
  // Mock function to get count of reviews with a specific star rating
  const total = company.value.reviewCount;
  const percentage = getReviewPercentage(stars);
  return Math.round(total * percentage / 100);
};

// Fetch data
onMounted(async () => {
  loading.value = true;
  error.value = null;
  
  try {
    await Promise.all([
      excursionsStore.fetchExcursions(),
      companiesStore.fetchCompanies()
    ]);
    
    if (!company.value) {
      error.value = 'Empresa não encontrada ou não está mais disponível.';
    }
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao carregar os dados da empresa.';
  } finally {
    loading.value = false;
  }
});
</script>
