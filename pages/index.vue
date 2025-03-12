<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gray-900 text-white">
      <div
        class="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"
      ></div>
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="
          background-image: url('https://images.unsplash.com/photo-1496566084516-c5b96fcbd5c8?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
        "
      ></div>

      <div class="container-custom relative z-20 py-20 md:py-32">
        <div class="max-w-2xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            As melhores viagens <br />
            esperam por você!
          </h1>
          <p class="text-xl mb-8">
            Compare roteiros, encontre a melhor opção <br />
            e viaje sem complicações.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink
              to="/excursoes"
              class="btn bg-primary hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-lg text-center"
            >
              Explorar Excursões
            </NuxtLink>
            <NuxtLink
              to="/como-funciona"
              class="btn bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium px-6 py-3 rounded-lg text-center"
            >
              Como Funciona
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <section class="bg-white py-8">
      <div class="container-custom">
        <div class="bg-white rounded-lg shadow-lg p-6 -mt-16 relative z-30">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="form-label">Qual o destino?</label>
              <input
                type="text"
                v-model="searchDestination"
                placeholder="Para onde você quer ir?"
                class="form-input"
              />
            </div>

            <div>
              <label class="form-label">De onde você quer sair?</label>
              <input
                type="text"
                v-model="searchOrigin"
                placeholder="Cidade de origem"
                class="form-input"
              />
            </div>

            <div>
              <label class="form-label">Quando você quer viajar?</label>
              <select v-model="selectedMonth" class="form-input">
                <option value="">Qualquer mês</option>
                <option
                  v-for="(month, index) in months"
                  :key="index"
                  :value="index"
                >
                  {{ month }}
                </option>
              </select>
            </div>

            <div class="flex items-end">
              <button @click="searchExcursions" class="btn btn-primary w-full">
                <Icon name="heroicons:magnifying-glass" class="w-5 h-5 mr-2" />
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Excursions -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <h2 class="text-3xl font-bold mb-2 text-center">
          Excursões em Destaque
        </h2>
        <p class="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Encontre a excursão perfeita e explore destinos incríveis com
          praticidade e economia.
        </p>

        <div v-if="loading" class="flex justify-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
          ></div>
        </div>

        <div v-else-if="error" class="text-center text-red-500">
          {{ error }}
        </div>

        <div v-else class="relative">
          <swiper
            :slides-per-view="1"
            :space-between="20"
            :pagination="{ clickable: true }"
            :navigation="true"
            :breakpoints="{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }"
            class="excursions-swiper"
          >
            <swiper-slide
              v-for="excursion in featuredExcursions"
              :key="excursion.id"
            >
              <div
                class="card group h-[470px] flex flex-col shadow-xl rounded-lg overflow-hidden"
              >
                <!-- Imagem -->
                <div class="relative h-48 overflow-hidden">
                  <img
                    :src="getExcursionImage(excursion)"
                    :alt="excursion.title"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <!-- Nome da Agência (Canto Superior Esquerdo) -->
                  <div
                    class="absolute top-0 left-0 bg-black bg-opacity-50 text-white px-3 py-1 m-2 rounded-full text-sm font-medium"
                  >
                    {{ excursion.companyName }}
                  </div>
                  <!-- Categoria (Canto Superior Direito) -->
                  <div
                    class="absolute top-0 right-0 bg-primary text-white px-3 py-1 m-2 rounded-full text-sm font-medium"
                  >
                    {{ getCategoryName(excursion.category) }}
                  </div>
                </div>

                <!-- Conteúdo do Card -->
                <div class="p-6 flex flex-col flex-grow">
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-bold">{{ excursion.title }}</h3>
                  </div>

                  <div class="flex items-center text-gray-600 mb-2">
                    <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
                    <span>{{ excursion.destination }}</span>
                  </div>

                  <div class="flex items-center text-gray-600 mb-2">
                    <Icon name="heroicons:truck" class="w-4 h-4 mr-1" />
                    <span>Saindo de: {{ excursion.originCity }}</span>
                  </div>

                  <div class="flex items-center text-gray-600 mb-4">
                    <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
                    <span>{{
                      formatDateRange(excursion.startDate, excursion.endDate)
                    }}</span>
                  </div>

                  <!-- Tags -->
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span
                      v-for="service in excursion.includedServices.slice(0, 3)"
                      :key="service"
                      class="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs whitespace-nowrap"
                    >
                      {{ getServiceName(service) }}
                    </span>
                  </div>

                  <div class="flex justify-between items-center mt-auto">
                    <!-- Preço -->
                    <!--  <span class="text-primary font-bold text-lg">R$ {{ excursion.price }}</span>-->

                    <div class="flex flex-col">
                      <span class="text-gray-600 text-sm">A partir de</span>
                      <div>
                        <span class="text-xl font-bold text-primary"
                          >R$ {{ excursion.price }}</span
                        >
                        <span class="text-gray-600 text-sm ml-2"
                          >/ por pessoa</span
                        >
                      </div>
                    </div>

                    <!-- Botão -->
                    <NuxtLink
                      :to="`/excursoes/${excursion.id}`"
                      class="btn btn-primary"
                    >
                      Ver Detalhes
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>

          <div class="swiper-button-prev !text-primary after:!text-lg"></div>
          <div class="swiper-button-next !text-primary after:!text-lg"></div>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/excursoes" class="btn btn-outline">
            Ver Todas as Excursões
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Popular Destinations Section -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <h2 class="text-3xl font-bold mb-2 text-center">
          Destinos Mais Procurados
        </h2>
        <p class="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Descubra os destinos favoritos dos nossos viajantes e planeje sua
          próxima aventura
        </p>

        <div v-if="loading" class="flex justify-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
          ></div>
        </div>

        <div v-else class="relative">
          <swiper
            :slides-per-view="1"
            :space-between="20"
            :pagination="{ clickable: true }"
            :navigation="true"
            :breakpoints="{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }"
            class="destinations-swiper"
          >
            <swiper-slide
              v-for="destination in popularDestinations"
              :key="destination.id"
            >
              <div
                class="bg-white rounded-lg shadow-md overflow-hidden group h-full"
              >
                <div class="relative h-60 overflow-hidden">
                  <img
                    :src="destination.image"
                    :alt="destination.name"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"
                  ></div>
                  <div class="absolute bottom-0 left-0 right-0 p-4">
                    <h3 class="text-2xl font-bold text-white">
                      {{ destination.name }}
                    </h3>
                    <div class="flex items-center text-white/90">
                      <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
                      <span>{{ destination.state }}</span>
                    </div>
                  </div>
                </div>

                <div class="p-6 flex flex-col h-[calc(100%-15rem)]">
                  <p class="text-gray-700 mb-4 line-clamp-3">
                    {{ destination.shortDescription }}
                  </p>

                  <div class="flex flex-wrap gap-2 mb-4">
                    <span
                      v-for="tag in destination.tags.slice(0, 3)"
                      :key="tag"
                      class="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                    >
                      {{ tag }}
                    </span>
                  </div>

                  <div class="flex items-center justify-between mb-4 mt-auto">
                    <div class="flex items-center text-gray-600">
                      <Icon name="heroicons:calendar" class="w-5 h-5 mr-1" />
                      <span>{{ destination.excursionsCount }} excursões</span>
                    </div>
                    <div class="flex items-center text-gray-600">
                      <span class="font-medium">A partir de</span>
                      <span class="text-primary font-bold ml-1"
                        >R$ {{ destination.minPrice }}</span
                      >
                    </div>
                  </div>

                  <NuxtLink
                    :to="`/destinos/${destination.slug}`"
                    class="btn btn-primary w-full text-center"
                  >
                    Ver Destino
                  </NuxtLink>
                </div>
              </div>
            </swiper-slide>
          </swiper>

          <div class="swiper-button-prev !text-primary after:!text-lg"></div>
          <div class="swiper-button-next !text-primary after:!text-lg"></div>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/destinos" class="btn btn-outline">
            Ver Todos os Destinos
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <h2 class="text-3xl font-bold mb-2 text-center">Como Funciona</h2>
        <p class="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Encontrar e reservar sua próxima viagem com hospedagem nunca foi tão fácil.
        </p>

        <!-- For Travelers -->
      <div class="mb-20">
        
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <div class="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="heroicons:magnifying-glass" class="w-8 h-8 text-primary" />
          </div>
          <h3 class="text-xl font-bold mb-3">1. Busque</h3>
          <p class="text-gray-700">
            Utilize nossos filtros para encontrar pacote de viagens por mês, categoria, destino ou serviços inclusos. Veja todas as informações detalhadas sobre cada pacote.
          </p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <div class="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="heroicons:ticket" class="w-8 h-8 text-primary" />
          </div>
          <h3 class="text-xl font-bold mb-3">2. Reserve</h3>
          <p class="text-gray-700">
            Escolha o pacote ideal, selecione o número de participantes e faça sua reserva de forma segura, com diversas opções de pagamento.
          </p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-8 text-center">
          <div class="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="heroicons:map" class="w-8 h-8 text-primary" />
          </div>
          <h3 class="text-xl font-bold mb-3">3. Viaje</h3>
          <p class="text-gray-700">
            Receba sua confirmação e todas as informações necessárias. Aproveite sua viagem com os serviços inclusos e com todo apoio da Viajaê, sem preocupações.
          </p>
        </div>
      </div>
      
    </div>

        <div class="text-center mt-12">
          <NuxtLink to="/como-funciona" class="btn btn-outline">
            Saiba Mais
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <h2 class="text-3xl font-bold mb-2 text-center">
          Categorias de Excursões
        </h2>
        <p class="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Explore nossas excursões por categoria e encontre a experiência
          perfeita para você.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="`/excursoes?categoria=${category.id}`"
            class="relative h-40 rounded-lg overflow-hidden group"
          >
            <div
              class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"
            ></div>
            <img
              :src="getCategoryImage(category.id)"
              :alt="category.name"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 class="text-white font-bold text-xl">{{ category.name }}</h3>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <h2 class="text-3xl font-bold mb-2 text-center">
          O que Dizem Nossos Clientes
        </h2>
        <p class="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Veja as experiências de quem já viajou com a Viajae.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="bg-white p-6 rounded-lg shadow-md"
          >
            <div class="flex items-center mb-4">
              <div class="flex text-primary">
                <Icon
                  v-for="i in 5"
                  :key="i"
                  name="heroicons:star"
                  class="w-5 h-5"
                  :class="
                    i <= testimonial.rating ? 'text-primary' : 'text-gray-300'
                  "
                />
              </div>
            </div>
            <p class="text-gray-700 mb-4">{{ testimonial.text }}</p>
            <div class="flex items-center">
              <img
                :src="testimonial.avatar"
                :alt="testimonial.name"
                class="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h4 class="font-medium">{{ testimonial.name }}</h4>
                <p class="text-sm text-gray-500">{{ testimonial.excursion }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-[#005655]">
      <div class="container-custom text-center">
        <h2 class="text-3xl font-bold mb-4 text-white">
          Pronto para sua próxima aventura?
        </h2>
        <p class="text-white/90 mb-8 max-w-2xl mx-auto">
          Encontre excursões com hospedagem para todos os gostos e bolsos.
          Reserve agora e garanta sua vaga!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/excursoes"
            class="btn bg-white text-primary hover:bg-gray-100 font-medium px-6 py-3 rounded-lg"
          >
            Explorar Excursões
          </NuxtLink>
          <NuxtLink
            to="/cadastro"
            class="btn bg-primary-600 text-white hover:bg-primary-700 font-medium px-6 py-3 rounded-lg border border-white/20"
          >
            Criar Conta
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- For Companies -->
    <section class="py-16 bg-gray-50">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-4">Para Empresas de Turismo</h2>
            <p class="text-gray-600 mb-6">
              Você é uma empresa de turismo que organiza excursões com
              hospedagem? Cadastre-se na Viajae e amplie seu alcance!
            </p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-start">
                <Icon
                  name="heroicons:check-circle"
                  class="w-6 h-6 text-primary mr-2 flex-shrink-0"
                />
                <span>Cadastre suas excursões com todos os detalhes</span>
              </li>
              <li class="flex items-start">
                <Icon
                  name="heroicons:check-circle"
                  class="w-6 h-6 text-primary mr-2 flex-shrink-0"
                />
                <span>Gerencie reservas e pagamentos em um só lugar</span>
              </li>
              <li class="flex items-start">
                <Icon
                  name="heroicons:check-circle"
                  class="w-6 h-6 text-primary mr-2 flex-shrink-0"
                />
                <span>Aumente sua visibilidade e alcance novos clientes</span>
              </li>
              <li class="flex items-start">
                <Icon
                  name="heroicons:check-circle"
                  class="w-6 h-6 text-primary mr-2 flex-shrink-0"
                />
                <span>Receba avaliações e construa sua reputação</span>
              </li>
            </ul>
            <NuxtLink to="/empresas" class="btn btn-primary">
              Saiba Mais
            </NuxtLink>
          </div>
          <div class="rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Para empresas"
              class="w-full h-full object-cover"
            />
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
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const excursionsStore = useExcursionsStore();
const destinationsStore = useDestinationsStore();
const loading = computed(
  () => excursionsStore.loading || destinationsStore.loading
);
const error = computed(() => excursionsStore.error || destinationsStore.error);

// Search inputs
const searchDestination = ref('');
const searchOrigin = ref('');
const selectedMonth = ref('');
const selectedCategory = ref('');

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const categories = computed(() => excursionsStore.categories);

// Featured excursions
const featuredExcursions = computed(() => {
  return excursionsStore.excursions;
});

// Popular destinations
const popularDestinations = computed(() => {
  return destinationsStore.popularDestinations;
});

// Testimonials
const testimonials = [
  {
    name: 'Ana Silva',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    text: 'Minha experiência com a excursão para Ilhabela foi incrível! Tudo organizado, desde o transporte até a hospedagem. Recomendo muito!',
    rating: 5,
    excursion: 'Fim de Semana em Ilhabela',
  },
  {
    name: 'Carlos Oliveira',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'A viagem para a Serra da Mantiqueira superou minhas expectativas. Os guias eram muito conhecedores e a hospedagem era confortável.',
    rating: 4,
    excursion: 'Expedição Serra da Mantiqueira',
  },
  {
    name: 'Mariana Costa',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Levei minha família para o Thermas dos Laranjais e foi uma experiência inesquecível. As crianças adoraram e o hotel era excelente!',
    rating: 5,
    excursion: 'Thermas dos Laranjais',
  },
];

// Methods
const searchExcursions = () => {
  const query = {};

  if (searchDestination.value.trim()) {
    query.destino = searchDestination.value.trim();
  }

  if (searchOrigin.value.trim()) {
    query.origem = searchOrigin.value.trim();
  }

  if (selectedMonth.value) {
    query.mes = selectedMonth.value;
  }

  if (selectedCategory.value) {
    query.categoria = selectedCategory.value;
  }

  navigateTo({
    path: '/excursoes',
    query,
  });
};

const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startDay = start.getDate();
  const endDay = end.getDate();
  const month = months[start.getMonth()];
  const year = start.getFullYear();

  return `${startDay} a ${endDay} de ${month}, ${year}`;
};

const getCategoryName = (categoryId) => {
  const category = categories.value.find((c) => c.id === categoryId);
  return category ? category.name : '';
};

const getServiceName = (serviceId) => {
  const service = excursionsStore.additionalServices.find(
    (s) => s.id === serviceId
  );
  return service ? service.name : '';
};

const getExcursionImage = (excursion) => {
  // Use placeholder images if the actual images are not available
  if (!excursion.images || excursion.images.length === 0) {
    return `https://source.unsplash.com/random/800x600/?travel,${excursion.category}`;
  }

  // Check if the image path exists, otherwise use a placeholder
  const imagePath = excursion.images[0];
  if (imagePath.startsWith('/images/')) {
    // Replace with placeholder for demo purposes
    return `https://source.unsplash.com/random/800x600/?travel,${excursion.category}`;
  }

  return imagePath;
};

const getCategoryImage = (categoryId) => {
  // Map category IDs to appropriate placeholder images
  const categoryImages = {
    praia:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
    'parque-aquatico':
      'https://images.unsplash.com/photo-1582553081653-f515f2a9f2ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    serra:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    cultural:
      'https://images.unsplash.com/photo-1551009175-15bdf9dcb580?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    aventura:
      'https://images.unsplash.com/photo-1533130061792-64b345e4a833?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  };

  return (
    categoryImages[categoryId] ||
    `https://source.unsplash.com/random/800x600/?travel,${categoryId}`
  );
};

onMounted(async () => {
  await Promise.all([
    excursionsStore.fetchExcursions(),
    destinationsStore.fetchDestinations(),
  ]);
});
</script>

<style>
.destinations-swiper,
.excursions-swiper {
  padding-bottom: 50px !important;
}

.swiper-pagination-bullet-active {
  background-color: #01db87 !important;
}

.swiper-button-next,
.swiper-button-prev {
  color: #01db87 !important;
}

.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 24px !important;
  font-weight: bold;
}
</style>
