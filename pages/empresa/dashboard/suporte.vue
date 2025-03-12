<template>
  <div>
    <NuxtLayout name="dashboard">
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Suporte e Comunicação</h1>
        <button class="btn btn-primary flex items-center" @click="showNewTicketModal = true">
          <Icon name="heroicons:plus" class="w-5 h-5 mr-1" />
          Novo Ticket
        </button>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column: Tickets List -->
        <div class="lg:col-span-1">
          <!-- Filters -->
          <div class="bg-white rounded-lg shadow-md p-4 mb-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold">Tickets</h3>
              <select v-model="statusFilter" class="form-input py-1 text-sm">
                <option value="all">Todos</option>
                <option value="open">Abertos</option>
                <option value="closed">Resolvidos</option>
              </select>
            </div>
            
            <div class="relative">
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Buscar tickets..." 
                class="form-input pl-10 pr-4 py-2 w-full"
              />
              <Icon 
                name="heroicons:magnifying-glass" 
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
              />
            </div>
          </div>
          
          <!-- Tickets List -->
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              <div 
                v-for="ticket in filteredTickets" 
                :key="ticket.id" 
                class="p-4 hover:bg-gray-50 cursor-pointer"
                :class="{'bg-primary-50': selectedTicket?.id === ticket.id}"
                @click="selectTicket(ticket)"
              >
                <div class="flex justify-between items-start mb-1">
                  <h4 class="font-medium">{{ ticket.subject }}</h4>
                  <span 
                    class="px-2 py-0.5 text-xs rounded-full"
                    :class="getStatusClass(ticket.status)"
                  >
                    {{ getStatusText(ticket.status) }}
                  </span>
                </div>
                <p class="text-sm text-gray-500 mb-2 line-clamp-2">{{ ticket.lastMessage }}</p>
                <div class="flex justify-between items-center text-xs text-gray-500">
                  <span>Ticket #{{ ticket.id }}</span>
                  <span>{{ ticket.date }}</span>
                </div>
              </div>
            </div>
            
            <!-- Empty State -->
            <div v-if="filteredTickets.length === 0" class="p-8 text-center">
              <Icon name="heroicons:chat-bubble-left-right" class="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum ticket encontrado</h3>
              <p class="text-gray-500 mb-4">Não há tickets que correspondam aos seus filtros.</p>
              <button class="btn btn-primary" @click="showNewTicketModal = true">
                Criar Novo Ticket
              </button>
            </div>
          </div>
        </div>
        
        <!-- Right Column: Ticket Details -->
        <div class="lg:col-span-2">
          <!-- No Ticket Selected -->
          <div v-if="!selectedTicket" class="bg-white rounded-lg shadow-md p-8 text-center h-full flex flex-col items-center justify-center">
            <Icon name="heroicons:chat-bubble-left-right" class="w-16 h-16 text-gray-300 mb-4" />
            <h3 class="text-xl font-medium text-gray-900 mb-2">Selecione um ticket</h3>
            <p class="text-gray-500 mb-6 max-w-md">
              Selecione um ticket da lista à esquerda para visualizar os detalhes e responder, ou crie um novo ticket.
            </p>
            <button class="btn btn-primary" @click="showNewTicketModal = true">
              Criar Novo Ticket
            </button>
          </div>
          
          <!-- Ticket Details -->
          <div v-else class="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
            <!-- Ticket Header -->
            <div class="p-6 border-b border-gray-200">
              <div class="flex justify-between items-start">
                <div>
                  <h2 class="text-xl font-bold mb-1">{{ selectedTicket.subject }}</h2>
                  <div class="flex items-center text-sm text-gray-500">
                    <span>Ticket #{{ selectedTicket.id }}</span>
                    <span class="mx-2">•</span>
                    <span>Aberto em {{ selectedTicket.date }}</span>
                    <span class="mx-2">•</span>
                    <span 
                      class="px-2 py-0.5 text-xs rounded-full"
                      :class="getStatusClass(selectedTicket.status)"
                    >
                      {{ getStatusText(selectedTicket. status) }}
                    </span>
                  </div>
                </div>
                <div>
                  <button 
                    v-if="selectedTicket.status === 'open'" 
                    class="btn btn-outline text-sm"
                    @click="closeTicket(selectedTicket.id)"
                  >
                    Marcar como Resolvido
                  </button>
                  <button 
                    v-else 
                    class="btn btn-outline text-sm"
                    @click="reopenTicket(selectedTicket.id)"
                  >
                    Reabrir Ticket
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Messages -->
            <div class="p-6 flex-grow overflow-y-auto max-h-[400px]">
              <div class="space-y-6">
                <div v-for="(message, index) in selectedTicket.messages" :key="index" class="flex">
                  <div v-if="message.sender === 'company'" class="flex flex-col items-end ml-auto">
                    <div class="bg-primary-50 rounded-lg p-4 max-w-md">
                      <p class="text-gray-800">{{ message.text }}</p>
                    </div>
                    <div class="text-xs text-gray-500 mt-1">
                      {{ message.time }} - Você
                    </div>
                  </div>
                  <div v-else class="flex flex-col items-start mr-auto">
                    <div class="bg-gray-100 rounded-lg p-4 max-w-md">
                      <p class="text-gray-800">{{ message.text }}</p>
                    </div>
                    <div class="text-xs text-gray-500 mt-1">
                      {{ message.time }} - Suporte Viajae
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Reply Form -->
            <div class="p-4 border-t border-gray-200">
              <div v-if="selectedTicket.status === 'closed'" class="text-center text-gray-500 mb-2">
                Este ticket está fechado. Reabra-o para enviar uma nova mensagem.
              </div>
              <div v-else class="flex items-end">
                <textarea 
                  v-model="replyText" 
                  class="form-input flex-grow mr-2" 
                  rows="3" 
                  placeholder="Escreva sua mensagem..."
                ></textarea>
                <button 
                  class="btn btn-primary h-10"
                  :disabled="!replyText.trim()"
                  @click="sendReply"
                >
                  <Icon name="heroicons:paper-airplane" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- New Ticket Modal -->
      <div v-if="showNewTicketModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="font-bold text-lg">Criar Novo Ticket</h3>
          </div>
          
          <div class="p-6">
            <form @submit.prevent="createTicket">
              <div class="space-y-4">
                <div>
                  <label for="subject" class="form-label">Assunto</label>
                  <input 
                    id="subject" 
                    v-model="newTicket.subject" 
                    type="text" 
                    class="form-input" 
                    placeholder="Ex: Dúvida sobre pagamentos" 
                    required
                  />
                </div>
                
                <div>
                  <label for="category" class="form-label">Categoria</label>
                  <select 
                    id="category" 
                    v-model="newTicket.category" 
                    class="form-input" 
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="technical">Suporte Técnico</option>
                    <option value="billing">Pagamentos</option>
                    <option value="account">Conta</option>
                    <option value="excursion">Excursões</option>
                    <option value="other">Outros</option>
                  </select>
                </div>
                
                <div>
                  <label for="message" class="form-label">Mensagem</label>
                  <textarea 
                    id="message" 
                    v-model="newTicket.message" 
                    class="form-input" 
                    rows="5" 
                    placeholder="Descreva sua dúvida ou problema em detalhes..."
                    required
                  ></textarea>
                </div>
              </div>
              
              <div class="mt-6 flex justify-end space-x-3">
                <button 
                  type="button" 
                  class="btn btn-outline" 
                  @click="showNewTicketModal = false"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  class="btn btn-primary"
                >
                  Criar Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// State
