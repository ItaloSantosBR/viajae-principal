<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Hero section -->
    <section class="relative bg-gray-900 text-white">
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');"></div>
      
      <div class="container-custom relative z-20 py-20 md:py-32">
        <div class="max-w-2xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Destinos Incríveis</h1>
          <p class="text-xl mb-8">Conheça os melhores destinos para suas próximas excursões e descubra experiências inesquecíveis.</p>
          
          <div class="relative">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Buscar destinos..." 
              class="w-full px-4 py-3 pl-12 rounded-lg text-gray-800"
              @keyup.enter="searchDestinations"
            />
            <Icon 
              name="heroicons:magnifying-glass" 
              class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
            />
            <button 
              @click="searchDestinations" 
              class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-md"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Popular destinations -->
    <section class="py-16">
      <div class="container-custom">
        <h2 class="text-3xl font-bold mb-8">Destinos Populares</h2>
        
        <!-- Loading state -->
        <div v-if="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        
        <!-- Destinations grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="destination in popularDestinations" 
            :key="destination.id" 
            class="bg-white rounded-lg shadow-md overflow-hidden group"
          >
            <div class="relative h-60 overflow-hidden">
              <img 
                :src="destination.image" 
                :alt="destination.name" 
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <h3 class="text-2xl font-bold text-white">{{ destination.name }}</h3>
                <div class="flex items-center text-white/90">
                  <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
                  <span>{{ destination.state }}</span>
                </div>
              </div>
            </div>
            
            <div class="p-6">
              <p class="text-gray-700 mb-4 line-clamp-3">{{ destination.description }}</p>
              
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center text-gray-600">
                  <Icon name="heroicons:calendar" class="w-5 h-5 mr-1" />
                  <span>{{ destination.excursionsCount }} excursões</span>
                </div>
                <div class="flex items-center text-gray-600">
                  <span class="font-medium">A partir de</span>
                  <span class="text-primary font-bold ml-1">R$ {{ destination.minPrice }}</span>
                </div>
              </div>
              
              <NuxtLink :to="`/destinos/${destination.slug}`" class="btn btn-primary w-full text-center">
                Ver Destino
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Destinations by region -->
    <section class="py-16 bg-gray-100">
      <div class="container-custom">
        <h2 class="text-3xl font-bold mb-8">Destinos por Região</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="region in regions" 
            :key="region.id" 
            class="bg-white rounded-lg shadow-md overflow-hidden group"
          >
            <div class="relative h-40 overflow-hidden">
              <img 
                :src="region.image" 
                :alt="region.name" 
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <h3 class="text-xl font-bold text-white">{{ region.name }}</h3>
              </div>
            </div>
            
            <div class="p-4">
              <ul class="space-y-2">
                <li v-for="destination in region.destinations.slice(0, 5)" :key="destination.id">
                  <NuxtLink 
                    :to="`/destinos/${destination.slug}`" 
                    class="flex items-center text-gray-700 hover:text-primary"
                  >
                    <Icon name="heroicons:map-pin" class="w-4 h-4 mr-2 text-primary" />
                    <span>{{ destination.name }}</span>
                  </NuxtLink>
                </li>
              </ul>
              
              <div v-if="region.destinations.length > 5" class="mt-3 text-center">
                <NuxtLink 
                  :to="`/destinos?regiao=${region.slug}`" 
                  class="text-primary hover:text-primary-600 text-sm font-medium"
                >
                  Ver mais destinos
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Destination categories -->
    <section class="py-16">
      <div class="container-custom">
        <h2 class="text-3xl font-bold mb-8">Destinos por Categoria</h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <NuxtLink 
            v-for="category in categories" 
            :key="category.id" 
            :to="`/destinos?categoria=${category.id}`"
            class="relative h-40 rounded-lg overflow-hidden group"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
            <img :src="getCategoryImage(category.id)" :alt="category.name" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div class="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 class="text-white font-bold text-xl">{{ category.name }}</h3>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- Featured destination -->
    <section class="py-16 bg-gray-100">
      <div class="container-custom">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="md:flex">
            <div class="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Rio de Janeiro" 
                class="w-full h-full object-cover"
              />
            </div>
            
            <div class="md:w-1/2 p-8">
              <div class="flex items-center mb-2">
                <span class="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  Destino em Destaque
                </span>
              </div>
              
              <h2 class="text-3xl font-bold mb-4">Rio de Janeiro</h2>
              
              <p class="text-gray-700 mb-6">
                Conhecida como a Cidade Maravilhosa, o Rio de Janeiro é um dos destinos mais icônicos do Brasil. Com suas praias deslumbrantes, montanhas imponentes e rica cultura, a cidade oferece experiências únicas para todos os tipos de viajantes.
              </p>
              
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="flex items-center">
                  <Icon name="heroicons:sun" class="w-5 h-5 text-primary mr-2" />
                  <span>Clima tropical</span>
                </div>
                <div class="flex items-center">
                  <Icon name="heroicons:map" class="w-5 h-5 text-primary mr-2" />
                  <span>Sudeste do Brasil</span>
                </div>
                <div class="flex items-center">
                  <Icon name="heroicons:language" class="w-5 h-5 text-primary mr-2" />
                  <span>Português</span>
                </div>
                <div class="flex items-center">
                  <Icon name="heroicons:currency-dollar" class="w-5 h-5 text-primary mr-2" />
                  <span>Real (BRL)</span>
                </div>
              </div>
              
              <h3 class="font-bold text-lg mb-2">Atrações Principais:</h3>
              <ul class="space-y-1 mb-6">
                <li class="flex items-center">
                  <Icon name="heroicons:check-circle" class="w-5 h-5 text-primary mr-2" />
                  <span>Cristo Redentor</span>
                </li>
                <li class="flex items-center">
                  <Icon name="heroicons:check-circle" class="w-5 h-5 text-primary mr-2" />
                  <span>Pão de Açúcar</span>
                </li>
                <li class="flex items-center">
                  <Icon name="heroicons:check-circle" class="w-5 h-5 text-primary mr-2" />
                  <span>Praias de Copacabana e Ipanema</span>
                </li>
                <li class="flex items-center">
                  <Icon name="heroicons:check-circle" class="w-5 h-5 text-primary mr-2" />
                  <span>Maracanã</span>
                </li>
              </ul>
              
              <NuxtLink to="/destinos/rio-de-janeiro" class="btn btn-primary">
                Ver Excursões para o Rio
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Travel tips -->
    <section class="py-16">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Dicas de Viagem</h2>
          <p class="text-lg text-gray-700 max-w-3xl mx-auto">
            Confira nossas dicas para aproveitar ao máximo suas excursões.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Icon name="heroicons:calendar" class="w-6 h-6 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-3">Planejamento</h3>
            <p class="text-gray-700">
              Reserve sua excursão com antecedência para garantir melhores preços e disponibilidade. Verifique a previsão do tempo para o período da viagem e prepare-se adequadamente.
            </p>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Icon name="heroicons:suitcase" class="w-6 h-6 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-3">O que Levar</h3>
            <p class="text-gray-700">
              Leve roupas adequadas para o clima e atividades previstas. Não esqueça documentos, medicamentos pessoais, protetor solar e uma pequena mochila para passeios.
            </p>
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Icon name="heroicons:banknotes" class="w-6 h-6 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-3">Orçamento</h3>
            <p class="text-gray-700">
              Além do valor da excursão, reserve um orçamento para gastos extras como souvenirs, refeições não inclusas e atividades opcionais disponíveis no destino.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Newsletter -->
    <section class="py-16 bg-primary">
      <div class="container-custom">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-4 text-white">Receba Novidades sobre Destinos</h2>
          <p class="text-white/90 mb-8">
            Inscreva-se para receber ofertas exclusivas e dicas sobre os melhores destinos para suas próximas excursões.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              class="flex-grow px-4 py-3 rounded-lg"
            />
            <button class="btn bg-white text-primary hover:bg-gray-100 font-medium px-6 py-3 rounded-lg">
              Inscrever-se
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useExcursionsStore } from '~/stores/excursions';
import { useDestinationsStore } from '~/stores/destinations';

const router = useRouter();
const excursionsStore = useExcursionsStore();
const destinationsStore = useDestinationsStore();

// State
const loading = ref(true);
const searchQuery = ref('');

// Computed properties
const categories = computed(() => excursionsStore.categories);
const popularDestinations = computed(() => destinationsStore.popularDestinations);
const regions = computed(() => destinationsStore.regions);

// Methods
const searchDestinations = () => {
  if (searchQuery.value.trim()) {
    router.push(`/destinos?q=${encodeURIComponent(searchQuery.value.trim())}`);
  }
};

const getCategoryImage = (categoryId) => {
  // Map category IDs to appropriate placeholder images
  const categoryImages = {
    'praia': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
    'parque-aquatico': 'https://images.unsplash.com/photo-1582553081653-f515f2a9f2ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'serra': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'cultural': 'https://images.unsplash.com/photo-1551009175-15bdf9dcb580?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    'aventura': 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  };
  
  return categoryImages[categoryId] || `https://source.unsplash.com/random/800x600/?travel,${categoryId}`;
};

// Fetch data
onMounted(async () => {
  loading.value = true;
  
  try {
    await Promise.all([
      excursionsStore.fetchExcursions(),
      destinationsStore.fetchDestinations()
    ]);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
});
</script>
