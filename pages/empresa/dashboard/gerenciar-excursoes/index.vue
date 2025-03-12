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
                    <button @click="editExcursion(excursion.id)" class="text-primary hover:text-primary-600" title="Editar">
                      <Icon name="heroicons:pencil-square" class="w-5 h-5" />
                    </button>
                    <button @click="viewExcursion(excursion.id)" class="text-gray-500 hover:text-gray-700" title="Ver detalhes">
                      <Icon name="heroicons:eye" class="w-5 h-5" />
                    </button>
                    <button @click="confirmDeleteExcursion(excursion.id)" class="text-red-500 hover:text-red-700" title="Excluir">
                      <Icon name="heroicons:trash" class="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredExcursions.length === 0" class="py-12 text-center">
          <Icon name="heroicons:map" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhuma excursão encontrada</h3>
          <p class="text-gray-500 mb-6">
            Você ainda não cadastrou nenhuma excursão ou não há excursões que correspondam aos filtros selecionados.
          </p>
          <button @click="navigateToNewExcursion" class="btn btn-primary">
            Cadastrar Nova Excursão
          </button>
        </div>
        
        <!-- Pagination -->
        <div v-if="filteredExcursions.length > 0" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div class="flex items-center justify-between">
            <div class="flex-1 flex justify-between sm:hidden">
              <button 
                @click="prevPage" 
                :disabled="currentPage === 1" 
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                :class="{'opacity-50 cursor-not-allowed': currentPage === 1}"
              >
                Anterior
              </button>
              <button 
                @click="nextPage" 
                :disabled="currentPage === totalPages" 
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                :class="{'opacity-50 cursor-not-allowed': currentPage === totalPages}"
              >
                Próxima
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Mostrando <span class="font-medium">{{ startItem }}</span> a <span class="font-medium">{{ endItem }}</span> de <span class="font-medium">{{ filteredExcursions.length }}</span> resultados
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button 
                    @click="prevPage" 
                    :disabled="currentPage === 1" 
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    :class="{'opacity-50 cursor-not-allowed': currentPage === 1}"
                  >
                    <span class="sr-only">Anterior</span>
                    <Icon name="heroicons:chevron-left" class="h-5 w-5" />
                  </button>
                  
                  <button 
                    v-for="page in displayedPages" 
                    :key="page" 
                    @click="goToPage(page)" 
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium"
                    :class="currentPage === page ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                  >
                    {{ page }}
                  </button>
                  
                  <button 
                    @click="nextPage" 
                    :disabled="currentPage === totalPages" 
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    :class="{'opacity-50 cursor-not-allowed': currentPage === totalPages}"
                  >
                    <span class="sr-only">Próxima</span>
                    <Icon name="heroicons:chevron-right" class="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="font-bold text-lg">Confirmar Exclusão</h3>
          </div>
          
          <div class="p-6">
            <p class="mb-4">Tem certeza que deseja excluir esta excursão? Esta ação não pode ser desfeita.</p>
            <p class="text-red-600 mb-6">Atenção: Todas as reservas associadas a esta excursão também serão excluídas.</p>
            
            <div class="flex justify-end space-x-3">
              <button 
                type="button" 
                class="btn btn-outline" 
                @click="showDeleteModal = false"
              >
                Cancelar
              </button>
              <button 
                type="button" 
                class="btn bg-red-600 hover:bg-red-700 text-white"
                @click="deleteExcursion"
              >
                Excluir
              </button>
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
import { useAuthStore } from '~/stores/auth';

const router = useRouter();
const excursionsStore = useExcursionsStore();
const authStore = useAuthStore();

// Pagination
const currentPage = ref(1);
const itemsPerPage = 10;

// Filters
const statusFilter = ref('all');
const dateFilter = ref('all');
const searchQuery = ref('');

// Modal state
const showDeleteModal = ref(false);
const excursionToDelete = ref(null);

// Get excursions from store
const excursions = computed(() => {
  // In a real app, you would filter by company ID
  const companyId = authStore.user?.id || '1';
  return excursionsStore.excursions.filter(excursion => excursion.companyId === companyId);
});

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

// Paginated excursions
const paginatedExcursions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredExcursions.value.slice(start, end);
});

// Pagination computed properties
const totalPages = computed(() => {
  return Math.ceil(filteredExcursions.value.length / itemsPerPage);
});

const startItem = computed(() => {
  return filteredExcursions.value.length === 0 ? 0 : (currentPage.value - 1) * itemsPerPage + 1;
});

const endItem = computed(() => {
  return Math.min(currentPage.value * itemsPerPage, filteredExcursions.value.length);
});

const displayedPages = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;
  
  if (totalPages.value <= maxPagesToShow) {
    // Show all pages
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // Show a subset of pages
    if (currentPage.value <= 3) {
      // Show first 5 pages
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
    } else if (currentPage.value >= totalPages.value - 2) {
      // Show last 5 pages
      for (let i = totalPages.value - 4; i <= totalPages.value; i++) {
        pages.push(i);
      }
    } else {
      // Show current page and 2 pages before and after
      for (let i = currentPage.value - 2; i <= currentPage.value + 2; i++) {
        pages.push(i);
      }
    }
  }
  
  return pages;
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
  
  return occupancyMap[excursion.id] || `0/${excursion.availableSpots}`;
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

// Pagination methods
const goToPage = (page) => {
  currentPage.value = page;
  window.scrollTo(0, 0);
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    window.scrollTo(0, 0);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo(0, 0);
  }
};

// Action methods
const navigateToNewExcursion = () => {
  router.push('/empresa/dashboard/gerenciar-excursoes/nova');
};

const editExcursion = (excursionId) => {
  router.push(`/empresa/dashboard/gerenciar-excursoes/editar/${excursionId}`);
};

const viewExcursion = (excursionId) => {
  router.push(`/empresa/dashboard/gerenciar-excursoes/${excursionId}`);
};

const confirmDeleteExcursion = (excursionId) => {
  excursionToDelete.value = excursionId;
  showDeleteModal.value = true;
};

const deleteExcursion = async () => {
  try {
    // In a real app, this would call an API to delete the excursion
    // For now, we'll just remove it from the store
    
    // Check if there are reservations for this excursion
    // This would be handled by the backend in a real app
    
    // Remove from store
    await excursionsStore.deleteExcursion(excursionToDelete.value);
    
    // Close modal
    showDeleteModal.value = false;
    excursionToDelete.value = null;
    
    // Reset to first page if needed
    if (currentPage.value > 1 && paginatedExcursions.value.length === 0) {
      currentPage.value = 1;
    }
  } catch (error) {
    console.error('Error deleting excursion:', error);
    alert('Erro ao excluir excursão. Por favor, tente novamente.');
  }
};

// Fetch data on component mount
onMounted(async () => {
  await excursionsStore.fetchExcursions();
});
</script>
