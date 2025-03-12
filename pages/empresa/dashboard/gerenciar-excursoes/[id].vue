<template>
  <div>
    <NuxtLayout name="dashboard">
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-6">
          <!-- Link de Voltar -->
          <NuxtLink 
            to="/empresa/dashboard/gerenciar-excursoes" 
            class="flex items-center text-primary hover:text-primary-600"
          >
            <Icon name="heroicons:arrow-left" class="w-5 h-5 mr-1" />
            <span>Voltar para Excursões</span>
          </NuxtLink>
        
          <!-- Título - Ocupa o espaço central -->
          <h1 class="text-2xl font-bold flex-grow text-center sm:text-center">
            Detalhes da Excursão
          </h1>
        
          <!-- Botões de Ação -->
          <div class="flex gap-4">
            <button @click="toggleExcursionStatus" class="btn btn-outline flex items-center">
              <Icon :name="excursion.status === 'active' ? 'heroicons:pause' : 'heroicons:play'" class="w-5 h-5 mr-1" />
              {{ excursion.status === 'active' ? 'Pausar Vendas' : 'Ativar Vendas' }}
            </button>      
            <button @click="editExcursion" class="btn btn-primary flex items-center">
              <Icon name="heroicons:pencil-square" class="w-5 h-5" />
            </button>
            <button @click="duplicateExcursion" class="btn btn-outline flex items-center">
              <Icon name="heroicons:document-duplicate" class="w-5 h-5" />
            </button>
          </div>
        </div>
              
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="bg-red-50 text-red-600 p-6 rounded-lg">
        <Icon name="heroicons:exclamation-circle" class="w-12 h-12 mx-auto mb-4" />
        <h2 class="text-xl font-bold mb-2 text-center">Erro ao carregar excursão</h2>
        <p class="text-center">{{ error }}</p>
      </div>
      
      <!-- Excursion details -->
      <div v-else>
        <!-- Submenu navigation -->
        <div class="bg-white rounded-lg shadow-md mb-6">
          <div class="border-b border-gray-200">
            <nav class="flex -mb-px">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="currentTab = tab.id"
                class="px-6 py-4 text-center border-b-2 font-medium text-sm whitespace-nowrap"
                :class="currentTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
              >
                <div class="flex items-center">
                  <Icon :name="tab.icon" class="w-5 h-5 mr-2" />
                  {{ tab.name }}
                </div>
              </button>
            </nav>
          </div>
        </div>
        
        <!-- Tab content -->
        <!-- General Info -->
        <div v-if="currentTab === 'general'" class="space-y-6">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6">
              <div class="flex justify-between items-start mb-6">
                <div>
                  <h2 class="text-2xl font-bold">{{ excursion.title }}</h2>
                  <div class="flex items-center text-gray-600 mt-1">
                    <Icon name="heroicons:map-pin" class="w-5 h-5 mr-1" />
                    <span>{{ excursion.destination }}</span>
                  </div>
                </div>
                <span 
                  class="px-3 py-1 rounded-full text-sm font-medium"
                  :class="getStatusClass(excursion)"
                >
                  {{ getStatusText(excursion) }}
                </span>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h3 class="text-lg font-bold mb-3">Informações Gerais</h3>
                  <div class="space-y-2">
                    <div class="flex items-center">
                      <Icon name="heroicons:calendar" class="w-5 h-5 text-primary mr-2" />
                      <div>
                        <span class="font-medium">Data:</span>
                        <span class="ml-1">{{ formatDateRange(excursion.startDate, excursion.endDate) }}</span>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <Icon name="heroicons:truck" class="w-5 h-5 text-primary mr-2" />
                      <div>
                        <span class="font-medium">Origem:</span>
                        <span class="ml-1">{{ excursion.originCity }}</span>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <Icon name="heroicons:currency-dollar" class="w-5 h-5 text-primary mr-2" />
                      <div>
                        <span class="font-medium">Preço:</span>
                        <span class="ml-1">R$ {{ excursion.price }} por pessoa</span>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <Icon name="heroicons:user-group" class="w-5 h-5 text-primary mr-2" />
                      <div>
                        <span class="font-medium">Vagas:</span>
                        <span class="ml-1">{{ getOccupancy(excursion) }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 class="text-lg font-bold mb-3">Hospedagem</h3>
                  <div class="space-y-2">
                    <div class="flex items-center">
                      <Icon name="heroicons:home" class="w-5 h-5 text-primary mr-2" />
                      <div>
                        <span class="font-medium">Local:</span>
                        <span class="ml-1">{{ excursion.accommodation.name }}</span>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <Icon name="heroicons:building-office" class="w-5 h-5 text-primary mr-2" />
                      <div>
                        <span class="font-medium">Tipo:</span>
                        <span class="ml-1">{{ excursion.accommodation.type }}</span>
                      </div>
                    </div>
                    <div class="flex items-start">
                      <Icon name="heroicons:check-circle" class="w-5 h-5 text-primary mr-2 mt-0.5" />
                      <div>
                        <span class="font-medium">Comodidades:</span>
                        <div class="flex flex-wrap gap-1 mt-1">
                          <span 
                            v-for="amenity in excursion.accommodation.amenities" 
                            :key="amenity" 
                            class="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs"
                          >
                            {{ amenity }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 class="text-lg font-bold mb-3">Serviços Inclusos</h3>
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="service in excursion.includedServices" 
                      :key="service" 
                      class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      <Icon :name="getServiceIcon(service)" class="w-4 h-4 mr-1" />
                      {{ getServiceName(service) }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="flex flex-col sm:flex-row gap-4">
                <button @click="editExcursion" class="btn btn-primary">
                  <Icon name="heroicons:pencil-square" class="w-5 h-5 mr-1" />
                  Editar Excursão
                </button>
                <button @click="toggleExcursionStatus" class="btn btn-outline">
                  <Icon :name="excursion.status === 'active' ? 'heroicons:pause' : 'heroicons:play'" class="w-5 h-5 mr-1" />
                  {{ excursion.status === 'active' ? 'Pausar Vendas' : 'Ativar Vendas' }}
                </button>
                <button @click="duplicateExcursion" class="btn btn-outline">
                  <Icon name="heroicons:document-duplicate" class="w-5 h-5 mr-1" />
                  Duplicar
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Participants List -->
        <div v-if="currentTab === 'participants'" class="space-y-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold">Lista de Participantes</h2>
              <div class="flex space-x-2">
                <button 
                  @click="downloadParticipantsList('pdf')" 
                  class="btn btn-outline flex items-center"
                >
                  <Icon name="heroicons:document-arrow-down" class="w-5 h-5 mr-1" />
                  PDF
                </button>
                <button 
                  @click="downloadParticipantsList('csv')" 
                  class="btn btn-outline flex items-center"
                >
                  <Icon name="heroicons:table-cells" class="w-5 h-5 mr-1" />
                  CSV
                </button>
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CPF
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telefone
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assento
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
                  <tr v-for="participant in participants" :key="participant.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div>
                          <div class="text-sm font-medium text-gray-900">
                            {{ participant.name }}
                            <span 
                              v-if="participant.isResponsible" 
                              class="ml-2 text-xs bg-primary-100 text-primary px-2 py-0.5 rounded-full"
                            >
                              Responsável
                            </span>
                          </div>
                          <div class="text-sm text-gray-500">
                            Reserva #{{ participant.reservationId }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ participant.cpf }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ participant.phone }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ participant.email }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <input 
                        type="text" 
                        v-model="participant.seat" 
                        class="form-input w-20 py-1 text-sm"
                        @change="updateParticipantSeat(participant)"
                        placeholder="Nº"
                      />
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="getParticipantStatusClass(participant.status)"
                      >
                        {{ getParticipantStatusText(participant.status) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        @click="viewParticipantDetails(participant)" 
                        class="text-primary hover:text-primary-600"
                      >
                        Ver Detalhes
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <!-- Reservations -->
        <div v-if="currentTab === 'reservations'" class="space-y-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold">Reservas</h2>
              <div class="flex space-x-2">
                <button 
                  @click="downloadReservationsList('pdf')" 
                  class="btn btn-outline flex items-center"
                >
                  <Icon name="heroicons:document-arrow-down" class="w-5 h-5 mr-1" />
                  PDF
                </button>
                <button 
                  @click="downloadReservationsList('csv')" 
                  class="btn btn-outline flex items-center"
                >
                  <Icon name="heroicons:table-cells" class="w-5 h-5 mr-1" />
                  CSV
                </button>
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participantes
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
                  <tr v-for="reservation in reservations" :key="reservation.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{{ reservation.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <Icon name="heroicons:user" class="h-4 w-4 text-gray-500" />
                        </div>
                        <div class="ml-3">
                          <div class="text-sm font-medium text-gray-900">{{ reservation.userName }}</div>
                          <div class="text-sm text-gray-500">{{ reservation.userEmail }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(reservation.createdAt) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ reservation.participants }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      R$ {{ reservation.totalPrice }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="getReservationStatusClass(reservation.status)"
                      >
                        {{ getReservationStatusText(reservation.status) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <NuxtLink :to="`/empresa/dashboard/reservas/${reservation.id}`" class="text-primary hover:text-primary-600">
                        Ver Detalhes
                      </NuxtLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <!-- Financial Summary -->
        <div v-if="currentTab === 'financial'" class="space-y-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-6">Resumo Financeiro</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-bold text-lg mb-2">Receita Total</h3>
                <p class="text-2xl font-bold text-primary">R$ {{ financialSummary.totalRevenue }}</p>
                <p class="text-sm text-gray-500">{{ reservations.length }} reservas</p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-bold text-lg mb-2">Receita Confirmada</h3>
                <p class="text-2xl font-bold text-green-600">R$ {{ financialSummary.confirmedRevenue }}</p>
                <p class="text-sm text-gray-500">{{ confirmedReservations.length }} reservas confirmadas</p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-bold text-lg mb-2">Receita Pendente</h3>
                <p class="text-2xl font-bold text-yellow-600">R$ {{ financialSummary.pendingRevenue }}</p>
                <p class="text-sm text-gray-500">{{ pendingReservations.length }} reservas pendentes</p>
              </div>
            </div>
            
            <!-- Payment Methods Chart -->
            <div class="mb-6">
              <h3 class="text-xl font-bold mb-4">Métodos de Pagamento</h3>
              <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center justify-between mb-2">
                  <span>Cartão de Crédito</span>
                  <span>65%</span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full">
                  <div class="h-2 bg-primary rounded-full" style="width: 65%"></div>
                </div>
                
                <div class="flex items-center justify-between mb-2 mt-4">
                  <span>PIX</span>
                  <span>25%</span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full">
                  <div class="h-2 bg-blue-500 rounded-full" style="width: 25%"></div>
                </div>
                
                <div class="flex items-center justify-between mb-2 mt-4">
                  <span>Boleto</span>
                  <span>10%</span>
                </div>
                <div class="h-2 bg-gray-200 rounded-full">
                  <div class="h-2 bg-yellow-500 rounded-full" style="width: 10%"></div>
                </div>
              </div>
            </div>
            
            <!-- Revenue Timeline -->
            <div>
              <h3 class="text-xl font-bold mb-4">Histórico de Receita</h3>
              <div class="bg-gray-50 p-4 rounded-lg h-64 flex items-center justify-center">
                <div class="text-center text-gray-500">
                  <Icon name="heroicons:chart-bar" class="w-12 h-12 mx-auto mb-2" />
                  <p>Gráfico de receita ao longo do tempo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Communication -->
        <div v-if="currentTab === 'communication'" class="space-y-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-6">Comunicação com Participantes</h2>
            
            <!-- Message Form -->
            <div class="mb-8">
              <h3 class="text-lg font-bold mb-4">Nova Mensagem</h3>
              
              <div class="space-y-4">
                <div>
                  <label class="form-label">Destinatários</label>
                  <select v-model="messageForm.recipients" class="form-input">
                    <option value="all">Todos os participantes</option>
                    <option value="confirmed">Apenas confirmados</option>
                    <option value="pending">Apenas pendentes</option>
                  </select>
                </div>
                
                <div>
                  <label class="form-label">Tipo de Notificação</label>
                  <div class="space-x-4">
                    <label class="inline-flex items-center">
                      <input type="checkbox" v-model="messageForm.channels" value="email" class="form-checkbox text-primary" />
                      <span class="ml-2">Email</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input type="checkbox" v-model="messageForm.channels" value="push" class="form-checkbox text-primary" />
                      <span class="ml-2">Push Notification</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label class="form-label">Assunto</label>
                  <input type="text" v-model="messageForm.subject" class="form-input" placeholder="Digite o assunto da mensagem" />
                </div>
                
                <div>
                  <label class="form-label">Mensagem</label>
                  <textarea 
                    v-model="messageForm.message" 
                    class="form-input" 
                    rows="5" 
                    placeholder="Digite sua mensagem..."
                  ></textarea>
                </div>
                
                <div class="flex justify-end">
                  <button @click="sendMessage" class="btn btn-primary">
                    <Icon name="heroicons:paper-airplane" class="w-5 h-5 mr-2" />
                    Enviar Mensagem
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Message History -->
            <div>
              <h3 class="text-lg font-bold mb-4">Histórico de Mensagens</h3>
              
              <div class="space-y-4">
                <div v-for="message in messageHistory" :key="message.id" class="bg-gray-50 p-4 rounded-lg">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <h4 class="font-bold">{{ message.subject }}</h4>
                      <p class="text-sm text-gray-500">
                        Enviado para: {{ message.recipients }}
                        <span class="mx-2">•</span>
                        Via: {{ message.channels.join(', ') }}
                      </p>
                    </div>
                    <span class="text-sm text-gray-500">{{ formatDate(message.date) }}</span>
                  </div>
                  <p class="text-gray-700">{{ message.message }}</p>
                  <div class="mt-2 text-sm">
                    <span class="text-green-600">{{ message.delivered }} entregues</span>
                    <span class="mx-2">•</span>
                    <span class="text-blue-600">{{ message.opened }} abertos</span>
                  </div>
                </div>
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
import { useReservationsStore } from '~/stores/reservations';

const route = useRoute();
const router = useRouter();
const excursionId = route.params.id;
const excursionsStore = useExcursionsStore();
const reservationsStore = useReservationsStore();

// State
const loading = ref(true);
const error = ref(null);
const reservations = ref([]);
const participants = ref([]);
const currentTab = ref('general');

// Tabs configuration
const tabs = [
  { id: 'general', name: 'Geral', icon: 'heroicons:home' },
  { id: 'participants', name: 'Lista de Participantes', icon: 'heroicons:users' },
  { id: 'reservations', name: 'Reservas', icon: 'heroicons:ticket' },
  { id: 'financial', name: 'Resumo Financeiro', icon: 'heroicons:banknotes' },
  { id: 'communication', name: 'Comunicação', icon: 'heroicons:chat-bubble-left-right' }
];

// Communication form
const messageForm = ref({
  recipients: 'all',
  channels: ['email'],
  subject: '',
  message: ''
});

// Mock message history
const messageHistory = ref([
  {
    id: 1,
    subject: 'Informações sobre o embarque',
    message: 'Olá! Lembrando que o embarque será às 06:00 no Terminal Rodoviário Tietê. Por favor, cheguem com 30 minutos de antecedência.',
    recipients: 'Todos os participantes',
    channels: ['email', 'push'],
    date: '2025-04-10T14:30:00Z',
    delivered: 25,
    opened: 20
  },
  {
    id: 2,
    subject: 'Confirmação de pagamento',
    message: 'Seu pagamento foi confirmado! Sua reserva está garantida.',
    recipients: 'Participantes pendentes',
    channels: ['email'],
    date: '2025-04-09T10:15:00Z',
    delivered: 10,
    opened: 8
  }
]);

// Computed properties
const excursion = computed(() => excursionsStore.getExcursionById(excursionId));

const confirmedReservations = computed(() => {
  return reservations.value.filter(r => r.status === 'confirmed');
});

const pendingReservations = computed(() => {
  return reservations.value.filter(r => r.status === 'pending');
});

const financialSummary = computed(() => {
  const totalRevenue = reservations.value.reduce((sum, r) => sum + r.totalPrice, 0);
  const confirmedRevenue = confirmedReservations.value.reduce((sum, r) => sum + r.totalPrice, 0);
  const pendingRevenue = pendingReservations.value.reduce((sum, r) => sum + r.totalPrice, 0);
  
  return {
    totalRevenue,
    confirmedRevenue,
    pendingRevenue
  };
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
    'Janeiro', 'Fevereiro',  'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  const startDay = start.getDate();
  const endDay = end.getDate();
  const month = months[start.getMonth()];
  const year = start.getFullYear();
  
  return `${startDay} a ${endDay} de ${month}, ${year}`;
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

const getReservationStatusText = (status) => {
  const statusMap = {
    'pending': 'Aguardando confirmação',
    'confirmed': 'Confirmada',
    'completed': 'Concluída',
    'cancelled': 'Cancelada'
  };
  
  return statusMap[status] || status;
};

const getReservationStatusClass = (status) => {
  const statusClasses = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-green-100 text-green-800',
    'completed': 'bg-blue-100 text-blue-800',
    'cancelled': 'bg-red-100 text-red-800'
  };
  
  return statusClasses[status] || 'bg-gray-100 text-gray-800';
};

const getParticipantStatusText = (status) => {
  const statusMap = {
    'confirmed': 'Confirmado',
    'pending': 'Pendente',
    'cancelled': 'Cancelado'
  };
  return statusMap[status] || status;
};

const getParticipantStatusClass = (status) => {
  const statusClasses = {
    'confirmed': 'bg-green-100 text-green-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'cancelled': 'bg-red-100 text-red-800'
  };
  return statusClasses[status] || 'bg-gray-100 text-gray-800';
};

const updateParticipantSeat = async (participant) => {
  try {
    // In a real app, this would call an API to update the seat number
    // For now, we'll just show a success message
    alert(`Assento ${participant.seat} atribuído para ${participant.name}`);
  } catch (error) {
    console.error('Error updating seat:', error);
    alert('Erro ao atualizar assento. Por favor, tente novamente.');
  }
};

const viewParticipantDetails = (participant) => {
  // In a real app, this would open a modal or navigate to a details page
  alert(`Detalhes do participante: ${participant.name}`);
};

const downloadParticipantsList = (format) => {
  // In a real app, this would generate and download a file
  // For now, we'll just show a success message
  alert(`Lista de participantes baixada em formato ${format.toUpperCase()}`);
};

const downloadReservationsList = (format) => {
  // In a real app, this would generate and download a file
  // For now, we'll just show a success message
  alert(`Lista de reservas baixada em formato ${format.toUpperCase()}`);
};

const sendMessage = async () => {
  try {
    // In a real app, this would call an API to send the message
    // For now, we'll just add it to the message history
    messageHistory.value.unshift({
      id: messageHistory.value.length + 1,
      subject: messageForm.value.subject,
      message: messageForm.value.message,
      recipients: messageForm.value.recipients === 'all' ? 'Todos os participantes' : 
                 messageForm.value.recipients === 'confirmed' ? 'Participantes confirmados' : 
                 'Participantes pendentes',
      channels: messageForm.value.channels,
      date: new Date().toISOString(),
      delivered: 0,
      opened: 0
    });
    
    // Reset form
    messageForm.value = {
      recipients: 'all',
      channels: ['email'],
      subject: '',
      message: ''
    };
    
    alert('Mensagem enviada com sucesso!');
  } catch (error) {
    console.error('Error sending message:', error);
    alert('Erro ao enviar mensagem. Por favor, tente novamente.');
  }
};

// Action methods
const editExcursion = () => {
  router.push(`/empresa/dashboard/gerenciar-excursoes/editar/${excursionId}`);
};

const toggleExcursionStatus = async () => {
  try {
    // In a real app, this would call an API to update the excursion status
    // For now, we'll just toggle the status in the store
    const newStatus = excursion.value.status === 'active' ? 'inactive' : 'active';
    await excursionsStore.updateExcursion(excursionId, { status: newStatus });
    
    alert(`Excursão ${newStatus === 'active' ? 'ativada' : 'pausada'} com sucesso!`);
  } catch (error) {
    console.error('Error updating excursion status:', error);
    alert('Erro ao atualizar status da excursão. Por favor, tente novamente.');
  }
};

const duplicateExcursion = async () => {
  try {
    // In a real app, this would call an API to duplicate the excursion
    // For now, we'll just show a success message
    alert('Excursão duplicada com sucesso!');
  } catch (error) {
    console.error('Error duplicating excursion:', error);
    alert('Erro ao duplicar excursão. Por favor, tente novamente.');
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
      return;
    }
    
    // Fetch reservations and participants
    // In a real app, this would come from an API
    // For now, we'll use mock data
    reservations.value = [
      {
        id: '1',
        excursionId: excursionId,
        userId: '3',
        userName: 'João Silva',
        userEmail: 'joao@example.com',
        createdAt: '2025-04-10T14:30:00Z',
        participants: 2,
        totalPrice: 2400,
        status: 'confirmed'
      },
      {
        id: '2',
        excursionId: excursionId,
        userId: '4',
        userName: 'Pedro Santos',
        userEmail: 'pedro@example.com',
        createdAt: '2025-04-12T10:15:00Z',
        participants: 4,
        totalPrice: 7200,
        status: 'pending'
      }
    ];
    
    participants.value = [
      {
        id: '1',
        reservationId: '1',
        name: 'João Silva',
        cpf: '123.456.789-00',
        phone: '(11) 98765-4321',
        email: 'joao@example.com',
        seat: '1A',
        status: 'confirmed',
        isResponsible: true
      },
      {
        id: '2',
        reservationId: '1',
        name: 'Maria Silva',
        cpf: '987.654.321-00',
        phone: '(11) 91234-5678',
        email: 'maria@example.com',
        seat: '1B',
        status: 'confirmed',
        isResponsible: false
      },
      {
        id: '3',
        reservationId: '2',
        name: 'Pedro Santos',
        cpf: '111.222.333-44',
        phone: '(11) 97777-8888',
        email: 'pedro@example.com',
        seat: '2A',
        status: 'pending',
        isResponsible: true
      },
      {
        id: '4',
        reservationId: '2',
        name: 'Ana Santos',
        cpf: '444.555.666-77',
        phone: '(11) 96666-7777',
        email: 'ana@example.com',
        seat: '2B',
        status: 'pending',
        isResponsible: false
      },
      {
        id: '5',
        reservationId: '2',
        name: 'Carlos Ferreira',
        cpf: '999.888.777-66',
        phone: '(11) 95555-6666',
        email: 'carlos@example.com',
        seat: '',
        status: 'pending',
        isResponsible: false
      },
      {
        id: '6',
        reservationId: '2',
        name: 'Juliana Lima',
        cpf: '444.333.222-11',
        phone: '(11) 94444-5555',
        email: 'juliana@example.com',
        seat: '',
        status: 'pending',
        isResponsible: false
      }
    ];
  } catch (err) {
    error.value = err.message || 'Ocorreu um erro ao carregar os detalhes da excursão.';
  } finally {
    loading.value = false;
  }
});
</script>
