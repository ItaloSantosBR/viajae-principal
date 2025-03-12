<template>
  <div>
    <NuxtLayout name="dashboard">
      <!-- Page Header -->
      <div class="flex items-center mb-6">
        <NuxtLink to="/empresa/dashboard/reservas" class="flex items-center text-primary hover:text-primary-600 mr-4">
          <Icon name="heroicons:arrow-left" class="w-5 h-5 mr-1" />
          <span>Voltar para Reservas</span>
        </NuxtLink>
        <h1 class="text-2xl font-bold">Detalhes da Reserva</h1>
      </div>
      
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="bg-red-50 text-red-600 p-6 rounded-lg">
        <Icon name="heroicons:exclamation-circle" class="w-12 h-12 mx-auto mb-4" />
        <h2 class="text-xl font-bold mb-2 text-center">Erro ao carregar reserva</h2>
        <p class="text-center">{{ error }}</p>
      </div>
      
      <!-- Reservation details -->
      <div v-else>
        <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <!-- Status header -->
          <div 
            class="p-6 text-white"
            :class="getStatusHeaderClass(reservation.status)"
          >
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <div class="bg-white rounded-full p-2 mr-3">
                  <Icon name="heroicons:ticket" class="w-6 h-6" :class="getStatusIconClass(reservation.status)" />
                </div>
                <div>
                  <h2 class="text-xl font-bold">Reserva #{{ reservation.id }}</h2>
                  <p class="text-white/80">Criada em {{ formatDate(reservation.createdAt) }}</p>
                </div>
              </div>
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
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 class="text-lg font-bold mb-3">Informações da Reserva</h3>
                <div class="space-y-3">
                  <div>
                    <p class="text-sm text-gray-500">Cliente</p>
                    <p class="font-medium">{{ reservation.userName }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Email</p>
                    <p class="font-medium">{{ reservation.userEmail }}</p>
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
              
              <div>
                <h3 class="text-lg font-bold mb-3">Informações da Excursão</h3>
                <div class="space-y-3">
                  <div>
                    <p class="text-sm text-gray-500">Excursão</p>
                    <p class="font-medium">{{ reservation.excursionTitle }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Data</p>
                    <p class="font-medium">{{ formatDateRange(reservation.startDate, reservation.endDate) }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Local de Embarque</p>
                    <p class="font-medium">{{ getPickupLocationName(reservation.pickupLocation) }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500">Valor Total</p>
                    <p class="font-medium text-primary">R$ {{ reservation.totalPrice }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Participants -->
            <div class="mb-6">
              <h3 class="text-lg font-bold mb-3">Participantes</h3>
              <div class="bg-gray-50 rounded-lg overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-100">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CPF
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Telefone
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(participant, index) in reservation.participantDetails" :key="index" class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="text-sm font-medium text-gray-900">
                            {{ participant.name }}
                            <span v-if="index === 0" class="ml-2 text-xs bg-primary-100 text-primary px-2 py-0.5 rounded-full">
                              Responsável
                            </span>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ participant.cpf }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ participant.email }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ participant.phone }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <!-- Payment Summary -->
            <div class="mb-6">
              <h3 class="text-lg font-bold mb-3">Resumo do Pagamento</h3>
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
            <div class="mb-6">
              <h3 class="text-lg font-bold mb-3">Status da Reserva</h3>
              
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
                    <h4 
                      class="font-bold"
                      :class="status.completed ? 'text-primary' : 'text-gray-500'"
                    >
                      {{ status.name }}
                    </h4>
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
                v-if="reservation.status === 'pending'" 
                @click="confirmReservation" 
                class="btn btn-primary"
              >
                <Icon name="heroicons:check" class="w-5 h-5 mr-2" />
                Confirmar Reserva
              </button>
              
              <button 
                v-if="reservation.status === 'confirmed'" 
                @click="generateVoucher" 
                class="btn btn-primary"
              >
                <Icon name="heroicons:document-text" class="w-5 h-5 mr-2" />
                Gerar Voucher
              </button>
              
              <button 
                v-if="['pending', 'confirmed'].includes(reservation.status)" 
                @click="cancelReservation" 
                class="btn btn-outline text-red-600 border-red-600 hover:bg-red-50"
              >
                <Icon name="heroicons:x-mark" class="w-5 h-5 mr-2" />
                Cancelar Reserva
              </button>
              
              <button 
                @click="contactCustomer" 
                class="btn btn-outline"
              >
                <Icon name="heroicons:chat-bubble-left-right" class="w-5 h-5 mr-2" />
                Contatar Cliente
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
import { useReservationsStore } from '~/stores/reservations';

const route = useRoute();
const reservationId = route.params.id;
const reservationsStore = useReservationsStore();

// State
const loading = ref(true);
const error = ref(null);
const reservation = ref(null);

// Pickup locations (mock data)
const pickupLocations = [
  {
    id: 'location1',
    name: 'Terminal Rodoviário Tietê',
    address: 'Av. Cruzeiro do Sul, 1800 - Santana, São Paulo - SP',
    departureTime: '06:00'
  },
  {
    id: 'location2',
    name: 'Metrô Barra Funda',
    address: 'Av. Mário de Andrade, 664 - Barra Funda, São Paulo - SP',
    departureTime: '06:30'
  },
  {
    id: 'location3',
    name: 'Shopping Ibirapuera',
    address: 'Av. Ibirapuera, 3103 - Indianópolis, São Paulo - SP',
    departureTime: '07:00'
  }
];

// Computed properties
const statusTimeline = computed(() => {
  if (!reservation.value) return [];
  
  const timeline = [
    {
      name: 'Reserva Realizada',
      description: 'A reserva foi registrada no sistema.',
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
        : 'A agência confirmou a reserva.',
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

const getPickupLocationName = (locationId) => {
  const location = pickupLocations.find(loc => loc.id === locationId);
  return location ? location.name : 'Local não especificado';
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

const getStatusIconClass = (status) => {
  const statusClasses = {
    'pending': 'text-yellow-600',
    'confirmed': 'text-primary',
    'completed': 'text-blue-600',
    'cancelled': 'text-red-600'
  };
  
  return statusClasses[status] || 'text-gray-600';
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

const confirmReservation = async () => {
  if (!confirm('Tem certeza que deseja confirmar esta reserva?')) {
    return;
  }
  
  try {
    loading.value = true;
    const success = await reservationsStore.updateReservationStatus(reservationId, 'confirmed');
    
    if (success) {
      // Update the local reservation status
      reservation.value.status = 'confirmed';
      alert('Reserva confirmada com sucesso!');
    } else {
      error.value = 'Não foi possível confirmar a reserva. Por favor, tente novamente.';
    }
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao confirmar a reserva.';
  } finally {
    loading.value = false;
  }
};

const cancelReservation = async () => {
  if (!confirm('Tem certeza que deseja cancelar esta reserva? Esta ação não pode ser desfeita.')) {
    return;
  }
  
  try {
    loading.value = true;
    const success = await reservationsStore.updateReservationStatus(reservationId, 'cancelled');
    
    if (success) {
      // Update the local reservation status
      reservation.value.status = 'cancelled';
      alert('Reserva cancelada com sucesso!');
    } else {
      error.value = 'Não foi possível cancelar a reserva. Por favor, tente novamente.';
    }
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao cancelar a reserva.';
  } finally {
    loading.value = false;
  }
};

const generateVoucher = () => {
  // In a real app, this would generate a voucher PDF or similar
  alert('Gerando voucher para a reserva #' + reservationId);
};

const contactCustomer = () => {
  // In a real app, this would open a chat or contact form
  alert('Abrindo chat com o cliente: ' + reservation.value.userName);
};

// Fetch data
onMounted(async () => {
  loading.value = true;
  error.value = null;
  
  try {
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
        userId: '3',
        userName: 'João Silva',
        userEmail: 'joao@example.com',
        companyId: '1',
        companyName: 'Aventuras Marítimas',
        startDate: '2025-05-15',
        endDate: '2025-05-18',
        price: 1200,
        participants: 2,
        totalPrice: 2400,
        status: 'confirmed',
        paymentMethod: 'credit_card',
        createdAt: '2025-04-10T14:30:00Z',
        participantDetails: [
          {
            name: 'João Silva',
            cpf: '123.456.789-00',
            birthdate: '1985-05-10',
            phone: '(11) 98765-4321',
            email: 'joao@example.com',
            specialNeeds: ''
          },
          {
            name: 'Maria Oliveira',
            cpf: '987.654.321-00',
            birthdate: '1990-08-15',
            phone: '(11) 91234-5678',
            email: 'maria@example.com',
            specialNeeds: ''
          }
        ],
        pickupLocation: 'location1'
      },
      {
        id: '2',
        excursionId: '3',
        excursionTitle: 'Thermas dos Laranjais',
        userId: '4',
        userName: 'Pedro Santos',
        userEmail: 'pedro@example.com',
        companyId: '3',
        companyName: 'Diversão Total',
        startDate: '2025-07-20',
        endDate: '2025-07-23',
        price: 1800,
        participants: 4,
        totalPrice: 7200,
        status: 'pending',
        paymentMethod: 'pix',
        createdAt: '2025-04-12T10:15:00Z',
        participantDetails: [
          {
            name: 'Pedro Santos',
            cpf: '111.222.333-44',
            birthdate: '1988-03-20',
            phone: '(11) 97777-8888',
            email: 'pedro@example.com',
            specialNeeds: ''
          },
          {
            name: 'Ana Souza',
            cpf: '555.666.777-88',
            birthdate: '1992-11-05',
            phone: '(11) 96666-7777',
            email: 'ana@example.com',
            specialNeeds: ''
          },
          {
            name: 'Carlos Ferreira',
            cpf: '999.888.777-66',
            birthdate: '1985-07-15',
            phone: '(11) 95555-6666',
            email: 'carlos@example.com',
            specialNeeds: ''
          },
          {
            name: 'Juliana Lima',
            cpf: '444.333.222-11',
            birthdate: '1990-09-25',
            phone: '(11) 94444-5555',
            email: 'juliana@example.com',
            specialNeeds: ''
          }
        ],
        pickupLocation: 'location2'
      },
      {
        id: '3',
        excursionId: '5',
        excursionTitle: 'Feriado em Paraty',
        userId: '5',
        userName: 'Mariana Costa',
        userEmail: 'mariana@example.com',
        companyId: '1',
        companyName: 'Aventuras Marítimas',
        startDate: '2025-09-05',
        endDate: '2025-09-08',
        price: 1350,
        participants: 3,
        totalPrice: 4050,
        status: 'cancelled',
        paymentMethod: 'credit_card',
        createdAt: '2025-04-05T09:20:00Z',
        participantDetails: [
          {
            name: 'Mariana Costa',
            cpf: '777.888.999-00',
            birthdate: '1992-05-20',
            phone: '(11) 93333-4444',
            email: 'mariana@example.com',
            specialNeeds: ''
          },
          {
            name: 'Roberto Alves',
            cpf: '222.333.444-55',
            birthdate: '1990-11-10',
            phone: '(11) 92222-3333',
            email: 'roberto@example.com',
            specialNeeds: ''
          },
          {
            name: 'Fernanda Lima',
            cpf: '666.555.444-33',
            birthdate: '1995-03-15',
            phone: '(11) 91111-2222',
            email: 'fernanda@example.com',
            specialNeeds: ''
          }
        ],
        pickupLocation: 'location3'
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
