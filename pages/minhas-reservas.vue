<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="container-custom">
      <h1 class="text-3xl font-bold mb-8">Minhas Reservas</h1>
      
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="bg-red-50 text-red-600 p-6 rounded-lg">
        <Icon name="heroicons:exclamation-circle" class="w-12 h-12 mx-auto mb-4" />
        <h2 class="text-xl font-bold mb-2 text-center">Erro ao carregar reservas</h2>
        <p class="text-center">{{ error }}</p>
      </div>
      
      <!-- No reservations -->
      <div v-else-if="reservations.length === 0" class="bg-white rounded-lg shadow-md p-8 text-center">
        <Icon name="heroicons:ticket" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 class="text-xl font-bold mb-2">Nenhuma reserva encontrada</h2>
        <p class="text-gray-600 mb-6">
          Você ainda não fez nenhuma reserva de excursão.
        </p>
        <NuxtLink to="/excursoes" class="btn btn-primary">
          Explorar Excursões
        </NuxtLink>
      </div>
      
      <!-- Reservations list -->
      <div v-else>
        <!-- Filters -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div class="flex items-center space-x-4">
              <h2 class="text-lg font-bold">Filtrar por:</h2>
              <div>
                <select 
                  v-model="statusFilter" 
                  class="form-input py-2"
                  @change="applyFilters"
                >
                  <option value="all">Todos os status</option>
                  <option value="pending">Aguardando confirmação</option>
                  <option value="confirmed">Confirmada</option>
                  <option value="completed">Concluída</option>
                  <option value="cancelled">Cancelada</option>
                </select>
              </div>
            </div>
            
            <div class="relative">
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Buscar reservas..." 
                class="form-input pl-10 pr-4 py-2"
                @input="applyFilters"
              />
              <Icon 
                name="heroicons:magnifying-glass" 
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
              />
            </div>
          </div>
        </div>
        
        <!-- Reservations -->
        <div class="space-y-6">
          <div 
            v-for="reservation in filteredReservations" 
            :key="reservation.id" 
            class="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div class="p-6">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h2 class="text-xl font-bold mb-1">{{ reservation.excursionTitle }}</h2>
                  <p class="text-gray-600">
                    Reserva #{{ reservation.id }}
                  </p>
                </div>
                <div class="mt-4 md:mt-0">
                  <span 
                    class="px-3 py-1 rounded-full text-sm font-medium"
                    :class="getStatusClass(reservation.status)"
                  >
                    {{ getStatusText(reservation.status) }}
                  </span>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <p class="text-sm text-gray-500">Data da Excursão</p>
                  <p class="font-medium">{{ formatDateRange(reservation.startDate, reservation.endDate) }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Participantes</p>
                  <p class="font-medium">{{ reservation.participants }} {{ reservation.participants > 1 ? 'pessoas' : 'pessoa' }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Valor Total</p>
                  <p class="font-medium">R$ {{ reservation.totalPrice }}</p>
                </div>
              </div>
              
              <div class="flex flex-col sm:flex-row gap-4">
                <NuxtLink :to="`/reserva-detalhes/${reservation.id}`" class="btn btn-primary">
                  Ver Detalhes
                </NuxtLink>
                
                <button 
                  v-if="reservation.status === 'pending'" 
                  @click="cancelReservation(reservation.id)" 
                  class="btn btn-outline text-red-600 border-red-600 hover:bg-red-50"
                >
                  Cancelar Reserva
                </button>
                
                <button 
                  v-if="reservation.status === 'confirmed'" 
                  @click="showVoucher(reservation.id)" 
                  class="btn btn-outline"
                >
                  Ver Voucher
                </button>
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
import { useReservationsStore } from '~/stores/reservations';
import { useAuthStore } from '~/stores/auth';

const reservationsStore = useReservationsStore();
const authStore = useAuthStore();

// State
const loading = ref(true);
const error = ref(null);
const statusFilter = ref('all');
const searchQuery = ref('');
const reservations = ref([]);

// Computed properties
const filteredReservations = computed(() => {
  let result = [...reservations.value];
  
  // Apply status filter
  if (statusFilter.value !== 'all') {
    result = result.filter(reservation => reservation.status === statusFilter.value);
  }
  
  // Apply search query
  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(reservation => 
      reservation.excursionTitle.toLowerCase().includes(query) ||
      reservation.id.toString().includes(query)
    );
  }
  
  // Sort by date (most recent first)
  result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  return result;
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

const applyFilters = () => {
  // This function is called when filters change
  // The actual filtering is done in the computed property
};

const cancelReservation = async (reservationId) => {
  if (!confirm('Tem certeza que deseja cancelar esta reserva?')) {
    return;
  }
  
  try {
    const success = await reservationsStore.updateReservationStatus(reservationId, 'cancelled');
    
    if (success) {
      // Update the local reservation status
      const index = reservations.value.findIndex(r => r.id === reservationId);
      if (index !== -1) {
        reservations.value[index].status = 'cancelled';
      }
    } else {
      error.value = 'Não foi possível cancelar a reserva. Por favor, tente novamente.';
    }
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao cancelar a reserva.';
  }
};

const showVoucher = (reservationId) => {
  // In a real app, this would open a modal or navigate to a voucher page
  alert(`Exibindo voucher para a reserva ${reservationId}`);
};

// Fetch data
onMounted(async () => {
  loading.value = true;
  error.value = null;
  
  try {
    if (!authStore.isLoggedIn) {
      // Redirect to login if not logged in
      navigateTo('/login');
      return;
    }
    
    // In a real app, you would fetch the user's reservations
    // For now, we'll simulate it
    
    // Wait for a moment to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    reservations.value = [
      {
        id: '1',
        excursionId: '1',
        excursionTitle: 'Fim de Semana em Ilhabela',
        userId: authStore.user.id,
        companyId: '1',
        companyName: 'Aventuras Marítimas',
        startDate: '2025-05-15',
        endDate: '2025-05-18',
        price: 1200,
        participants: 2,
        totalPrice: 2400,
        status: 'confirmed',
        paymentMethod: 'credit_card',
        createdAt: '2025-04-10T14:30:00Z'
      },
      {
        id: '2',
        excursionId: '3',
        excursionTitle: 'Thermas dos Laranjais',
        userId: authStore.user.id,
        companyId: '3',
        companyName: 'Diversão Total',
        startDate: '2025-07-20',
        endDate: '2025-07-23',
        price: 1800,
        participants: 4,
        totalPrice: 7200,
        status: 'pending',
        paymentMethod: 'pix',
        createdAt: '2025-04-12T10:15:00Z'
      },
      {
        id: '3',
        excursionId: '2',
        excursionTitle: 'Expedição Serra da Mantiqueira',
        userId: authStore.user.id,
        companyId: '2',
        companyName: 'Trilhas & Montanhas',
        startDate: '2024-12-10',
        endDate: '2024-12-13',
        price: 1500,
        participants: 1,
        totalPrice: 1500,
        status: 'completed',
        paymentMethod: 'credit_card',
        createdAt: '2024-11-05T09:20:00Z'
      }
    ];
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao carregar suas reservas.';
  } finally {
    loading.value = false;
  }
});
</script>
