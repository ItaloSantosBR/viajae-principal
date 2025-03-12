<template>
  <div>
    <NuxtLayout name="dashboard">
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Gerenciamento de Excursões</h1>
        <button @click="navigateToNewExcursion" class="btn btn-primary flex items-center">
          <Icon name="heroicons:plus" class="w-5 h-5 mr-1" />
          Nova Excursão
        </button>
      </div>
      
      <!-- Filters and Search -->
      <div class="bg-white rounded-lg shadow-md p-4 mb-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div class="flex items-center space-x-4">
            <div>
              <select v-model="statusFilter" class="form-input py-2">
                <option value="all">Todos os status</option>
                <option value="active">Ativas</option>
                <option value="upcoming">Futuras</option>
                <option value="completed">Concluídas</option>
                <option value="cancelled">Canceladas</option>
              </select>
            </div>
            <div>
              <select v-model="dateFilter" class="form-input py-2">
                <option value="all">Todas as datas</option>
                <option value="this-month">Este mês</option>
                <option value="next-month">Próximo mês</option>
                <option value="next-3-months">Próximos 3 meses</option>
              </select>
            </div>
          </div>
          
          <div class="relative">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Buscar excursões..." 
              class="form-input pl-10 pr-4 py-2 w-full md:w-64"
            />
            <Icon 
              name="heroicons:magnifying-glass" 
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
            />
          </div>
        </div>
      </div>
      
      <!-- Excursions Table -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Excursão
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destino
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ocupação
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="excursion in filteredExcursions" :key="excursion.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                      <img :src="getExcursionImage(excursion)" :alt="excursion.title" class="h-10 w-10 object-cover" />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ excursion.title }}</div>
                      <div class="text-sm text-gray-500">ID: {{ excursion.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ excursion.destination }}</div>
                  <div class="text-sm text-gray-500">{{ excursion.originCity }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDateRange(excursion.startDate, excursion.endDate) }}</div>
                  <div class="text-sm text-gray-500">{{ getDurationDays(excursion.startDate, excursion.endDate) }} dias</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  R$ {{ excursion.price }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ getOccupancy(excursion) }}</div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-primary rounded-full h-2" :style="`width: ${getOccupancyPercentage(excursion)}%`"></div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="getStatusClass(excursion)">
                    {{ getStatusText(excursion) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <button class="text-primary hover:text-primary-600">
                      <Icon name="heroicons:pencil-square" class="w-5 h-5" />
                    </button>
                    <button class="text-gray-500 hover:text-gray-700">
                      <Icon name="heroicons:eye" class="w-5 h-5" />
                    </button>
                    <button class="text-red-500 hover:text-red-700">
                      <Icon name="heroicons:trash" class="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
                  Mostrando <span class="font-medium">1</span> a <span class="font-medium">10</span> de <span class="font-medium">{{ excursions.length }}</span> resultados
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
import { ref, computed, onMounted } from 'vue';
import { useExcursionsStore } from '~/stores/excursions';

const router = useRouter();
const excursionsStore = useExcursionsStore();

// Filters
const statusFilter = ref('all');
const dateFilter = ref('all');
const searchQuery = ref('');

// Get excursions from store
const excursions = computed(() => excursionsStore.excursions);

// Filtered excursions
const filteredExcursions = computed(() => {
  let result = [...excursions.value];
  
  // Apply status filter
  if (statusFilter.value !== 'all') {
    result = result.filter(excursion => {
      const now = new Date();
      const startDate = new Date(excursion.startDate);
      const endDate = new Date(excursion.endDate);
      
      switch (statusFilter.value) {
        case 'active':
          return startDate <= now && endDate >= now;
        case 'upcoming':
          return startDate > now;
        case 'completed':
          return endDate < now;
        case 'cancelled':
          return excursion.status === 'cancelled';
        default:
          return true;
      }
    });
  }
  
  // Apply date filter
  if (dateFilter.value !== 'all') {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const nextThreeMonths = new Date(now.getFullYear(), now.getMonth() + 3, 1);
    
    result = result.filter(excursion => {
      const startDate = new Date(excursion.startDate);
      
      switch (dateFilter.value) {
        case 'this-month':
          return startDate.getMonth() === now.getMonth() && startDate.getFullYear() === now.getFullYear();
        case 'next-month':
          return startDate.getMonth() === nextMonth.getMonth() && startDate.getFullYear() === nextMonth.getFullYear();
        case 'next-3-months':
          return startDate >= now && startDate < nextThreeMonths;
        default:
          return true;
      }
    });
  }
  
  // Apply search query
  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(excursion => 
      excursion.title.toLowerCase().includes(query) ||
      excursion.destination.toLowerCase().includes(query) ||
      excursion.id.toString().includes(query)
    );
  }
  
  return result;
});

// Helper methods
const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const startDay = start.getDate();
  const endDay = end.getDate();
  const startMonth = start.toLocaleDateString('pt-BR', { month: 'short' });
  const endMonth = end.toLocaleDateString('pt-BR', { month: 'short' });
  const year = start.getFullYear();
  
  if (startMonth === endMonth) {
    return `${startDay}-${endDay} ${startMonth} ${year}`;
  } else {
    return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
  }
};

const getDurationDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Including the start day
};

const getExcursionImage = (excursion) => {
  if (!excursion.images || excursion.images.length === 0) {
    return `https://source.unsplash.com/random/100x100/?travel,${excursion.category}`;
  }
  
  const imagePath = excursion.images[0];
  if (imagePath.startsWith('/images/')) {
    return `https://source.unsplash.com/random/100x100/?travel,${excursion.category}`;
  }
  
  return imagePath;
};

const getOccupancy = (excursion) => {
  // In a real app, this would come from the reservation data
  // For now, we'll use mock data
  const occupancyMap = {
    '1': '16/20',
    '2': '8/15',
    '3': '18/30',
    '4': '23/25',
    '5': '8/18'
  };
  
  return occupancyMap[excursion.id] || '0/0';
};

const getOccupancyPercentage = (excursion) => {
  const occupancy = getOccupancy(excursion);
  const [reserved, total] = occupancy.split('/').map(Number);
  return (reserved / total) * 100;
};

const getStatusText = (excursion) => {
  const now = new Date();
  const startDate = new Date(excursion.startDate);
  const endDate = new Date(excursion.endDate);
  
  if (excursion.status === 'cancelled') {
    return 'Cancelada';
  } else if (endDate < now) {
    return 'Concluída';
  } else if (startDate <= now && endDate >= now) {
    return 'Ativa';
  } else {
    return 'Futura';
  }
};

const getStatusClass = (excursion) => {
  const status = getStatusText(excursion);
  
  switch (status) {
    case 'Ativa':
      return 'bg-green-100 text-green-800';
    case 'Futura':
      return 'bg-blue-100 text-blue-800';
    case 'Concluída':
      return 'bg-gray-100 text-gray-800';
    case 'Cancelada':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Navigation function
const navigateToNewExcursion = () => {
  router.push('/empresa/dashboard/excursoes/nova');
};

// Fetch excursions on component mount
onMounted(async () => {
  await excursionsStore.fetchExcursions();
});
</script>
