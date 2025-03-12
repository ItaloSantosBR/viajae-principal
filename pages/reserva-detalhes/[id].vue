<template>
  <div class="bg-gray-50 min-h-screen py-12">
    <div class="container-custom">
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="bg-red-50 text-red-600 p-6 rounded-lg max-w-2xl mx-auto">
        <Icon name="heroicons:exclamation-circle" class="w-12 h-12 mx-auto mb-4" />
        <h2 class="text-xl font-bold mb-2 text-center">Erro ao carregar reserva</h2>
        <p class="text-center">{{ error }}</p>
        <div class="flex justify-center mt-6">
          <NuxtLink to="/minhas-reservas" class="btn btn-primary">
            Voltar para Minhas Reservas
          </NuxtLink>
        </div>
      </div>
      
      <!-- Reservation details -->
      <div v-else class="max-w-3xl mx-auto">
        <div class="flex items-center mb-6">
          <NuxtLink to="/minhas-reservas" class="flex items-center text-primary hover:text-primary-600">
            <Icon name="heroicons:arrow-left" class="w-5 h-5 mr-1" />
            <span>Voltar para Minhas Reservas</span>
          </NuxtLink>
        </div>
        
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <!-- Status header -->
          <div 
            class="p-6 text-white"
            :class="getStatusHeaderClass(reservation.status)"
          >
            <div class="flex justify-between items-center">
              <h1 class="text-2xl font-bold">Detalhes da Reserva</h1>
              <span 
                class="px-3 py-1 rounded-full text-sm font-medium"
                :class="getStatusBadgeClass(reservation.status)"
              >
                {{ getStatusText(reservation.status) }}
              </span>
            </div>
          </div>
          
          <!-- Reservation details -->
          <div class="p-6">
            <div class="mb-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500">Número da Reserva</p>
                  <p class="font-medium">{{ reservation.id }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Data da Reserva</p>
                  <p class="font-medium">{{ formatDate(reservation.createdAt) }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Forma de Pagamento</p>
                  <p class="font-medium">{{ getPaymentMethodName(reservation.paymentMethod) }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Participantes</p>
                  <p class="font-medium">{{ reservation.participants }} {{ reservation.participants > 1 ? 'pessoas' : 'pessoa' }}</p>
                </div>
              </div>
            </div>
            
            <div class="border-t border-gray-200 pt-6 mb-6">
              <h2 class="text-xl font-bold mb-4">Excursão</h2>
              
              <div class="flex flex-col md:flex-row">
                <div class="md:w-1/3 mb-4 md:mb-0">
                  <img 
                    :src="getExcursionImage()" 
                    :alt="reservation.excursionTitle" 
                    class="w-full h-40 object-cover rounded-lg" 
                  />
                </div>
                <div class="md:w-2/3 md:pl-6">
                  <h3 class="text-lg font-bold mb-2">{{ reservation.excursionTitle }}</h3>
                  
                  <div class="flex items-center text-gray-600 mb-2">
                    <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
                    <span>{{ formatDateRange(reservation.startDate, reservation.endDate) }}</span>
                  </div>
                  
                  <div class="flex items-center text-gray-600 mb-2">
                    <Icon name="heroicons:building-office-2" class="w-4 h-4 mr-1" />
                    <span>{{ reservation.companyName }}</span>
                  </div>
                  
                  <div class="flex items-center text-gray-600 mb-4">
                    <Icon name="heroicons:map-pin" class="w-4 h-4 mr-1" />
                    <span>Local de Embarque: Terminal Rodoviário Tietê</span>
                  </div>
                  
                  <NuxtLink :to="`/excursoes/${reservation.excursionId}`" class="text-primary hover:text-primary-600 font-medium flex items-center">
                    Ver detalhes da excursão
                    <Icon name="heroicons:arrow-right" class="w-4 h-4 ml-1" />
                  </NuxtLink>
                </div>
              </div>
            </div>
            
            <div class="border-t border-gray-200 pt-6 mb-6">
              <h2 class="text-xl font-bold mb-4">Participantes</h2>
              
              <div class="space-y-4">
                <div 
                  v-for="(participant, index) in participants" 
                  :key="index" 
                  class="bg-gray-50 p-4 rounded-lg"
                >
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="font-bold">{{ participant.name }}</h3>
                      <p class="text-gray-600">CPF: {{ participant.cpf }}</p>
                    </div>
                    <div v-if="index === 0" class="text-xs bg-primary-100 text-primary px-2 py-1 rounded-full">
                      Responsável
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="border-t border-gray-200 pt-6 mb-6">
              <h2 class="text-xl font-bold mb-4">Resumo do Pagamento</h2>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex justify-between mb-2">
                  <span>Preço por pessoa</span>
                  <span>R$ {{ reservation.price }}</span>
                </div>
                <div class="flex justify-between mb-2">
                  <span>Participantes</span>
                  <span>x {{ reservation.participants }}</span>
                </div>
                <div class="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>R$ {{ reservation.totalPrice }}</span>
                </div>
              </div>
            </div>
            
            <!-- Status timeline -->
            <div class="border-t border-gray-200 pt-6 mb-6">
              <h2 class="text-xl font-bold mb-4">Status da Reserva</h2>
              
              <div class="space-y-6">
                <div 
                  v-for="(status, index) in statusTimeline" 
                  :key="index" 
                  class="flex"
                >
                  <div class="flex flex-col items-center mr-4">
                    <div 
                      class="rounded-full h-8 w-8 flex items-center justify-center"
                      :class="status.completed ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'"
                    >
                      <Icon v-if="status.completed" name="heroicons:check" class="w-5 h-5" />
                      <span v-else>{{ index + 1 }}</span>
                    </div>
                    <div 
                      v-if="index < statusTimeline.length - 1" 
                      class="h-full w-0.5 mt-2"
                      :class="status.completed ? 'bg-primary' : 'bg-gray-200'"
                    ></div>
                  </div>
                  <div>
                    <h3 
                      class="font-bold"
                      :class="status.completed ? 'text-primary' : 'text-gray-500'"
                    >
                      {{ status.name }}
                    </h3>
                    <p 
                      class="text-sm"
                      :class="status.completed ? 'text-gray-700' : 'text-gray-400'"
                    >
                      {{ status.description }}
                    </p>
                    <p v-if="status.date" class="text-xs text-gray-500 mt-1">
                      {{ formatDate(status.date) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Action buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button 
                v-if="reservation.status === 'confirmed'" 
                @click="showVoucher()" 
                class="btn btn-primary"
              >
                <Icon name="heroicons:ticket" class="w-5 h-5 mr-2" />
                Ver Voucher
              </button>
              
              <button 
                v-if="reservation.status === 'pending'" 
                @click="cancelReservation()" 
                class="btn btn-outline text-red-600 border-red-600 hover:bg-red-50"
              >
                <Icon name="heroicons:trash" class="w-5 h-5 mr-2" />
                Cancelar Reserva
              </button>
              
              <button 
                @click="contactSupport()" 
                class="btn btn-outline"
              >
                <Icon name="heroicons:chat-bubble-left-right" class="w-5 h-5 mr-2" />
                Falar com Suporte
              </button>
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

const route = useRoute();
const router = useRouter();
const reservationId = route.params.id;
const reservationsStore = useReservationsStore();
const authStore = useAuthStore();

// State
const loading = ref(true);
const error = ref(null);
const reservation = ref(null);

// Mock participants data
const participants = [
  {
    name: 'João Silva',
    cpf: '123.456.789-00',
    birthdate: '1985-05-10',
    phone: '(11) 98765-4321',
    email: 'joao@example.com'
  },
  {
    name: 'Maria Oliveira',
    cpf: '987.654.321-00',
    birthdate: '1990-08-15',
    phone: '(11) 91234-5678',
    email: 'maria@example.com'
  }
];

// Computed properties
const statusTimeline = computed(() => {
  if (!reservation.value) return [];
  
  const timeline = [
    {
      name: 'Reserva Realizada',
      description: 'Sua reserva foi registrada em nosso sistema.',
      completed: true,
      date: reservation.value.createdAt
    },
    {
      name: 'Pagamento Processado',
      description: 'O pagamento foi processado com sucesso.',
      completed: true,
      date: reservation.value.createdAt // In a real app, this would be a different date
    },
    {
      name: 'Confirmação da Agência',
      description: reservation.value.status === 'pending' 
        ? 'Aguardando confirmação da agência de turismo.'
        : 'A agência confirmou sua reserva.',
      completed: ['confirmed', 'completed'].includes(reservation.value.status),
      date: reservation.value.status !== 'pending' ? '2025-04-11T10:30:00Z' : null
    },
    {
      name: 'Excursão Realizada',
      description: reservation.value.status === 'completed'
        ? 'A excursão foi concluída com sucesso.'
        : 'A excursão ainda não foi realizada.',
      completed: reservation.value.status === 'completed',
      date: reservation.value.status === 'completed' ? '2024-12-13T18:00:00Z' : null
    }
  ];
  
  // Add cancelled status if applicable
  if (reservation.value.status === 'cancelled') {
    return [
      timeline[0],
      {
        name: 'Reserva Cancelada',
        description: 'A reserva foi cancelada.',
        completed: true,
        date: '2025-04-11T14:45:00Z' // In a real app, this would be the actual cancellation date
      }
    ];
  }
  
  return timeline;
});

// Methods
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

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

const getPaymentMethodName = (methodId) => {
  const methods = {
    'credit_card': 'Cartão de Crédito',
    'pix': 'PIX',
    'boleto': 'Boleto Bancário'
  };
  
  return methods[methodId] || methodId;
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

const getStatusHeaderClass = (status) => {
  const statusClasses = {
    'pending': 'bg-yellow-600',
    'confirmed': 'bg-primary',
    'completed': 'bg-blue-600',
    'cancelled': 'bg-red-600'
  };
  
  return statusClasses[status] || 'bg-gray-600';
};

const getStatusBadgeClass = (status) => {
  const statusClasses = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-green-100 text-green-800',
    'completed': 'bg-blue-100 text-blue-800',
    'cancelled': 'bg-red-100 text-red-800'
  };
  
  return statusClasses[status] || 'bg-gray-100 text-gray-800';
};

const getExcursionImage = () => {
  // In a real app, this would come from the excursion data
  return `https://source.unsplash.com/random/800x600/?travel`;
};

const showVoucher = () => {
  // In a real app, this would open a modal or navigate to a voucher page
  alert(`Exibindo voucher para a reserva ${reservationId}`);
};

const cancelReservation = async () => {
  if (!confirm('Tem certeza que deseja cancelar esta reserva?')) {
    return;
  }
  
  try {
    const success = await reservationsStore.updateReservationStatus(reservationId, 'cancelled');
    
    if (success) {
      // Update the local reservation status
      reservation.value.status = 'cancelled';
    } else {
      error.value = 'Não foi possível cancelar a reserva. Por favor, tente novamente.';
    }
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao cancelar a reserva.';
  }
};

const contactSupport = () => {
  // In a real app, this would open a chat or contact form
  alert('Abrindo chat com o suporte...');
};

// Fetch data
onMounted(async () => {
  loading.value = true;
  error.value = null;
  
  try {
    if (!authStore.isLoggedIn) {
      // Redirect to login if not logged in
      router.push('/login');
      return;
    }
    
    // In a real app, you would fetch the specific reservation
    // For now, we'll simulate it
    
    // Wait for a moment to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find the reservation in the mock data
    const mockReservations = [
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
    
    reservation.value = mockReservations.find(r => r.id === reservationId);
    
    if (!reservation.value) {
      error.value = 'Reserva não encontrada ou não está mais disponível.';
    }
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao carregar os detalhes da reserva.';
  } finally {
    loading.value = false;
  }
});
</script>