const statusFilter = ref('all');
const searchQuery = ref('');
const selectedTicket = ref(null);
const replyText = ref('');
const showNewTicketModal = ref(false);
const newTicket = ref({
  subject: '',
  category: '',
  message: ''
});

// Mock tickets data
const tickets = ref([
  {
    id: '1001',
    subject: 'Problema com pagamentos',
    status: 'open',
    date: '15/04/2025',
    lastMessage: 'Estamos verificando o problema com o processador de pagamentos e retornaremos em breve.',
    messages: [
      {
        sender: 'company',
        text: 'Olá, estou tendo problemas para receber os pagamentos das reservas. O valor aparece como pendente há mais de 3 dias.',
        time: '15/04/2025 10:30'
      },
      {
        sender: 'support',
        text: 'Olá! Entendemos sua preocupação. Vamos verificar o que está acontecendo com os pagamentos. Pode nos informar quais reservas específicas estão com esse problema?',
        time: '15/04/2025 11:15'
      },
      {
        sender: 'company',
        text: 'São as reservas #1234, #1235 e #1236, todas feitas entre os dias 10 e 12 de abril.',
        time: '15/04/2025 11:30'
      },
      {
        sender: 'support',
        text: 'Obrigado pelas informações. Estamos verificando o problema com o processador de pagamentos e retornaremos em breve.',
        time: '15/04/2025 14:45'
      }
    ]
  },
  {
    id: '1002',
    subject: 'Dúvida sobre cancelamento de reserva',
    status: 'closed',
    date: '10/04/2025',
    lastMessage: 'Fico feliz em ter ajudado! Se precisar de mais alguma coisa, estamos à disposição.',
    messages: [
      {
        sender: 'company',
        text: 'Preciso saber como proceder com o cancelamento de uma reserva solicitado pelo cliente. Qual é a política de reembolso nesse caso?',
        time: '10/04/2025 09:15'
      },
      {
        sender: 'support',
        text: 'Olá! Para cancelamentos, você deve acessar a reserva específica no painel de gerenciamento e clicar no botão "Cancelar Reserva". Quanto ao reembolso, seguimos a política que você definiu ao cadastrar a excursão. Geralmente, cancelamentos com mais de 30 dias de antecedência têm reembolso de 90%, entre 15 e 30 dias têm reembolso de 50%, e com menos de 15 dias não há reembolso. Você pode verificar a política específica na página de detalhes da excursão.',
        time: '10/04/2025 10:30'
      },
      {
        sender: 'company',
        text: 'Entendi, muito obrigado pela explicação detalhada!',
        time: '10/04/2025 11:00'
      },
      {
        sender: 'support',
        text: 'Fico feliz em ter ajudado! Se precisar de mais alguma coisa, estamos à disposição.',
        time: '10/04/2025 11:05'
      }
    ]
  },
  {
    id: '1003',
    subject: 'Como adicionar mais fotos à excursão',
    status: 'open',
    date: '05/04/2025',
    lastMessage: 'Você pode adicionar até 10 fotos por excursão. Cada foto deve ter no máximo 5MB.',
    messages: [
      {
        sender: 'company',
        text: 'Olá, gostaria de saber como posso adicionar mais fotos à minha excursão já cadastrada.',
        time: '05/04/2025 14:20'
      },
      {
        sender: 'support',
        text: 'Olá! Para adicionar mais fotos a uma excursão existente, acesse o painel de gerenciamento, vá até "Excursões", selecione a excursão desejada e clique em "Editar". Na seção de fotos, você encontrará a opção "Adicionar Fotos".',
        time: '05/04/2025 15:10'
      },
      {
        sender: 'company',
        text: 'Obrigado! E existe um limite de quantas fotos posso adicionar?',
        time: '05/04/2025 15:30'
      },
      {
        sender: 'support',
        text: 'Você pode adicionar até 10 fotos por excursão. Cada foto deve ter no máximo 5MB.',
        time: '05/04/2025 16:00'
      }
    ]
  }
]);

