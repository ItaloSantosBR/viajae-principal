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
        <h2 class="text-xl font-bold mb-2">Destino não encontrado</h2>
        <p>{{ error }}</p>
        <NuxtLink to="/destinos" class="btn btn-primary mt-4">
          Ver Todos os Destinos
        </NuxtLink>
      </div>
    </div>
    
    <!-- Destination details -->
    <div v-else>
      <!-- Hero section -->
      <div class="relative bg-gray-900 text-white">
        <div class="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
        <div class="absolute inset-0 bg-cover bg-center" :style="`background-image: url('${destination.heroImage}');`"></div>
        
        <div class="container-custom relative z-20 py-16 md:py-24">
          <div class="max-w-3xl">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ destination.name }}</h1>
            
            <div class="flex items-center text-white/90 mb-6">
              <Icon name="heroicons:map-pin" class="w-5 h-5 mr-1" />
              <span>{{ destination.state }}</span>
            </div>
            
            <p class="text-xl mb-8">{{ destination.shortDescription }}</p>
            
            <div class="flex flex-wrap gap-3">
              <div v-for="tag in destination.tags" :key="tag" class="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                {{ tag }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Main content -->
      <div class="container-custom py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left column: Destination info -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div class="p-6">
                <h2 class="text-2xl font-bold mb-4">Sobre {{ destination.name }}</h2>
                <p class="text-gray-700 mb-6">{{ destination.description }}</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 class="text-xl font-bold mb-3">Informações Gerais</h3>
                    <ul class="space-y-2">
                      <li class="flex items-start">
                        <Icon name="heroicons:map" class="w-5 h-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <span class="font-medium">Região:</span>
                          <span class="ml-1">{{ destination.region }}</span>
                        </div>
                      </li>
                      <li class="flex items-start">
                        <Icon name="heroicons:globe-americas" class="w-5 h-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <span class="font-medium">Estado:</span>
                          <span class="ml-1">{{ destination.state }}</span>
                        </div>
                      </li>
                      <li class="flex items-start">
                        <Icon name="heroicons:users" class="w-5 h-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <span class="font-medium">População:</span>
                          <span class="ml-1">{{ destination.population }}</span>
                        </div>
                      </li>
                      <li class="flex items-start">
                        <Icon name="heroicons:sun" class="w-5 h-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <span class="font-medium">Clima:</span>
                          <span class="ml-1">{{ destination.climate }}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 class="text-xl font-bold mb-3">Melhor Época para Visitar</h3>
                    <p class="text-gray-700 mb-3">{{ destination.bestTimeToVisit }}</p>
                    
                    <div class="flex flex-wrap gap-2">
                      <span 
                        v-for="month in destination.bestMonths" 
                        :key="month" 
                        class="bg-primary-50 text-primary px-2 py-1 rounded-md text-sm"
                      >
                        {{ month }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <h3 class="text-xl font-bold mb-3">Principais Atrações</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div 
                    v-for="attraction in destination.attractions" 
                    :key="attraction.name" 
                    class="bg-gray-50 p-4 rounded-lg"
                  >
                    <h4 class="font-bold mb-1">{{ attraction.name }}</h4>
                    <p class="text-gray-700 text-sm">{{ attraction.description }}</p>
                  </div>
                </div>
                
                <h3 class="text-xl font-bold mb-3">Como Chegar</h3>
                <div class="space-y-3 mb-8">
                  <div v-if="destination.transportation.airport" class="flex items-start">
                    <Icon name="heroicons:paper-airplane" class="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <span class="font-medium">Aeroporto:</span>
                      <span class="ml-1">{{ destination.transportation.airport }}</span>
                    </div>
                  </div>
                  <div v-if="destination.transportation.bus" class="flex items-start">
                    <Icon name="heroicons:truck" class="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <span class="font-medium">Rodoviária:</span>
                      <span class="ml-1">{{ destination.transportation.bus }}</span>
                    </div>
                  </div>
                  <div v-if="destination.transportation.car" class="flex items-start">
                    <Icon name="heroicons:map" class="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <span class="font-medium">De Carro:</span>
                      <span class="ml-1">{{ destination.transportation.car }}</span>
                    </div>
                  </div>
                </div>
                
                <h3 class="text-xl font-bold mb-3">Dicas de Viagem</h3>
                <ul class="space-y-2 mb-6">
                  <li v-for="(tip, index) in destination.tips" :key="index" class="flex items-start">
                    <Icon name="heroicons:light-bulb" class="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span>{{ tip }}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- Photo gallery -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div class="p-6">
                <h2 class="text-2xl font-bold mb-4">Galeria de Fotos</h2>
                
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div 
                    v-for="(photo, index) in destination.gallery" 
                    :key="index" 
                    class="relative h-40 rounded-lg overflow-hidden cursor-pointer"
                    @click="openGallery(index)"
                  >
                    <img :src="photo" :alt="`${destination.name} - ${index + 1}`" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Map -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div class="p-6">
                <h2 class="text-2xl font-bold mb-4">Localização</h2>
                
                <div class="h-80 bg-gray-200 rounded-lg overflow-hidden">
                  <!-- Placeholder for map -->
                  <div class="w-full h-full flex items-center justify-center bg-gray-100">
                    <div class="text-center">
                      <Icon name="heroicons:map" class="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p class="text-gray-600">Mapa de {{ destination.name }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right column: Excursions -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8 sticky top-4">
              <div class="p-6">
                <h2 class="text-2xl font-bold mb-4">Excursões Disponíveis</h2>
                
                <div v-if="destinationExcursions.length === 0" class="text-center py-6">
                  <Icon name="heroicons:calendar" class="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p class="text-gray-600 mb-4">Nenhuma excursão disponível no momento.</p>
                  <NuxtLink to="/excursoes" class="text-primary hover:text-primary-600 font-medium">
                    Ver todas as excursões
                  </NuxtLink>
                </div>
                
                <div v-else class="space-y-6">
                  <div 
                    v-for="excursion in destinationExcursions" 
                    :key="excursion.id" 
                    class="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
                  >
                    <div class="relative h-40 rounded-lg overflow-hidden mb-4">
                      <img 
                        :src="getExcursionImage(excursion)" 
                        :alt="excursion.title" 
                        class="w-full h-full object-cover" 
                      />
                      <div class="absolute top-0 right-0 bg-primary text-white px-3 py-1 m-2 rounded-full text-sm font-medium">
                        {{ getCategoryName(excursion.category) }}
                      </div>
                    </div>
                    
                    <h3 class="text-lg font-bold mb-2">{{ excursion.title }}</h3>
                    
                    <div class="flex items-center text-gray-600 mb-2">
                      <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
                      <span>{{ formatDateRange(excursion.startDate, excursion.endDate) }}</span>
                    </div>
                    
                    <div class="flex items-center text-gray-600 mb-3">
                      <Icon name="heroicons:building-office-2" class="w-4 h-4 mr-1" />
                      <span>{{ excursion.companyName }}</span>
                    </div>
                    
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center">
                        <div class="flex text-primary">
                          <Icon v-for="i in 5" :key="i" name="heroicons:star" class="w-4 h-4" :class="i <= 4 ? 'text-primary' : 'text-gray-300'" />
                        </div>
                        <span class="text-sm text-gray-600 ml-1">(12)</span>
                      </div>
                      <div>
                        <span class="text-lg font-bold text-gray-900">R$ {{ excursion.price }}</span>
                      </div>
                    </div>
                    
                    <NuxtLink :to="`/excursoes/${excursion.id}`" class="btn btn-primary w-full text-center">
                      Ver Detalhes
                    </NuxtLink>
                  </div>
                </div>
                
                <div v-if="destinationExcursions.length > 0" class="mt-6 text-center">
                  <NuxtLink 
                    :to="`/excursoes?destino=${destination.name}`" 
                    class="text-primary hover:text-primary-600 font-medium"
                  >
                    Ver todas as excursões para {{ destination.name }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Related destinations -->
      <div class="bg-gray-100 py-16">
        <div class="container-custom">
          <h2 class="text-3xl font-bold mb-8">Destinos Relacionados</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              v-for="dest in relatedDestinations" 
              :key="dest.id" 
              class="bg-white rounded-lg shadow-md overflow-hidden group"
            >
              <div class="relative h-48 overflow-hidden">
                <img 
                  :src="dest.image" 
                  :alt="dest.name" 
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div class="absolute bottom-0 left-0 right-0 p-4">
                  <h3 class="text-xl font-bold text-white">{{ dest.name }}</h3>
                  <div class="flex items-center text-white/90">
                    <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
                    <span>{{ dest.state }}</span>
                  </div>
                </div>
              </div>
              
              <div class="p-6">
                <p class="text-gray-700 mb-4 line-clamp-2">{{ dest.description }}</p>
                
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center text-gray-600">
                    <Icon name="heroicons:calendar" class="w-5 h-5 mr-1" />
                    <span>{{ dest.excursionsCount }} excursões</span>
                  </div>
                  <div class="flex items-center text-gray-600">
                    <span class="font-medium">A partir de</span>
                    <span class="text-primary font-bold ml-1">R$ {{ dest.minPrice }}</span>
                  </div>
                </div>
                
                <NuxtLink :to="`/destinos/${dest.slug}`" class="btn btn-primary w-full text-center">
                  Ver Destino
                </NuxtLink>
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
import { useDestinationsStore } from '~/stores/destinations';

const route = useRoute();
const destinationSlug = route.params.slug;
const excursionsStore = useExcursionsStore();
const destinationsStore = useDestinationsStore();

// State
const loading = ref(true);
const error = ref(null);

// Computed properties
const destination = computed(() => destinationsStore.getDestinationBySlug(destinationSlug));

const destinationExcursions = computed(() => {
  if (!destination.value) return [];
  
  return excursionsStore.excursions.filter(excursion => 
    excursion.destination.toLowerCase().includes(destination.value.name.toLowerCase())
  ).slice(0, 3); // Limit to 3 excursions
});

const relatedDestinations = computed(() => {
  if (!destination.value) return [];
  
  // Get destinations in the same region or with similar tags
  return destinationsStore.destinations
    .filter(dest => 
      dest.id !== destination.value.id && 
      (dest.region === destination.value.region || 
       dest.tags.some(tag => destination.value.tags.includes(tag)))
    )
    .slice(0, 3); // Limit to 3 related destinations
});

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

const getCategoryName = (categoryId) => {
  const category = excursionsStore.categories.find(c => c.id === categoryId);
  return category ? category.name : '';
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

const openGallery = (index) => {
  // This would open a lightbox gallery in a real implementation
  console.log('Opening gallery at index:', index);
};

// Fetch data
onMounted(async () => {
  loading.value = true;
  error.value = null;
  
  try {
    await Promise.all([
      excursionsStore.fetchExcursions(),
      destinationsStore.fetchDestinations()
    ]);
    
    if (!destination.value) {
      error.value = 'Destino não encontrado ou não está mais disponível.';
    }
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao carregar os dados do destino.';
  } finally {
    loading.value = false;
  }
});
</script>
