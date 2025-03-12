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
        <h2 class="text-xl font-bold mb-2">Excursão não encontrada</h2>
        <p>{{ error }}</p>
        <NuxtLink to="/excursoes" class="btn btn-primary mt-4">
          Ver Todas as Excursões
        </NuxtLink>
      </div>
    </div>
    
    <!-- Excursion details -->
    <div v-else>
      <!-- Hero section with image gallery -->
      <div class="relative bg-gray-900 text-white">
        <div class="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
        
        <!-- Main image -->
        <div class="absolute inset-0 bg-cover bg-center" :style="`background-image: url('${mainImage}');`"></div>
        
        <div class="container-custom relative z-20 py-16 md:py-24">
          <div class="max-w-3xl">
            <div class="flex items-center mb-4">
              <span class="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                {{ getCategoryName(excursion.category) }}
              </span>
              <span class="mx-2 text-white/70">•</span>
              <span class="text-white/90 flex items-center">
                <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
                {{ excursion.destination }}
              </span>
            </div>
            
            <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ excursion.title }}</h1>
            
            <div class="flex items-center text-white/90 mb-6">
              <Icon name="heroicons:calendar" class="w-5 h-5 mr-1" />
              <span>{{ formatDateRange(excursion.startDate, excursion.endDate) }}</span>
              <span class="mx-2">•</span>
              <span>{{ getDurationDays(excursion.startDate, excursion.endDate) }} dias</span>
            </div>
            
            <div class="flex items-center mb-6">
              <div class="flex items-center mr-4">
                <Icon name="heroicons:user-group" class="w-5 h-5 mr-1 text-white/90" />
                <span class="text-white/90">{{ excursion.availableSpots }} vagas disponíveis</span>
              </div>
              <div class="flex items-center">
                <Icon name="heroicons:building-office-2" class="w-5 h-5 mr-1 text-white/90" />
                <span class="text-white/90">Por {{ excursion.companyName }}</span>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-2 mb-8">
              <span v-for="service in excursion.includedServices" :key="service" class="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center">
                <Icon :name="getServiceIcon(service)" class="w-4 h-4 mr-1" />
                {{ getServiceName(service) }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Thumbnail gallery 
      <div class="bg-white border-b">
        <div class="container-custom py-4">
          <div class="flex overflow-x-auto space-x-4 pb-2">
            <div 
              v-for="(image, index) in excursionImages" 
              :key="index" 
              class="flex-shrink-0 w-24 h-16 rounded-md overflow-hidden cursor-pointer"
              :class="{'ring-2 ring-primary': selectedImageIndex === index}"
              @click="selectedImageIndex = index"
            >
              <img :src="image" :alt="`${excursion.title} - Imagem ${index + 1}`" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div> -->
      
      <!-- Submenu navigation -->
      <div class="sticky top-0 z-30 bg-white shadow-sm border-b">
        <div class="container-custom">
          <div class="flex overflow-x-auto space-x-6 py-4">
            <a 
              v-for="section in sections" 
              :key="section.id" 
              :href="`#${section.id}`" 
              class="text-gray-700 hover:text-primary whitespace-nowrap font-medium px-1 py-1 border-b-2 transition-colors"
              :class="activeSection === section.id ? 'border-primary text-primary' : 'border-transparent'"
              @click.prevent="scrollToSection(section.id)"
            >
              {{ section.name }}
            </a>
          </div>
        </div>
      </div>
      
      <!-- Main content -->
      <div class="container-custom py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left column: Details -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div class="p-6">
                <h2 id="sobre" class="text-2xl font-bold mb-4">Sobre a Excursão</h2>
                <p class="text-gray-700 mb-6">{{ excursion.description }}</p>
                
                <div class="bg-gray-50 p-4 rounded-lg mb-6">
                  <div class="flex items-start">
                    <Icon name="heroicons:truck" class="w-6 h-6 text-primary mr-3 mt-1" />
                    <div>
                      <h4 class="font-bold text-lg">Cidade de Origem</h4>
                      <p class="text-gray-600">{{ excursion.originCity }}</p>
                    </div>
                  </div>
                </div>
                
                <h3 id="servicos" class="text-xl font-bold mb-3">Serviços Inclusos</h3>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  <li v-for="service in excursion.includedServices" :key="service" class="flex items-center">
                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-primary mr-2" />
                    <span>{{ getServiceName(service) }}</span>
                  </li>
                </ul>
                
                <h3 id="hospedagem" class="text-xl font-bold mb-3">Hospedagem</h3>
                <div class="bg-gray-50 p-4 rounded-lg mb-6">
                  <div class="flex items-start">
                    <Icon name="heroicons:home" class="w-6 h-6 text-primary mr-3 mt-1" />
                    <div>
                      <h4 class="font-bold text-lg">{{ excursion.accommodation.name }}</h4>
                      <p class="text-gray-600 mb-2">Tipo: {{ excursion.accommodation.type }}</p>
                      <div class="flex flex-wrap gap-2">
                        <span v-for="amenity in excursion.accommodation.amenities" :key="amenity" class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {{ amenity }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 id="itinerario" class="text-xl font-bold mb-3">Itinerário</h3>
                <div class="space-y-4 mb-6">
                  <div class="flex">
                    <div class="flex flex-col items-center mr-4">
                      <div class="rounded-full h-8 w-8 bg-primary text-white flex items-center justify-center font-bold">1</div>
                      <div class="h-full w-0.5 bg-gray-200 mt-2"></div>
                    </div>
                    <div>
                      <h4 class="font-bold">Dia 1 - Saída</h4>
                      <p class="text-gray-600">Saída do ponto de encontro e viagem até o destino. Check-in na hospedagem e tempo livre.</p>
                    </div>
                  </div>
                  
                  <div class="flex">
                    <div class="flex flex-col items-center mr-4">
                      <div class="rounded-full h-8 w-8 bg-primary text-white flex items-center justify-center font-bold">2</div>
                      <div class="h-full w-0.5 bg-gray-200 mt-2"></div>
                    </div>
                    <div>
                      <h4 class="font-bold">Dia 2 - Atividades</h4>
                      <p class="text-gray-600">Café da manhã e dia de atividades conforme programação da excursão.</p>
                    </div>
                  </div>
                  
                  <div class="flex">
                    <div class="flex flex-col items-center mr-4">
                      <div class="rounded-full h-8 w-8 bg-primary text-white flex items-center justify-center font-bold">3</div>
                    </div>
                    <div>
                      <h4 class="font-bold">Último Dia - Retorno</h4>
                      <p class="text-gray-600">Café da manhã, check-out e retorno ao ponto de partida.</p>
                    </div>
                  </div>
                </div>
                
                <h3 id="informacoes" class="text-xl font-bold mb-3">Informações Importantes</h3>
                <ul class="space-y-2 mb-6">
                  <li class="flex items-start">
                    <Icon name="heroicons:information-circle" class="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span>Levar documentos de identificação originais.</span>
                  </li>
                  <li class="flex items-start">
                    <Icon name="heroicons:information-circle" class="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span>Recomendamos levar roupas confortáveis e adequadas para o clima do destino.</span>
                  </li>
                  <li class="flex items-start">
                    <Icon name="heroicons:information-circle" class="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span>Crianças devem estar acompanhadas de responsáveis.</span>
                  </li>
                </ul>
                
                <h3 id="cancelamento" class="text-xl font-bold mb-3">Política de Cancelamento</h3>
                <ul class="space-y-2">
                  <li class="flex items-start">
                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span>Cancelamento até 30 dias antes: reembolso de 90%</span>
                  </li>
                  <li class="flex items-start">
                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-primary mr-2 mt-0.5" />
                    <span>Cancelamento até 15 dias antes: reembolso de 50%</span>
                  </li>
                  <li class="flex items-start">
                    <Icon name="heroicons:x-circle" class="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                    <span>Cancelamento com menos de 15 dias: sem reembolso</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- Company info -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div class="p-6">
                <h2 id="empresa" class="text-2xl font-bold mb-4">Sobre a Empresa</h2>
                <div class="flex items-center mb-4">
                  <div class="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mr-4">
                    <Icon name="heroicons:building-office-2" class="w-8 h-8 text-gray-500" />
                  </div>
                  <div>
                    <h3 class="text-xl font-bold">{{ excursion.companyName }}</h3>
                    <p class="text-gray-600">Empresa especializada em excursões com hospedagem</p>
                  </div>
                </div>
                <p class="text-gray-700 mb-4">
                  A {{ excursion.companyName }} é uma empresa de turismo com anos de experiência em organizar excursões com hospedagem para diversos destinos. Nosso compromisso é proporcionar experiências inesquecíveis com conforto e segurança.
                </p>
                <NuxtLink :to="`/empresas/${excursion.companyId}`" class="text-primary hover:text-primary-600 font-medium flex items-center">
                  Ver mais excursões desta empresa
                  <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-1" />
                </NuxtLink>
              </div>
            </div>
            
            <!-- Reviews -->
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="p-6">
                <h2 id="avaliacoes" class="text-2xl font-bold mb-4">Avaliações</h2>
                
                <div class="mb-6">
                  <div class="flex items-center mb-2">
                    <div class="flex text-primary mr-2">
                      <Icon v-for="i in 5" :key="i" name="heroicons:star" class="w-5 h-5" :class="i <= 4 ? 'text-primary' : 'text-gray-300'" />
                    </div>
                    <span class="font-bold">4.0</span>
                    <span class="text-gray-600 ml-1">(12 avaliações)</span>
                  </div>
                </div>
                
                <div class="space-y-6">
                  <div v-for="(review, index) in reviews" :key="index" class="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div class="flex items-center mb-2">
                      <img :src="review.avatar" :alt="review.name" class="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <h4 class="font-medium">{{ review.name }}</h4>
                        <p class="text-sm text-gray-500">{{ formatReviewDate(review.date) }}</p>
                      </div>
                    </div>
                    <div class="flex text-primary mb-2">
                      <Icon v-for="i in 5" :key="i" name="heroicons:star" class="w-4 h-4" :class="i <= review.rating ? 'text-primary' : 'text-gray-300'" />
                    </div>
                    <p class="text-gray-700">{{ review.text }}</p>
                  </div>
                </div>
                
                <div v-if="reviews.length > 3" class="mt-6 text-center">
                  <button class="text-primary hover:text-primary-600 font-medium">
                    Ver todas as avaliações
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right column: Booking -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
              <div class="p-6">
                <div class="flex items-center justify-between mb-6">
                  <span class="text-2xl font-bold text-gray-900">R$ {{ excursion.price }}</span>
                  <span class="text-gray-600">por pessoa</span>
                </div>
                
                <form @submit.prevent="handleBooking" class="space-y-4">
                  <div>
                    <label for="participants" class="form-label">Número de Participantes</label>
                    <select 
                      id="participants" 
                      v-model="bookingData.participants" 
                      class="form-input"
                      @change="calculateTotal"
                    >
                      <option v-for="i in 10" :key="i" :value="i" :disabled="i > excursion.availableSpots">
                        {{ i }} {{ i === 1 ? 'pessoa' : 'pessoas' }}
                        {{ i > excursion.availableSpots ? '(indisponível)' : '' }}
                      </option>
                    </select>
                  </div>
                  
                  <div class="bg-gray-50 p-4 rounded-lg">
                    <div class="flex justify-between mb-2">
                      <span>Preço por pessoa</span>
                      <span>R$ {{ excursion.price }}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                      <span>Participantes</span>
                      <span>x {{ bookingData.participants }}</span>
                    </div>
                    <div class="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span>R$ {{ totalPrice }}</span>
                    </div>
                  </div>
                  
                  <NuxtLink 
                    :to="`/reserva/${excursion.id}`" 
                    class="btn btn-primary w-full text-center"
                  >
                    Reservar Agora
                  </NuxtLink>
                  
                  <div v-if="!isLoggedIn" class="text-center text-sm text-gray-600">
                    <NuxtLink to="/login" class="text-primary hover:text-primary-600">Faça login</NuxtLink> 
                    ou 
                    <NuxtLink to="/cadastro" class="text-primary hover:text-primary-600">crie uma conta</NuxtLink> 
                    para reservar
                  </div>
                  
                  <div v-if="bookingError" class="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                    {{ bookingError }}
                  </div>
                </form>
                
                <div class="mt-6 space-y-3">
                  <div class="flex items-center text-gray-600">
                    <Icon name="heroicons:shield-check" class="w-5 h-5 text-primary mr-2" />
                    <span>Pagamento seguro</span>
                  </div>
                  <div class="flex items-center text-gray-600">
                    <Icon name="heroicons:calendar" class="w-5 h-5 text-primary mr-2" />
                    <span>Confirmação imediata</span>
                  </div>
                  <div class="flex items-center text-gray-600">
                    <Icon name="heroicons:chat-bubble-left-right" class="w-5 h-5 text-primary mr-2" />
                    <span>Suporte 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Related excursions -->
      <div class="bg-gray-50 py-16">
        <div class="container-custom">
          <h2 class="text-3xl font-bold mb-8">Excursões Relacionadas</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="excursion in relatedExcursions" :key="excursion.id" class="card group">
              <div class="relative h-48 overflow-hidden">
                <img 
                  :src="getExcursionImage(excursion)" 
                  :alt="excursion.title" 
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div class="absolute top-0 right-0 bg-primary text-white px-3 py-1 m-2 rounded-full text-sm font-medium">
                  {{ getCategoryName(excursion.category) }}
                </div>
              </div>
              
              <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-xl font-bold">{{ excursion.title }}</h3>
                  <span class="text-primary font-bold">R$ {{ excursion.price }}</span>
                </div>
                
                <div class="flex items-center text-gray-600 mb-3">
                  <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
                  <span>{{ excursion.destination }}</span>
                </div>
                
                <div class="flex items-center text-gray-600 mb-4">
                  <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
                  <span>{{ formatDateRange(excursion.startDate, excursion.endDate) }}</span>
                </div>
                
                <NuxtLink :to="`/excursoes/${excursion.id}`" class="btn btn-primary w-full text-center">
                  Ver Detalhes
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useExcursionsStore } from '~/stores/excursions';
import { useReservationsStore } from '~/stores/reservations';
import { useAuthStore } from '~/stores/auth';

const route = useRoute();
const router = useRouter();
const excursionsStore = useExcursionsStore();
const reservationsStore = useReservationsStore();
const authStore = useAuthStore();

const excursionId = route.params.id;
const loading = ref(true);
const error = ref(null);
const selectedImageIndex = ref(0);
const activeSection = ref('sobre');

// Sections for navigation
const sections = [
  { id: 'sobre', name: 'Sobre a Excursão' },
  { id: 'servicos', name: 'Serviços Inclusos' },
  { id: 'hospedagem', name: 'Hospedagem' },
  { id: 'itinerario', name: 'Itinerário' },
  { id: 'informacoes', name: 'Informações Importantes' },
  { id: 'cancelamento', name: 'Política de Cancelamento' },
  { id: 'empresa', name: 'Sobre a Empresa' },
  { id: 'avaliacoes', name: 'Avaliações' }
];

// Booking data
const bookingData = ref({
  participants: 1
});
const bookingLoading = ref(false);
const bookingError = ref(null);
const totalPrice = ref(0);

// Computed properties
const isLoggedIn = computed(() => authStore.isLoggedIn);
const excursion = computed(() => excursionsStore.getExcursionById(excursionId));

const excursionImages = computed(() => {
  if (!excursion.value || !excursion.value.images || excursion.value.images.length === 0) {
    return [getExcursionImage(excursion.value)];
  }
  return excursion.value.images.map(image => {
    if (image.startsWith('/images/')) {
      return `https://source.unsplash.com/random/800x600/?travel,${excursion.value.category}`;
    }
    return image;
  });
});

const mainImage = computed(() => {
  return excursionImages.value[selectedImageIndex.value];
});

// Related excursions (same category)
const relatedExcursions = computed(() => {
  if (!excursion.value) return [];
  
  return excursionsStore.excursions
    .filter(e => e.category === excursion.value.category && e.id !== excursion.value.id)
    .slice(0, 3);
});

// Reviews
const reviews = [
  {
    name: 'Ana Silva',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    rating: 5,
    date: '2025-03-15',
    text: 'Excursão incrível! Tudo muito bem organizado, desde o transporte até a hospedagem. O guia era muito atencioso e conhecedor. Recomendo muito!'
  },
  {
    name: 'Carlos Oliveira',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4,
    date: '2025-03-10',
    text: 'Ótima experiência! A hospedagem era confortável e as atividades muito bem planejadas. Só achei que o tempo livre poderia ser um pouco maior.'
  },
  {
    name: 'Mariana Costa',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    date: '2025-02-28',
    text: 'Levei minha família e todos adoraram! As crianças se divertiram muito e o hotel era excelente. Certamente faremos mais excursões com esta empresa.'
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

const formatReviewDate = (dateString) => {
  const date = new Date(dateString);
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  return `${date.getDate()} de ${months[date.getMonth()]}, ${date.getFullYear()}`;
};

const getCategoryName = (categoryId) => {
  const category = excursionsStore.categories.find(c => c.id === categoryId);
  return category ? category.name : '';
};

const getServiceName = (serviceId) => {
  const service = excursionsStore.additionalServices.find(s => s.id === serviceId);
  return service ? service.name : '';
};

const getServiceIcon = (serviceId) => {
  const serviceIcons = {
    'transporte': 'heroicons:truck',
    'alimentacao': 'heroicons:cake',
    'passeios': 'heroicons:map',
    'guia': 'heroicons:user-group'
  };
  
  return serviceIcons[serviceId] || 'heroicons:check-circle';
};

const getExcursionImage = (excursion) => {
  if (!excursion || !excursion.images || excursion.images.length === 0) {
    return `https://source.unsplash.com/random/800x600/?travel`;
  }
  
  const imagePath = excursion.images[0];
  if (imagePath.startsWith('/images/')) {
    return `https://source.unsplash.com/random/800x600/?travel,${excursion.category}`;
  }
  
  return imagePath;
};

const calculateTotal = () => {
  if (excursion.value) {
    totalPrice.value = excursion.value.price * bookingData.value.participants;
  }
};

const handleBooking = () => {
  if (!isLoggedIn.value) {
    router.push('/login');
    return;
  }
  
  router.push(`/reserva/${excursionId}`);
};

// Scroll to section
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const yOffset = -100; // Offset to account for sticky header
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
    activeSection.value = sectionId;
  }
};

// Update active section based on scroll position
const handleScroll = () => {
  const scrollPosition = window.scrollY + 150; // Add offset for the sticky header
  
  // Find the section that is currently in view
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i].id);
    if (section && section.offsetTop <= scrollPosition) {
      activeSection.value = sections[i].id;
      break;
    }
  }
};

// Fetch data
onMounted(async () => {
  loading.value = true;
  error.value = null;
  
  try {
    await excursionsStore.fetchExcursions();
    
    if (!excursion.value) {
      error.value = 'Excursão não encontrada ou não está mais disponível.';
    } else {
      calculateTotal();
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao carregar os detalhes da excursão.';
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  // Remove scroll event listener
  window.removeEventListener('scroll', handleScroll);
});
</script>