// Computed
const filteredTickets = computed(() => {
  let result = [...tickets.value];
  
  // Apply status filter
  if (statusFilter.value !== 'all') {
    result = result.filter(ticket => ticket.status === statusFilter.value);
  }
  
  // Apply search query
  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(ticket => 
      ticket.subject.toLowerCase().includes(query) ||
      ticket.id.includes(query) ||
      ticket.messages.some(message => message.text.toLowerCase().includes(query))
    );
  }
  
  // Sort by date (most recent first)
  result.sort((a, b) => {
    const dateA = new Date(a.date.split('/').reverse().join('-'));
    const dateB = new Date(b.date.split('/').reverse().join('-'));
    return dateB - dateA;
  });
  
  return result;
});

// Methods
const getStatusText = (status) => {
  return status === 'open' ? 'Aberto' : 'Resolvido';
};

const getStatusClass = (status) => {
  return status === 'open' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-gray-100 text-gray-800';
};

const selectTicket = (ticket) => {
  selectedTicket.value = ticket;
  replyText.value = '';
};

const sendReply = () => {
  if (!replyText.value.trim() || !selectedTicket.value) return;
  
  // Add new message to the ticket
  const newMessage = {
    sender: 'company',
    text: replyText.value,
    time: new Date().toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
  
  selectedTicket.value.messages.push(newMessage);
  selectedTicket.value.lastMessage = replyText.value;
  
  // Clear reply text
  replyText.value = '';
};

const closeTicket = (ticketId) => {
  const ticket = tickets.value.find(t => t.id === ticketId);
  if (ticket) {
    ticket.status = 'closed';
  }
};

const reopenTicket = (ticketId) => {
  const ticket = tickets.value.find(t => t.id === ticketId);
  if (ticket) {
    ticket.status = 'open';
  }
};

const createTicket = () => {
  // Create new ticket
  const ticketId = `${1000 + tickets.value.length + 1}`;
  const currentDate = new Date().toLocaleDateString('pt-BR');
  const currentTime = new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const ticket = {
    id: ticketId,
    subject: newTicket.value.subject,
    status: 'open',
    date: currentDate,
    lastMessage: newTicket.value.message,
    messages: [
      {
        sender: 'company',
        text: newTicket.value.message,
        time: currentTime
      }
    ]
  };
  
  // Add to tickets list
  tickets.value.unshift(ticket);
  
  // Select the new ticket
  selectedTicket.value = ticket;
  
  // Reset form and close modal
  newTicket.value = {
    subject: '',
    category: '',
    message: ''
  };
  showNewTicketModal.value = false;
};
</script>
