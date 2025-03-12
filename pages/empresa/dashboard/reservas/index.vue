<template>
  <div>
    <NuxtLayout name="dashboard">
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Gerenciamento de Reservas</h1>
        <div class="flex space-x-2">
          <button class="btn btn-outline flex items-center">
            <Icon name="heroicons:arrow-down-tray" class="w-5 h-5 mr-1" />
            Exportar
          </button>
        </div>
      </div>
      
      <!-- Filters and Search -->
      <div class="bg-white rounded-lg shadow-md p-4 mb-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div class="flex items-center space-x-4">
            <div>
              <select v-model="statusFilter" class="form-input py-2">
                <option value="all">Todos os status</option>
                <option value="pending">Aguardando confirmação</option>
                <option value="confirmed">Confirmada</option>
                <option value="completed">Concluída</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>
            <div>
              <select v-model="excursionFilter" class="form-input py-2">
                <option value="all">Todas as excursões</option>
                <option v-for="excursion in excursions" :key="excursion.id" :value="excursion.id">
                  {{ excursion.title }}
                </option>
              </select>
            </div>
          </div>
          
          <div class="relative">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Buscar por nome ou ID..." 
              class="form-input pl-10 pr-4 py-2 w-full md:w-64"
            />
            <Icon 
              name="heroicons:magnifying-glass" 
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
            />
          </div>
        </div>
      </div>
      
      <!-- Reservations Table -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reserva
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Excursão
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
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
              <tr v-for="reservation in filteredReservations" :key="reservation.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">#{{ reservation.id }}</div>
                  <div class="text-sm text-gray-500">{{ formatDate(reservation.createdAt) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Icon name="heroicons:user" class="h-4 w-4 text-gray-500" />
                    </div>
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">{{ reservation.userName || 'Cliente' }}</div>
                      <div class="text-sm text-gray-500">{{ reservation.participants }} {{ reservation.participants > 1 ? 'pessoas' : 'pessoa' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ reservation.excursionTitle }}</div>
                  <div class="text-sm text-gray-500">{{ getExcursionDestination(reservation.excursionId) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDateRange(reservation.startDate, reservation.endDate) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  R$ {{ reservation.totalPrice }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="getStatusClass(reservation.status)">
                    {{ getStatusText(reservation.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <button 
                      v-if="reservation.status === 'pending'" 
                      @click="confirmReservation(reservation.id)" 
                      class="text-green-500 hover:text-green-700"
                      title="Confirmar"
                    >
                      <Icon name="heroicons:check" class="w-5 h-5" />
                    </button>
                    <button 
                      @click="viewReservation(reservation.id)" 
                      class="text-primary hover:text-primary-600" 
                      title="Ver detalhes"
                    >
                      <Icon name="heroicons:eye" class="w-5 h-5" />
                    </button>
                    <button 
                      v-if="reservation.status !== 'cancelled' && reservation.status !== 'completed'" 
                      @click="cancelReservation(reservation.id)" 
                      class="text-red-500 hover:text-red-700"
                      title="Cancelar"
                    >
                      <Icon name="heroicons:x-mark" class="w-5 h-5" />
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
                  Mostrando <span class="font-medium">1</span> a <span class="font-medium">10</span> de <span class="font-medium">{{ reservations.length }}</span> resultados
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
import { useReservationsStore } from '~/stores/reservations';
import { useExcursionsStore } from '~/stores/excursions';
import { useAuthStore } from '~/stores/auth';

const router = useRouter();
const reservationsStore = useReservationsStore();
const excursionsStore = useExcursionsStore();
const authStore = useAuthStore();

// Filters
const statusFilter = ref('all');
const excursionFilter = ref('all');
const searchQuery = ref('');

// Get data from stores
const excursions = computed(() => excursionsStore.excursions);
const reservations = ref([]);

// Filtered reservations
const filteredReservations = computed(() => {
  let result = [...reservations.value];
  
  // Apply status filter
  if (statusFilter.value !== 'all') {
    result = result.filter(reservation => reservation.status === statusFilter.value);
  }
  
  // Apply excursion filter
  if (excursionFilter.value !== 'all') {
    result = result.filter(reservation => reservation.excursionId === excursionFilter.value);
  }
  
  // Apply search query
  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(reservation => 
      (reservation.userName && reservation.userName.toLowerCase().includes(query)) ||
      reservation.id.toString().includes(query) ||
      (reservation.userEmail && reservation.userEmail.toLowerCase().includes(query))
    );
  }
  
  return result;
});

// Helper methods
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

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

const getExcursionDestination = (excursionId) => {
  const excursion = excursions.value.find(e => e.id === excursionId);
  return excursion ? excursion.destination : '';
};

const getStatusText = (status) => {
  const statusMap = {
    'pending': 'Aguardando confirmação',
    'confirmed': 'Confirmada',
    'completed': 'Concluída',
    'cancelled': 'Cancelada'
  };
  
  return statusMap[status] || status;
};

const getStatusClass = (status) => {
  const statusClasses = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-green-100 text-green-800',
    'completed': 'bg-blue-100 text-blue-800',
    'cancelled': 'bg-red-100 text-red-800'
  };
  
  return statusClasses[status] || 'bg-gray-100 text-gray-800';
};

// Actions
const confirmReservation = async (reservationId) => {
  if (confirm('Confirmar esta reserva?')) {
    try {
      await reservationsStore.updateReservationStatus(reservationId, 'confirmed');
      
      // Update local state
      const index = reservations.value.findIndex(r => r.id === reservationId);
      if (index !== -1) {
        reservations.value[index].status = 'confirmed';
      }
    } catch (error) {
      console.error('Error confirming reservation:', error);
      alert('Erro ao confirmar reserva. Por favor, tente novamente.');
    }
  }
};

const cancelReservation = async (reservationId) => {
  if (confirm('Tem certeza que deseja cancelar esta reserva?')) {
    try {
      await reservationsStore.updateReservationStatus(reservationId, 'cancelled');
      
      // Update local state
      const index = reservations.value.findIndex(r => r.id === reservationId);
      if (index !== -1) {
        reservations.value[index].status = 'cancelled';
      }
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      alert('Erro ao cancelar reserva. Por favor, tente novamente.');
    }
  }
};

// View reservation details
const viewReservation = (reservationId) => {
  router.push(`/empresa/dashboard/reservas/${reservationId}`);
};

// Fetch data on component mount
onMounted(async () => {
  try {
    await excursionsStore.fetchExcursions();
    
    // Get company ID from auth store
    const companyId = authStore.user?.id || '1';
    
    // Fetch reservations for this company
    const companyReservations = await reservationsStore.fetchCompanyReservations(companyId);
    reservations.value = companyReservations;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>
